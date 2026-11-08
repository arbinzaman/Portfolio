import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import interstallerMusic from "../../assets/audios/interstallerMusic.MP3?url";
import charleBgm from "../../assets/audios/charleBgm.MP3?url";

const VOLUME = 0.6; // starting level; the hover slider adjusts it
const FADE_IN = 1.5; // seconds
const FADE_OUT = 0.4;

/**
 * Background music toggle with Web Audio API gain fade & volume slider.
 * Supports:
 * - variant="portfolio" -> plays interstallerMusic.MP3
 * - variant="hobby"     -> plays charleBgm.MP3 with high-contrast travel styling
 */
export function SoundToggle({
  className = "",
  variant = "portfolio",
  active = true,
}) {
  const isHobby = variant === "hobby";
  const trackUrl = isHobby ? charleBgm : interstallerMusic;

  const [on, setOn] = useState(false);
  const onRef = useRef(false);
  const [volume, setVolume] = useState(VOLUME);
  const volumeRef = useRef(VOLUME);
  const [panel, setPanel] = useState(false);
  const closeTimer = useRef(0);
  const audioRef = useRef(null);
  const graphRef = useRef(null); // { ctx, gain } when Web Audio is available
  const fadeRef = useRef({ frame: 0, timer: 0 });

  const ensureAudio = () => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) {
      try {
        const ctx = new Ctx();
        const gain = ctx.createGain();
        gain.gain.value = 0;
        ctx
          .createMediaElementSource(audio)
          .connect(gain)
          .connect(ctx.destination);
        graphRef.current = { ctx, gain };
      } catch {
        graphRef.current = null;
      }
    }
    if (!graphRef.current) audio.volume = 0;
    return audio;
  };

  const cancelFade = () => {
    cancelAnimationFrame(fadeRef.current.frame);
    clearTimeout(fadeRef.current.timer);
  };

  // Ramp to `target` over `seconds`, then call `onDone`.
  const fadeTo = (target, seconds, onDone) => {
    cancelFade();
    const graph = graphRef.current;
    if (graph) {
      const { ctx, gain } = graph;
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(target, now + seconds);
      if (onDone) fadeRef.current.timer = setTimeout(onDone, seconds * 1000);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    const from = audio.volume;
    const start = performance.now();
    const step = (time) => {
      const t = Math.min(1, (time - start) / (seconds * 1000));
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * t));
      if (t < 1) fadeRef.current.frame = requestAnimationFrame(step);
      else onDone?.();
    };
    fadeRef.current.frame = requestAnimationFrame(step);
  };

  const start = () => {
    const audio = ensureAudio();
    graphRef.current?.ctx.resume();
    const playing = audio.play();
    fadeTo(volumeRef.current, FADE_IN);
    playing?.catch(() => {
      onRef.current = false;
      setOn(false);
    });
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, FADE_OUT, () => audio.pause());
  };

  const toggle = () => {
    const next = !onRef.current;
    onRef.current = next;
    setOn(next);
    if (next) {
      start();
    } else {
      stop();
    }
  };

  // If this toggle becomes inactive (e.g. route switched between / and /hobby), pause playback cleanly.
  useEffect(() => {
    if (!active && onRef.current) {
      onRef.current = false;
      setOn(false);
      cancelFade();
      audioRef.current?.pause();
      if (graphRef.current) graphRef.current.gain.gain.value = 0;
      else if (audioRef.current) audioRef.current.volume = 0;
    }
  }, [active]);

  // Pause while the tab is hidden; pick up again on return if it was on.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !onRef.current) return;
      if (document.hidden) {
        cancelFade();
        audio.pause();
        if (graphRef.current) graphRef.current.gain.gain.value = 0;
        else audio.volume = 0;
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(
    () => () => {
      cancelFade();
      clearTimeout(closeTimer.current);
      audioRef.current?.pause();
      graphRef.current?.ctx.close();
    },
    [],
  );

  // Drag the slider: follow it closely without zipper noise.
  const changeVolume = (event) => {
    const next = Number(event.target.value) / 100;
    volumeRef.current = next;
    setVolume(next);
    const audio = audioRef.current;
    if (!audio || !onRef.current) return;
    cancelFade();
    const graph = graphRef.current;
    if (graph) {
      const now = graph.ctx.currentTime;
      graph.gain.gain.cancelScheduledValues(now);
      graph.gain.gain.setTargetAtTime(next, now, 0.04);
    } else {
      audio.volume = next;
    }
  };

  // The slider opens on hover or keyboard focus, and only while the music plays.
  const showPanel = () => {
    clearTimeout(closeTimer.current);
    setPanel(true);
  };
  const hidePanel = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanel(false), 180);
  };
  const open = on && panel;

  if (!active) return null;

  const label = on ? "Turn music off" : "Turn music on";
  const percent = Math.round(volume * 100);

  const buttonClasses = isHobby
    ? on
      ? "h-11 w-11 rounded-full border-2 border-[#b9dfc8] bg-[#36745e] text-white shadow-[0_8px_24px_rgba(23,35,31,0.45)] hover:bg-[#2b5f4d]"
      : "h-11 w-11 rounded-full border-2 border-[#4eb88e]/85 bg-[#1b2c26] text-white shadow-[0_8px_24px_rgba(0,0,0,0.38)] hover:border-[#b9dfc8] hover:bg-[#36745e]"
    : on
      ? "h-10 w-10 rounded-xl border border-[#a78bfa]/60 bg-[#0b0d1b]/95 text-white shadow-[0_3px_0_0_rgba(145,94,255,0.45),0_0_24px_rgba(145,94,255,0.25)] hover:border-[#c4b5fd]"
      : "h-10 w-10 rounded-xl border border-white/25 bg-[#080a17]/90 text-white shadow-[0_3px_0_0_rgba(255,255,255,0.14)] hover:border-white/45";

  return (
    <div
      className={`flex flex-row-reverse items-center ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && showPanel()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hidePanel()}
      onFocus={showPanel}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) hidePanel();
      }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={label}
        title={label}
        className={`sound-toggle-btn relative flex items-center justify-center overflow-hidden transition-all duration-200 backdrop-blur-xl active:translate-y-[1px] ${buttonClasses}`}
      >
        <span className={`flex items-center justify-center ${on ? "-translate-y-0.5" : ""}`}>
          {on ? (
            <Volume2
              className={`h-4 w-4 ${isHobby ? "text-[#dff7ea]" : "text-[#c4b5fd]"}`}
              aria-hidden="true"
            />
          ) : (
            <VolumeX className="h-4 w-4 text-white" aria-hidden="true" />
          )}
        </span>

        {/* Level meter: three bars while the music plays */}
        {on && (
          <span aria-hidden="true" className="sound-meter">
            <span />
            <span />
            <span />
          </span>
        )}
      </button>

      {/* Volume slider panel */}
      {open && (
        <div className="pr-2.5">
          <div
            className={`flex h-10 items-center gap-3 rounded-full border pl-3.5 pr-3 shadow-lg backdrop-blur-xl ${isHobby
                ? "border-[#36745e]/50 bg-[#17231f]/95 text-white"
                : "border-white/15 bg-[#080a17]/90 text-white"
              }`}
          >
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={percent}
              onChange={changeVolume}
              aria-label="Music volume"
              aria-valuetext={`${percent}%`}
              className="volume-range w-24 sm:w-28"
              style={{ "--val": `${percent}%` }}
            />
            <span
              aria-hidden="true"
              className="w-7 text-right font-mono text-[11px] tabular-nums text-white/80"
            >
              {percent}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SoundToggle;
