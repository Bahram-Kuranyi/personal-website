import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { locales } from "@/lib/site";
import { requireLocale } from "@/lib/locale";
import { getDictionary } from "@/data/locales";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
// Allow newly published project slugs below this layout; requireLocale still rejects unknown languages.
export const dynamicParams = true;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">{getDictionary(locale).navigation.skip}</a>
        {children}
      </body>
    </html>
  );
}
