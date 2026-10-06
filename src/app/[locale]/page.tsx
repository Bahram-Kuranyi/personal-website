import Link from "next/link";

import HeroCard from "@/components/HeroCard";
import SoftwareBackground from "@/components/SoftwareBackground";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";

import { getProjects, getExperiences } from "@/data/localized";
import { getDictionary } from "@/data/locales";
import { requireLocale } from "@/lib/locale";
import { routes, site, navigation } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const t = getDictionary(locale);
  return pageMetadata(locale, "", `${site.name} — ${t.seo.home}`, t.seo.description);
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const t = getDictionary(locale);
  const projects = getProjects(locale);
  const experiences = getExperiences(locale);
  return (
    <main className="relative isolate bg-black text-white [&>section]:relative [&>section]:z-10">
      <SoftwareBackground id="hero-software" />
      {/* HERO */}
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <header className="absolute left-0 top-0 z-20 w-full">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 md:px-12 lg:px-16">
            <Link href={routes.home(locale)} aria-label={`${site.name} — ${t.home}`} className="text-sm font-medium tracking-tight">BK</Link>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <nav className="flex gap-3 text-sm text-zinc-400 sm:gap-6">
                {navigation.map((section) => <a key={section} href={`#${section}`} className="transition hover:text-white">{t.nav[section]}</a>)}
              </nav>
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pt-24 md:px-12 lg:grid-cols-2 lg:px-16">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.28em] text-zinc-500">
              {t.hero.focus}
            </p>

            <h1 className="text-6xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl md:text-8xl">
              Bahram
              <br />
              Kuranyi
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-8 text-zinc-400 md:text-xl">
              {t.hero.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={site.cv}
                download
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                {t.hero.cv}
              </a>

              <a
                href="#work"
                className="rounded-full border border-white/15 px-6 py-3 text-sm text-zinc-300 transition hover:border-white/30 hover:text-white"
              >
                {t.hero.explore}
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <HeroCard copy={t.hero} />
          </div>
        </div>

        <a
          href="#work"
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-zinc-600 transition hover:text-zinc-300"
        >
          {t.hero.scroll}
        </a>
      </section>

      {/* WORK */}
      <section
        id="work"
        className="mx-auto max-w-7xl px-6 py-28 md:px-12 lg:px-16 lg:py-40"
      >
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
              {t.work.selected}
            </p>

            <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
              {t.work.heading}
            </h2>
          </div>

          <Link
            href={routes.work(locale)}
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            {t.work.all} →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} locale={locale} />
          ))}
        </div>
      </section>
      {/* EXPERIENCE */}
      <section
        id="experience"
        className="mx-auto max-w-7xl px-6 py-28 md:px-12 lg:px-16 lg:py-40"
      >
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            {t.experience.label}
          </p>

          <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
            {t.experience.heading}
          </h2>
        </div>

        <div>
          {experiences.map((experience) => (
            <ExperienceItem
              key={`${experience.company}-${experience.role}`}
              experience={experience}
            />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-7xl border-t border-white/10 px-6 py-28 md:px-12 lg:px-16 lg:py-40"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
          {t.nav.about}
        </p>

        <p className="mt-8 max-w-4xl text-3xl leading-tight tracking-tight text-zinc-200 md:text-5xl">
          {t.about.first}
          <span className="text-zinc-600"> {t.about.second}</span>
        </p>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-7xl border-t border-white/10 px-6 py-28 md:px-12 lg:px-16 lg:py-40"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
          {t.nav.contact}
        </p>

        <h2 className="mt-6 text-5xl font-medium tracking-tight md:text-7xl">
          {t.contact.first}
          <br />
          {t.contact.second}
        </h2>
        <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-400">
          <a href={`mailto:${site.email}`} className="transition hover:text-white">{t.contact.email}</a>
          <a href={site.github} className="transition hover:text-white">GitHub</a>
          <a href={site.linkedin} className="transition hover:text-white">LinkedIn</a>
        </div>
      </section>
    </main>
  );
}
