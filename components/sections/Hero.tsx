"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { site } from "@/lib/site";
import { heroPhoto } from "@/lib/photos";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const photo = heroPhoto();

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Featured image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Layered overlays — bottom gradient + soft vignette to keep text legible
            without dimming the photo more than necessary. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)"
          }}
        />
      </motion.div>

      {/* Top eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 1.0 }}
        className="absolute left-0 right-0 top-24 z-10"
      >
        <div className="container-editorial flex items-center justify-between text-foreground/70">
          <span className="editorial-eyebrow">Est. {new Date().getFullYear()}</span>
          <span className="editorial-eyebrow hidden sm:inline">
            {site.location}
          </span>
        </div>
      </motion.div>

      {/* Name + tagline */}
      <div className="container-editorial relative z-10 flex h-full flex-col justify-end pb-24 sm:pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.55 }}
          className="editorial-heading text-foreground text-[clamp(3.5rem,11vw,11rem)]"
        >
          {site.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.95 }}
          className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <p className="font-sans text-base text-muted-foreground sm:text-lg">
              <span className="editorial-eyebrow mr-3 align-middle">—</span>
              {site.tagline}
            </p>
            <p className="mt-3 max-w-md font-sans text-sm text-muted-foreground/80">
              {site.positioning}
            </p>
          </div>

          <Link
            href="#portfolio"
            className="group inline-flex items-center gap-3 text-foreground"
            aria-label="Scroll to portfolio"
          >
            <span className="editorial-eyebrow">View work</span>
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/40 transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
            >
              <ArrowDownRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Animated scroll line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, ease, delay: 1.4 }}
        className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-px origin-bottom bg-foreground/30"
        aria-hidden
      />
    </section>
  );
}
