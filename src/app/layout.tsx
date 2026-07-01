import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://welkor.vercel.app";
const DESCRIPTION =
  "Step-by-step settlement platform for foreigners coming to Korea: from your home country through visa, housing, jobs, tax and community — in English and Korean.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WelKor — Welcome to Korea",
    template: "%s · WelKor",
  },
  description: DESCRIPTION,
  applicationName: "WelKor",
  keywords: [
    "Korea visa",
    "living in Korea",
    "move to Korea",
    "study in Korea",
    "jobs in Korea",
    "Korea housing",
    "Alien Registration Card",
    "foreigner in Korea",
    "E-7 visa",
    "D-2 visa",
    "K-ETA",
  ],
  openGraph: {
    type: "website",
    siteName: "WelKor",
    title: "WelKor — Welcome to Korea",
    description:
      "Visa, housing, jobs, tax and community for foreigners settling in Korea — in English and Korean.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "WelKor — Welcome to Korea",
    description:
      "Visa, housing, jobs, tax and community for foreigners settling in Korea.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
