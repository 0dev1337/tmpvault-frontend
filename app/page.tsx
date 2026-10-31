import Image from "next/image";
import { MascotLogo } from "@/components/MascotLogo";
import { SakuraPetals } from "@/components/SakuraPetals";
import { SiteFooterNav } from "@/components/SiteFooterNav";
import { UploadPanel } from "@/components/UploadPanel";
import { SITE_URL } from "@/lib/env";
import mangaGirl from "@/public/manga-girl.png";

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
    <div className='lb-page-bg relative flex min-h-dvh flex-col overflow-x-clip text-[var(--lb-text)]'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <SakuraPetals />
      {/* Single screen: stacked on mobile, hero | upload panel on desktop */}
      <main className='relative z-10 mx-auto grid w-full max-w-md flex-1 content-center gap-3 px-4 py-4 sm:gap-4 lg:max-w-5xl lg:grid-cols-2 lg:gap-x-14 lg:gap-y-4 lg:px-8'>
        <header className='flex items-center justify-center gap-2 sm:gap-3 lg:col-start-1 lg:flex-col lg:gap-1'>
          <div className='relative grid shrink-0 place-items-center'>
            <div className='lb-burst absolute size-28 rounded-full sm:size-44 lg:size-72' />
            <MascotLogo className='lb-bob relative h-16 w-16 sm:h-24 sm:w-24 lg:h-40 lg:w-40' />
            <span className='lb-bubble absolute -right-28 top-0 hidden whitespace-nowrap px-3 py-1 text-xs font-bold text-[var(--lb-blue-active-deep)] lg:block'>
              Nya~ drop it! ♡
            </span>
          </div>
          <div className='min-w-0 text-left lg:text-center'>
            <h1 className='font-display text-3xl leading-none text-[var(--lb-blue-active-deep)] [-webkit-text-stroke:1.5px_var(--lb-line)] [text-shadow:3px_3px_0_var(--lb-shadow)] sm:text-5xl lg:text-7xl'>
              TmpVault
            </h1>
            <p className='mt-1.5 text-xs font-bold text-[var(--lb-text)] sm:text-base lg:mt-3 lg:text-lg'>
              <span className='lb-sticker mr-1.5 inline-block px-2 py-0.5 text-xs'>
                一時保管庫
              </span>
              Temporary file hosting
            </p>
          </div>
        </header>

        <p className='text-center text-sm leading-snug text-[var(--lb-text-muted)] sm:text-[15px] lg:col-start-1'>
          Uploads up to <strong className='text-[var(--lb-text)]'>1 GB</strong>,
          gone when they expire. No account needed. Read the{" "}
          <a href='#faq' className='font-bold text-[var(--lb-link)] hover:underline'>
            FAQ
          </a>
          !
        </p>

        <section className='relative mt-14 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-16 lg:self-center'>
          <Image
            src={mangaGirl}
            alt=''
            priority
            className='pointer-events-none absolute -top-[72px] right-3 w-24 drop-shadow-[3px_3px_0_var(--lb-shadow)] lg:-right-2 lg:-top-[140px] lg:w-48 lg:drop-shadow-[4px_4px_0_var(--lb-shadow)]'
          />
          <div className='lb-card relative p-4 sm:p-5'>
            <span className='lb-sticker absolute -top-3.5 left-5 px-3 py-0.5 font-display text-xs'>
              UPLOAD ✦ アップロード
            </span>
            <UploadPanel />
          </div>
        </section>

        <div className='lg:col-start-1'>
          <SiteFooterNav />
        </div>

        {/* Pill goal bar — visual echo of Catbox support meter */}
        <section className='mx-auto w-full max-w-sm space-y-1.5 lg:col-start-1'>
          <p className='text-center text-xs leading-snug text-[var(--lb-text-muted)]'>
            応援してね! TmpVault is funded by users like you ♡
          </p>
          <div
            className='relative h-8 overflow-hidden rounded-full border-[2.5px] border-[var(--lb-line)] bg-[var(--lb-card)] shadow-[3px_3px_0_var(--lb-shadow)]'
            role='img'
            aria-label={`Demo goal ${DEMO_CURRENT} of ${DEMO_GOAL}`}>
            <div
              className='absolute inset-y-0 left-0 bg-[repeating-linear-gradient(45deg,var(--lb-blue-active)_0_10px,var(--lb-blue-mid)_10px_20px)] transition-[width] duration-500'
              style={{ width: `${goalPct}%` }}
            />
            <div className='relative flex h-full items-center justify-center font-display text-xs text-[var(--lb-text)]'>
              ${DEMO_CURRENT.toLocaleString()}/${DEMO_GOAL.toLocaleString()}
            </div>
          </div>
          <p className='text-center text-[11px] text-[var(--lb-text-muted)]'>
            Illustration by @aidigital_sensei
          </p>
        </section>
      </main>
    </div>
  );
}
