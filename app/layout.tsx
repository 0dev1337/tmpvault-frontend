import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/env";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
