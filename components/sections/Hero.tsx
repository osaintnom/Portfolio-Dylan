"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — intentionally restrained. The photographer's name sits centered,
 * with a single short line below it. The category directory that follows
 * does the work of showing imagery; the hero just announces who this is.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[78svh] w-full items-center justify-center overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24"
      aria-label="Introduction"
    >
      {/* Subtle automobile backdrop — masked to a soft circle behind the title
          so the rest blends seamlessly into the page background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 60%)",
            maskImage:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 60%)",
          }}
        >
          <Image
            src="/photos/autos-03.jpg"
            alt=""
            fill
            priority
            sizes="120vmin"
            className="object-cover opacity-10"
          />
        </div>
      </div>

      {/* Soft radial wash so the page doesn't feel flat above the directory. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="container-editorial relative z-10 flex flex-col items-center text-center">
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-8 flex items-center gap-3 text-foreground/60"
        >
          <span className="h-px w-8 bg-foreground/30" aria-hidden />
          <span className="editorial-eyebrow">
            Photographer · Est. {new Date().getFullYear()}
          </span>
          <span className="h-px w-8 bg-foreground/30" aria-hidden />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
          className="editorial-heading text-foreground text-[clamp(3rem,10vw,9.5rem)]"
        >
          {site.name}
        </motion.h1>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="mt-6 max-w-xl font-sans text-base text-muted-foreground sm:text-lg"
        >
          {site.positioning}
        </motion.p>

        {/* Hint that the directory follows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
          className="mt-12 flex flex-col items-center gap-3 text-foreground/50"
        >
          <span className="editorial-eyebrow">Choose a category</span>
          <span
            aria-hidden
            className="block h-10 w-px bg-gradient-to-b from-foreground/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
