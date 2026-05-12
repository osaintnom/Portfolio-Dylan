"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { categoryDirectory } from "@/lib/photos";

/**
 * CategoryDirectory — sits immediately under the hero. Reuses the
 * expandable-strip animation from `components/ui/gallery-animation.tsx`,
 * but each panel is a category, not just an image. Hovering a panel
 * expands it and reveals the category name + a one-line description.
 * Clicking it filters the portfolio below and scrolls to it.
 *
 * Filter sync is intentionally event-driven (a `portfolio:filter`
 * CustomEvent) so the directory stays decoupled from the gallery — no
 * global store, no prop drilling.
 */
export function CategoryDirectory() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getFlex = (index: number) => {
    if (hoveredIndex === null) return 1;
    return hoveredIndex === index ? 2.2 : 0.55;
  };

  const selectCategory = (key: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio:filter", { detail: { category: key } })
      );
      // Smooth-scroll to the portfolio anchor. `scroll-behavior: smooth`
      // on <html> handles the easing.
      const target = document.getElementById("portfolio");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="directory"
      className="relative w-full pb-24"
      aria-labelledby="directory-heading"
    >
      <div className="container-editorial">
        {/* Section header — minimal, lets the imagery speak */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <span className="editorial-eyebrow text-foreground/60">
              — Directory
            </span>
            <h2
              id="directory-heading"
              className="editorial-heading mt-3 text-[clamp(1.5rem,2.6vw,2.25rem)] text-foreground"
            >
              Browse by category
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground sm:block">
            Hover to peek, click to view the full series.
          </p>
        </div>

        {/* Expandable strip */}
        <div
          className="flex h-[480px] w-full gap-2 sm:h-[560px]"
          onMouseLeave={() => setHoveredIndex(null)}
          role="list"
          aria-label="Photography categories"
        >
          {categoryDirectory.map((cat, index) => {
            const isHovered = hoveredIndex === index;
            const isIdle = hoveredIndex === null;
            return (
              <motion.button
                key={cat.key}
                type="button"
                role="listitem"
                className="relative h-full cursor-pointer overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                style={{ flex: 1 }}
                animate={{ flex: getFlex(index) }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onClick={() => selectCategory(cat.key)}
                aria-label={`View ${cat.label} — ${cat.description}`}
              >
                {/* Cover image */}
                <Image
                  src={cat.cover}
                  alt={`${cat.label} cover`}
                  fill
                  sizes="(max-width: 640px) 60vw, 30vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out will-change-transform"
                  style={{
                    transform: isHovered ? "scale(1.04)" : "scale(1)",
                  }}
                  priority={index < 2}
                />

                {/* Tint — darker when idle/dimmed, lifts on hover */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-black"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 0.18 : isIdle ? 0.35 : 0.55,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Bottom gradient for legibility */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                />

                {/* Vertical label (always visible when idle, fades when expanded sibling) */}
                <motion.div
                  className="absolute inset-0 flex items-end justify-center px-3 pb-6"
                  initial={false}
                  animate={{ opacity: isHovered ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className="font-serif text-xl tracking-tight text-foreground sm:text-2xl"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {cat.label}
                  </span>
                </motion.div>

                {/* Expanded content */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 p-6 sm:p-8"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 12,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="editorial-eyebrow text-foreground/70">
                    {String(index + 1).padStart(2, "0")} / {categoryDirectory.length}
                  </span>
                  <h3 className="mt-2 font-serif text-3xl leading-[0.95] tracking-tight text-foreground sm:text-5xl">
                    {cat.label}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {cat.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-foreground/90">
                    <span className="editorial-eyebrow">View series</span>
                    <span aria-hidden className="text-base">→</span>
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
