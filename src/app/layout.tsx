import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Nikhil Sai Nambula is a Java backend developer working on distributed systems, Spring Boot microservices, high availability and low-level design. AWS Certified Developer.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nikhil-sai-portfolio.vercel.app"),
  title: {
    default: `${profile.name}, Java Backend Developer`,
    template: `%s · ${profile.shortName}`,
  },
  description,
  keywords: [
    "Nikhil Sai Nambula",
    "Java Backend Developer",
    "Backend Developer",
    "Distributed Systems",
    "Spring Boot",
    "Microservices",
    "System Design",
    "Low Level Design",
    "AWS Certified Developer",
    "Hyderabad",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${profile.name}, Java Backend Developer`,
    description,
    siteName: profile.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name}, Java Backend Developer`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
  ],
};

const themeScript = `(function(){try{var k="portfolio-theme";var s=localStorage.getItem(k);var t=(s==="light"||s==="dark")?s:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
