"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteFooterNav() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
  }

  const linkClass = "text-[#2d7ab8] hover:underline dark:text-[#7eb8e0]";

  return (
    <nav
      aria-label="Site links"
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm text-[var(--lb-text-muted)]">
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
      {mounted ? (
        <>
          <span aria-hidden className="select-none px-1">
            |
          </span>
          <button className={linkClass} type="button" onClick={toggleTheme}>
            {isDark ? "Go Light?" : "Go Dark?"}
          </button>
        </>
      ) : null}
    </nav>
  );
}
