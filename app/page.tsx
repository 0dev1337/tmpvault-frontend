import { BoxLogo } from "@/components/BoxLogo";
import { SiteFooterNav } from "@/components/SiteFooterNav";
import { UploadPanel } from "@/components/UploadPanel";
import { SITE_URL } from "@/lib/env";

const DEMO_GOAL = 1660;
const DEMO_CURRENT = 1570;
export const dynamic = "force-static";

export default function Home() {
  const goalPct = Math.min(100, Math.round((DEMO_CURRENT / DEMO_GOAL) * 100));
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TmpVault",
    url: SITE_URL,
    description:
      "Anonymous temporary file sharing with expiring links and zero-account uploads.",
  };

  return (
    <div className="lb-page-bg relative flex min-h-screen flex-col text-[var(--lb-text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-center gap-4 px-4 pb-8 sm:mt-12 sm:px-6">
        <div className="flex items-center justify-center gap-1 sm:gap-2.5">
          <div className="min-w-0">
            <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--lb-text)] dark:text-[var(--lb-text)] sm:text-4xl">
              TmpVault
            </h1>
            <p className="mt-0.5 text-sm font-normal text-[var(--lb-text-muted)] sm:text-base">
              Temporary file hosting
            </p>
          </div>
          <BoxLogo className="h-11 w-11 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]" />
        </div>
        <p className="max-w-sm text-center text-sm leading-relaxed text-[var(--lb-text-muted)] sm:text-[15px]">
          Temporary uploads up to 1 GB are allowed. You should read the FAQ.
        </p>

        <div className="flex w-full flex-col gap-4">
          <UploadPanel />
          <SiteFooterNav />
        </div>
        {/* Pill goal bar — visual echo of Litterbox support meter */}
        <div className="w-full space-y-2 pt-1">
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
