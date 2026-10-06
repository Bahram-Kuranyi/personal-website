import Link from "next/link";
import { getDictionary } from "@/data/locales";
import { routes, type Locale } from "@/lib/site";

export default function NotFoundContent({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  return (
    <main className="flex min-h-screen flex-col justify-center bg-black px-6 py-24 text-white sm:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-sm tracking-[0.3em] text-zinc-500">404</p>
        <h1 className="mt-6 text-4xl font-medium tracking-tight sm:text-6xl">{t.notFound.title}</h1>
        <p className="mt-6 max-w-lg leading-7 text-zinc-400">{t.notFound.description}</p>
        <nav className="mt-10 flex flex-wrap gap-6">
          <Link href={routes.home(locale)} className="underline underline-offset-8">{t.home}</Link>
          <Link href={routes.work(locale)} className="underline underline-offset-8">{t.work.all}</Link>
        </nav>
      </div>
    </main>
  );
}
