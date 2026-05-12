"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

/**
 * Reel — a single editorial showreel block that sits between the
 * category directory and the portfolio grid. The clip is a 9:16
 * vertical, served as a static asset from /public/video.
 *
 * Playback behaviour:
 *  - autoplays muted + looped (only way browsers will allow autoplay)
 *  - pauses automatically when the element scrolls out of view, so we
 *    don't leave a decoder running off-screen
 *  - exposes manual play/pause and mute/unmute affordances
 *
 * Asset is hardcoded — no user input ever touches `src`, no remote
 * URLs, no embeds, so there's no XSS / SSRF surface here.
 */
const ease = [0.22, 1, 0.36, 1] as const;

export function Reel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);

  // Keep the playing state in sync with the actual element, including the
  // auto-pause/resume driven by IntersectionObserver below. Without this the
  // play/pause icon drifts out of sync with reality.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setCurrentTime(video.currentTime);
    const onMeta = () => setDuration(video.duration || 0);
    const onEnded = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("durationchange", onMeta);
    video.addEventListener("ended", onEnded);
    // If metadata already loaded by mount time (cache), pull it now.
    if (video.readyState >= 1) onMeta();
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("durationchange", onMeta);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  // Pause when the section leaves the viewport, resume when it returns.
  // This keeps the page light on laptops and phones without forcing the
  // visitor to manage playback manually.
  useEffect(() => {
    const node = sectionRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // play() returns a promise that can reject (e.g. tab in
            // background). Swallow the rejection — there's nothing
            // useful to do with it.
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  // Translate a pointer X coordinate (relative to the track) into a video
  // time and apply it. Clamp to [0, duration] defensively — the bar's
  // bounding rect already constrains us, but a stale duration could lie.
  const seekFromPointer = useCallback((clientX: number) => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video || !duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const next = ratio * duration;
    video.currentTime = next;
    setCurrentTime(next);
  }, [duration]);

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setScrubbing(true);
    seekFromPointer(e.clientX);
  };
  const onTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrubbing) return;
    seekFromPointer(e.clientX);
  };
  const onTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    setScrubbing(false);
  };

  // Keyboard a11y for the scrubber: arrows ±5s, Home/End jump to ends.
  const onTrackKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    let next = video.currentTime;
    if (e.key === "ArrowRight") next = Math.min(duration, next + 5);
    else if (e.key === "ArrowLeft") next = Math.max(0, next - 5);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = duration;
    else return;
    e.preventDefault();
    video.currentTime = next;
    setCurrentTime(next);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      id="reel"
      className="relative w-full border-t border-border bg-background py-24 sm:py-32"
      aria-labelledby="reel-heading"
    >
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="editorial-eyebrow">— In motion</span>
            <h2
              id="reel-heading"
              className="editorial-heading mt-4 text-[clamp(2rem,6vw,4.5rem)] text-foreground"
            >
              Showreel
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A glimpse of recent work, between frames.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <div className="relative w-full max-w-[420px]">
            {/* Aspect-locked frame — 9:16 matches the source so we never
                letterbox. Subtle border + shadow gives it the editorial
                "framed plate" feel without competing with the photo grid. */}
            <div className="relative overflow-hidden rounded-sm border border-border bg-black shadow-2xl ring-1 ring-foreground/5">
              <div className="relative aspect-[9/16] w-full">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/video/showreel.mp4"
                  poster="/video/showreel-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Showreel"
                />

                {/* Soft top/bottom vignette so the controls stay legible
                    without dimming the footage. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                />
              </div>

              {/* Scrubber — full-width, editorial hairline. Click or drag
                  anywhere on the track to seek. */}
              <div className="absolute bottom-16 left-3 right-3 flex items-center gap-3">
                <div
                  ref={trackRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Seek reel"
                  aria-valuemin={0}
                  aria-valuemax={Math.max(1, Math.round(duration))}
                  aria-valuenow={Math.round(currentTime)}
                  aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                  onPointerDown={onTrackPointerDown}
                  onPointerMove={onTrackPointerMove}
                  onPointerUp={onTrackPointerUp}
                  onPointerCancel={onTrackPointerUp}
                  onKeyDown={onTrackKeyDown}
                  className="group/track relative h-6 flex-1 cursor-pointer touch-none select-none outline-none"
                >
                  {/* Track */}
                  <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/25 transition-[height] duration-200 group-hover/track:h-[3px] group-focus-visible/track:h-[3px]" />
                  {/* Fill */}
                  <div
                    className="pointer-events-none absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-white transition-[height] duration-200 group-hover/track:h-[3px] group-focus-visible/track:h-[3px]"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Handle */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 ring-1 ring-black/20 transition-opacity duration-200 group-hover/track:opacity-100 group-focus-visible/track:opacity-100 ${scrubbing ? "opacity-100" : ""}`}
                    style={{ left: `${progress}%` }}
                  />
                </div>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-white/85">
                  {formatTime(currentTime)} <span className="text-white/45">/ {formatTime(duration)}</span>
                </span>
              </div>

              {/* Controls — minimal, kept inside the frame */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause reel" : "Play reel"}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black"
                >
                  {playing ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 translate-x-[1px]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute reel" : "Mute reel"}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black"
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Caption under the frame for editorial weight */}
            <div className="mt-4 flex items-center justify-between text-foreground/60">
              <span className="editorial-eyebrow">— Reel · 2026</span>
              <span className="editorial-eyebrow">9:16</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Format seconds as m:ss (or h:mm:ss if the clip is ever longer than an hour). */
function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
