"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <nav
        className="container-editorial flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="#top"
          className="font-serif text-lg tracking-ultra-tight text-foreground"
          aria-label={`${site.name} — back to top`}
        >
          {site.name}
        </Link>
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="#portfolio"
              className="editorial-eyebrow text-foreground/80 hover:text-foreground transition-colors"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="editorial-eyebrow text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
