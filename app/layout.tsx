import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Mochiy_Pop_One } from "next/font/google";
import { SITE_URL } from "@/lib/env";
import "./globals.css";

const rounded = M_PLUS_Rounded_1c({
  variable: "--font-rounded",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const pop = Mochiy_Pop_One({
  variable: "--font-pop",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TmpVault - Anonymous File Sharing Platform",
  description:
    "Upload and share files anonymously with automatic expiry and temporary download links.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  applicationName: "TmpVault",
  keywords: [
    "anonymous file sharing",
    "temporary file hosting",
    "ephemeral upload",
    "secure file sharing",
    "tmpvault",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "TmpVault - Anonymous File Sharing Platform",
    description:
      "Anonymous temporary file sharing with expiring links and zero-account uploads.",
    siteName: "TmpVault",
  },
  twitter: {
    card: "summary",
    title: "TmpVault - Anonymous File Sharing Platform",
    description:
      "Anonymous temporary file sharing with expiring links and zero-account uploads.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rounded.variable} ${pop.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
