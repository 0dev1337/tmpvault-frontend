import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteFooterNav() {
  const linkClass = "text-[#2d7ab8] hover:underline dark:text-[#7eb8e0]";

  return (
    <nav
      aria-label="Site links"
      className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-[var(--lb-text-muted)] sm:gap-x-1">
      <Link className={linkClass} href="#faq">
        FAQ
      </Link>
      <span aria-hidden className="select-none px-1">
        |
      </span>
      <Link className={linkClass} href="#tools">
        Tools
      </Link>
      <span aria-hidden className="select-none px-1">
        |
      </span>
      <Link className={linkClass} href="mailto:contact@tmpvault.com">
        Contact
      </Link>
      <span aria-hidden className="select-none px-1">
        |
      </span>
      <ThemeToggle className={linkClass} />
    </nav>
  );
}
