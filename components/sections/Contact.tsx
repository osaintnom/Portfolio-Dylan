"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  // Light obfuscation only — the email still works as a mailto. This isn't a
  // security measure (mailto links are public by nature) — it just slows down
  // the laziest of address scrapers. For a portfolio inviting contact, that's
  // the right trade-off.
  const [local, domain] = site.email.split("@");
  const href = `mailto:${local}%40${domain}?subject=Project%20enquiry`;
  const telHref = `tel:${site.phoneDial}`;

  return (
    <section
      id="contact"
      className="relative w-full border-t border-border bg-background py-32 sm:py-40"
      aria-labelledby="contact-heading"
    >
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
        >
          <span className="editorial-eyebrow">— Get in touch</span>
          <h2
            id="contact-heading"
            className="editorial-heading mt-6 text-[clamp(2.5rem,7vw,6rem)] text-foreground"
          >
            Moments don&rsquo;t repeat.
            <br />
            That&rsquo;s why I shoot them.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="mt-14 flex flex-col gap-10 border-t border-border pt-10"
        >
          <a
            href={href}
            className="group inline-flex flex-col"
            aria-label={`Email ${site.name}`}
          >
            <span className="editorial-eyebrow text-foreground/60">Email</span>
            <span className="mt-2 inline-flex items-center gap-3 font-serif text-[clamp(1.5rem,3.5vw,3rem)] text-foreground">
              {/* Rendered live — local%40domain decodes to local@domain in the browser. */}
              <span className="border-b border-foreground/30 pb-1 transition-colors group-hover:border-foreground">
                {site.email}
              </span>
              <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </a>

          <a
            href={telHref}
            className="group inline-flex flex-col"
            aria-label={`Call ${site.name}`}
          >
            <span className="editorial-eyebrow text-foreground/60">Phone</span>
            <span className="mt-2 inline-flex items-center gap-3 font-serif text-[clamp(1.5rem,3.5vw,3rem)] text-foreground">
              <span className="border-b border-foreground/30 pb-1 transition-colors group-hover:border-foreground">
                {site.phoneDisplay}
              </span>
              <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </a>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-serif text-xl text-foreground sm:text-2xl">
                {site.name}
              </span>
              <span className="editorial-eyebrow text-foreground/60">
                Photographer
              </span>
            </div>
            <span className="editorial-eyebrow text-foreground/60">
              Based in {site.location}
            </span>
          </div>
        </motion.div>

        {/* Optional socials */}
        {(site.socials.instagram || site.socials.behance) && (
          <div className="mt-10 flex items-center gap-6">
            {site.socials.instagram && (
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-eyebrow text-foreground/70 transition-colors hover:text-foreground"
              >
                Instagram ↗
              </a>
            )}
            {site.socials.behance && (
              <a
                href={site.socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-eyebrow text-foreground/70 transition-colors hover:text-foreground"
              >
                Behance ↗
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
