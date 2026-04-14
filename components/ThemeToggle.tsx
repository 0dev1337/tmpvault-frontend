"use client";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <button className={className} type="button" onClick={toggleTheme}>
      Go Dark?
    </button>
  );
}
