"use client";

import { useCallback, useEffect, useMemo, useState, KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { photos as allPhotos, categories, type Photo } from "@/lib/photos";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial gallery — varied aspect ratios drive an asymmetric rhythm that
 * feels curated rather than gridded. Click any image for a full-screen
 * lightbox with keyboard navigation.
 */
export function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const cats = useMemo(() => categories(), []);
  const filtered = useMemo(
    () =>
      filter === "All"
        ? allPhotos
        : allPhotos.filter((p) => p.category === filter),
    [filter]
  );

  // Precompute column-spans so rows always sum to 6 on desktop.
  // Algorithm: greedy pairing — landscape gets 4, portrait gets 2. If the
  // next pair would be portrait+portrait (sums to 4), promote it to 3+3 for
  // visual balance. Squares get 3 (half-row).
  const spans = useMemo(() => buildSpans(filtered), [filtered]);

  const activeIndex = activeId
    ? filtered.findIndex((p) => p.id === activeId)
    : -1;
  const active = activeIndex >= 0 ? filtered[activeIndex] : null;

  const close = useCallback(() => setActiveId(null), []);
  const next = useCallback(() => {
    if (activeIndex < 0) return;
    setActiveId(filtered[(activeIndex + 1) % filtered.length].id);
  }, [activeIndex, filtered]);
  const prev = useCallback(() => {
    if (activeIndex < 0) return;
    setActiveId(
      filtered[(activeIndex - 1 + filtered.length) % filtered.length].id
    );
  }, [activeIndex, filtered]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!active) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while the lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, next, prev]);

  const onCardKey = (
    e: KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveId(id);
    }
  };

  return (
    <section
      id="portfolio"
      className="relative w-full bg-background pb-24 pt-24 sm:pt-32"
      aria-labelledby="portfolio-heading"
    >
      <div className="container-editorial">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="editorial-eyebrow">— Selected work</span>
            <h2
              id="portfolio-heading"
              className="editorial-heading mt-4 text-[clamp(2.5rem,6vw,5.5rem)] text-foreground"
            >
              Portfolio
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            A focused selection of recent commercial work — automotive, motos,
            jewelry, fashion, and studio. Click any frame to view it full
            screen.
          </p>
        </motion.div>

        {/* Category filter */}
        {cats.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-10 flex flex-wrap items-center gap-2 border-y border-border py-4"
            role="group"
            aria-label="Filter by category"
          >
            <span className="editorial-eyebrow mr-3">Filter</span>
            {cats.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={filter === c ? "default" : "outline"}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Editorial masonry */}
        <motion.ul
          layout
          role="list"
          aria-label="Photography portfolio"
          className="grid grid-cols-1 gap-6 sm:grid-cols-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, i) => (
              <GalleryItem
                key={photo.id}
                photo={photo}
                index={i}
                spanClass={spans[i]}
                onOpen={() => setActiveId(photo.id)}
                onKeyDown={(e) => onCardKey(e, photo.id)}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <Lightbox
            photo={active}
            onClose={close}
            onNext={next}
            onPrev={prev}
            position={`${activeIndex + 1} / ${filtered.length}`}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

const aspectClass: Record<Photo["aspect"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square"
};

/**
 * Pack photos into rows that always sum to 6 columns on desktop, producing
 * an editorial cadence: wide-landscape paired with portrait, two squares
 * paired together, etc. Returns one Tailwind col-span class per photo.
 *
 * Approach: greedy, left-to-right. Each row has a remaining budget (6). We
 * try to fit one or two photos per row by preferring landscape→4, portrait→2,
 * square→3. If the row has exactly 4 left after a wide, we drop in a
 * portrait or square promoted to span-2; if exactly 3 left, a half-row
 * partner; if a pair of portraits would leave 2 idle, we promote them to 3+3.
 */
function buildSpans(list: Photo[]): string[] {
  const want = (a: Photo["aspect"]) =>
    a === "landscape" ? 4 : a === "portrait" ? 2 : 3;

  const result: string[] = new Array(list.length).fill("");
  let i = 0;
  while (i < list.length) {
    const a = list[i];
    const b = list[i + 1];
    const c = list[i + 2];

    // Pair fit: a + b sums to 6
    if (b && want(a.aspect) + want(b.aspect) === 6) {
      result[i] = spanClassFor(want(a.aspect));
      result[i + 1] = spanClassFor(want(b.aspect));
      i += 2;
      continue;
    }

    // Triple fit: 3 portraits → 2+2+2
    if (
      b &&
      c &&
      a.aspect === "portrait" &&
      b.aspect === "portrait" &&
      c.aspect === "portrait"
    ) {
      result[i] = "sm:col-span-2";
      result[i + 1] = "sm:col-span-2";
      result[i + 2] = "sm:col-span-2";
      i += 3;
      continue;
    }

    // Two portraits → promote to 3+3 to fill the row.
    if (b && a.aspect === "portrait" && b.aspect === "portrait") {
      result[i] = "sm:col-span-3";
      result[i + 1] = "sm:col-span-3";
      i += 2;
      continue;
    }

    // Two landscapes → 3+3 (half-row each, lets both breathe).
    if (b && a.aspect === "landscape" && b.aspect === "landscape") {
      result[i] = "sm:col-span-3";
      result[i + 1] = "sm:col-span-3";
      i += 2;
      continue;
    }

    // Lone photo at end: take the whole row at its natural width centered.
    result[i] = a.aspect === "landscape" ? "sm:col-span-6" : "sm:col-span-3 sm:col-start-3";
    i += 1;
  }
  return result;
}

function spanClassFor(span: number): string {
  return span === 4
    ? "sm:col-span-4"
    : span === 3
      ? "sm:col-span-3"
      : "sm:col-span-2";
}

function GalleryItem({
  photo,
  index,
  spanClass,
  onOpen,
  onKeyDown
}: {
  photo: Photo;
  index: number;
  spanClass: string;
  onOpen: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay: (index % 6) * 0.06 }}
      className={cn("col-span-1", spanClass)}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={onKeyDown}
        aria-label={`Open ${photo.title ?? photo.alt} in lightbox`}
        className="group relative block w-full cursor-zoom-in overflow-hidden bg-card outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className={cn("relative w-full", aspectClass[photo.aspect])}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.04]"
            loading={photo.priority ? "eager" : "lazy"}
          />
          {/* Soft hover overlay */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {/* Caption */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div>
              {photo.title && (
                <p className="font-serif text-xl text-foreground">
                  {photo.title}
                </p>
              )}
              {photo.category && (
                <p className="editorial-eyebrow mt-1">{photo.category}</p>
              )}
            </div>
            <span
              aria-hidden
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/60 text-foreground"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
      {/* Persistent index strip below */}
      <div className="mt-3 flex items-center justify-between">
        <span className="editorial-eyebrow text-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        {photo.category && (
          <Badge variant="secondary">{photo.category}</Badge>
        )}
      </div>
    </motion.li>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function Lightbox({
  photo,
  onClose,
  onNext,
  onPrev,
  position
}: {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  position: string;
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-desc"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 sm:p-8">
        <span className="editorial-eyebrow text-foreground/80">{position}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav buttons */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease }}
        className="relative mx-auto flex h-[88vh] w-[92vw] max-w-6xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="92vw"
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Caption */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 text-center sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {photo.title && (
          <h3
            id="lightbox-title"
            className="font-serif text-2xl text-foreground sm:text-3xl"
          >
            {photo.title}
          </h3>
        )}
        <p id="lightbox-desc" className="editorial-eyebrow mt-2">
          {photo.category ?? photo.alt}
        </p>
      </div>
    </motion.div>
  );
}
