import { BoxLogo } from "@/components/BoxLogo";
import { SiteFooterNav } from "@/components/SiteFooterNav";
import { UploadPanel } from "@/components/UploadPanel";

const DEMO_GOAL = 1660;
const DEMO_CURRENT = 1570;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamic = "force-static";

export default function Home() {
  const goalPct = Math.min(100, Math.round((DEMO_CURRENT / DEMO_GOAL) * 100));
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TmpVault",
    url: siteUrl,
    description:
      "Anonymous temporary file sharing with expiring links and zero-account uploads.",
  };

  return (
    <div className="lb-page-bg relative flex min-h-screen flex-col text-[var(--lb-text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex flex-row items-center justify-center gap-1">
          <div className="flex flex-col">
            <h1 className="font-sans text-4xl font-bold tracking-tight text-[var(--lb-text)] dark:text-[var(--lb-text)]">
              TmpVault
            </h1>
            <p className="mt-0.5 text-sm font-normal text-[var(--lb-text-muted)]">
              Temporary file hosting
            </p>
          </div>
          <BoxLogo className="shrink-0" />
        </div>
        <p className="max-w-md text-center text-[15px] leading-relaxed text-[var(--lb-text-muted)]">
          Temporary uploads up to 1 GB are allowed. You should read the FAQ.
        </p>

        <div className="w-full max-w-md self-center flex flex-col gap-4">
          <UploadPanel />
          <SiteFooterNav />
        </div>
        <p className="text-sm font-normal text-[var(--lb-text-muted)]">
          Consider supporting TmpVault, or purchasing some stickers from the
          Store!
        </p>
        {/* Pill goal bar — visual echo of Litterbox support meter */}
        <div className="space-y-2 pt-1">
          <p className="text-center text-xs leading-snug text-[var(--lb-text-muted)]">
            Consider supporting TmpVault, or purchasing some stickers from the
            Store!
          </p>
          <div
            className="relative h-9 overflow-hidden rounded-full border border-[var(--lb-border)] bg-[var(--lb-blue-pale)]"
            role="img"
            aria-label={`Demo goal ${DEMO_CURRENT} of ${DEMO_GOAL}`}>
            <div
              className="absolute inset-y-0 left-0 bg-[var(--lb-blue-active)] transition-[width] duration-500"
              style={{ width: `${goalPct}%` }}
            />
            <div className="relative flex h-full items-center justify-center text-xs font-semibold text-[var(--lb-text)]">
              ${DEMO_CURRENT.toLocaleString()}/${DEMO_GOAL.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
