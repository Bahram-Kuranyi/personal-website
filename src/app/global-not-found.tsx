import "./globals.css";
import NotFoundContent from "@/components/NotFoundContent";

export const metadata = { title: "Page not found — Bahram Kuranyi", robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  return <html lang="en"><body><NotFoundContent /></body></html>;
}
