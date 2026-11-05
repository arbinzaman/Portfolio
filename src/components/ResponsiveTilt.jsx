import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

/**
 * ResponsiveTilt:
 * Renders interactive 3D `react-parallax-tilt` on desktop pointer devices,
 * and a lightweight container on mobile touch viewports so iOS Safari does not
 * promote every card with high-resolution images into a separate GPU texture layer.
 */
const ResponsiveTilt = ({ children, className = "", ...tiltProps }) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(max-width: 768px)").matches ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    );
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMatch = (e) => {
      setIsMobile(
        e.matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
      );
    };
    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tilt className={className} {...tiltProps}>
      {children}
    </Tilt>
  );
};

export default ResponsiveTilt;

