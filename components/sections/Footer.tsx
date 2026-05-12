import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-editorial flex flex-col items-start justify-between gap-4 py-10 text-foreground/70 sm:flex-row sm:items-center">
        <span className="editorial-eyebrow">
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="editorial-eyebrow">All photographs reserved</span>
      </div>
    </footer>
  );
}
