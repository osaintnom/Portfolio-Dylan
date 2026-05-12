"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

/**
 * Floating "Contact" pill — appears after the user has scrolled past the hero
 * and hides itself when the contact section is already in view, so it never
 * fights the section it's pointing at.
 */
export function ContactFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.6;
      const contact = document.getElementById("contact");
      const inContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.8
        : false;
      setVisible(scrolled && !inContact);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8"
        >
          <Link
            href="#contact"
            aria-label="Jump to contact information"
            className="group inline-flex items-center gap-3 rounded-full border border-foreground/30 bg-background/80 px-5 py-3 text-foreground shadow-lg backdrop-blur-md transition-all hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <Mail className="h-4 w-4" />
            <span className="editorial-eyebrow">Contact</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
