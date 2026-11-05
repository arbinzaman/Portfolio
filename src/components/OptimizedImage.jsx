import React, { useEffect, useRef, useState } from "react";

const mobileUrlCache = new Map();
let decodeQueue = Promise.resolve();
let sharedCanvas = null;

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

/**
 * Sequentially decodes oversized images (e.g., 6000x4000) one at a time on mobile
 * into a 3x-Retina-sized blob URL so iOS Safari never spikes above its per-tab
 * Jetsam memory limit during fast scrolling, while keeping the original
 * full-resolution asset files 100% untouched.
 */
function enqueueMobileDecode(src, maxDim) {
  const cacheKey = `${src}::${maxDim}`;
  if (mobileUrlCache.has(cacheKey)) {
    return Promise.resolve(mobileUrlCache.get(cacheKey));
  }

  const nextTask = decodeQueue.then(
    () =>
      new Promise((resolve) => {
        if (mobileUrlCache.has(cacheKey)) {
          resolve(mobileUrlCache.get(cacheKey));
          return;
        }

        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          const w = img.naturalWidth || img.width;
          const h = img.naturalHeight || img.height;

          if (!w || !h || (w <= maxDim && h <= maxDim)) {
            mobileUrlCache.set(cacheKey, src);
            img.src = "";
            resolve(src);
            return;
          }

          try {
            const scale = Math.min(maxDim / w, maxDim / h);
            const targetW = Math.max(1, Math.round(w * scale));
            const targetH = Math.max(1, Math.round(h * scale));

            if (!sharedCanvas) {
              sharedCanvas = document.createElement("canvas");
            }
            sharedCanvas.width = targetW;
            sharedCanvas.height = targetH;
            const ctx = sharedCanvas.getContext("2d");
            ctx.drawImage(img, 0, 0, targetW, targetH);

            // Release the full-resolution source bitmap immediately
            img.src = "";

            sharedCanvas.toBlob(
              (blob) => {
                // Free the temporary canvas backing store
                sharedCanvas.width = 1;
                sharedCanvas.height = 1;
                if (blob) {
                  const objectUrl = URL.createObjectURL(blob);
                  mobileUrlCache.set(cacheKey, objectUrl);
                  resolve(objectUrl);
                } else {
                  mobileUrlCache.set(cacheKey, src);
                  resolve(src);
                }
              },
              "image/webp",
              0.9,
            );
          } catch {
            img.src = "";
            mobileUrlCache.set(cacheKey, src);
            resolve(src);
          }
        };

        img.onerror = () => {
          mobileUrlCache.set(cacheKey, src);
          resolve(src);
        };

        img.src = src;
      }),
  );

  decodeQueue = nextTask.catch(() => {});
  return nextTask;
}

const OptimizedImage = ({
  src,
  alt,
  maxMobileDim = 1280,
  className = "",
  ...rest
}) => {
  const isMobile = isMobileViewport();
  const cacheKey = `${src}::${maxMobileDim}`;
  const [resolvedSrc, setResolvedSrc] = useState(() =>
    !isMobile ? src : mobileUrlCache.get(cacheKey) || null,
  );
  const imgRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      setResolvedSrc(src);
      return undefined;
    }

    if (mobileUrlCache.has(cacheKey)) {
      setResolvedSrc(mobileUrlCache.get(cacheKey));
      return undefined;
    }

    let cancelled = false;
    const el = imgRef.current;

    const triggerDecode = () => {
      enqueueMobileDecode(src, maxMobileDim).then((finalUrl) => {
        if (!cancelled) {
          setResolvedSrc(finalUrl);
        }
      });
    };

    if (!el || typeof IntersectionObserver === "undefined") {
      triggerDecode();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          triggerDecode();
        }
      },
      { rootMargin: "450px 0px" },
    );

    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [src, isMobile, maxMobileDim, cacheKey]);

  return (
    <img
      ref={imgRef}
      src={
        resolvedSrc ||
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      }
      alt={alt}
      decoding="async"
      className={className}
      {...rest}
    />
  );
};

export default OptimizedImage;

