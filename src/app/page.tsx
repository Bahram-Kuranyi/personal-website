import Link from "next/link";

import HeroCard from "@/components/HeroCard";
import SoftwareBackground from "@/components/SoftwareBackground";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";

import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <SoftwareBackground id="hero-software" />

        <header className="absolute left-0 top-0 z-20 w-full">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 lg:px-16">
            <span className="text-sm font-medium tracking-tight">BK</span>

            <nav className="flex gap-6 text-sm text-zinc-400">
              <a href="#work" className="transition hover:text-white">
                Work
              </a>

              <a href="#about" className="transition hover:text-white">
                About
              </a>

              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pt-24 md:px-12 lg:grid-cols-2 lg:px-16">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.28em] text-zinc-500">
              Software Engineer · AI & Modern Web
            </p>

            <h1 className="text-6xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl md:text-8xl">
              Bahram
              <br />
              Kuranyi
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-8 text-zinc-400 md:text-xl">
              I build modern software, explore AI, and turn ideas into digital
              products.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/Bahram-Kuranyi-CV.pdf"
                download
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Download CV
              </a>

              <a
                href="#work"
                className="rounded-full border border-white/15 px-6 py-3 text-sm text-zinc-300 transition hover:border-white/30 hover:text-white"
              >
                Explore Work ↓
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <HeroCard />
          </div>
        </div>

        <a
          href="#work"
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-zinc-600 transition hover:text-zinc-300"
        >
          Scroll
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
              Selected Work
            </p>

            <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
              Things I build.
            </h2>
          </div>

          <Link
            href="/work"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            View all work →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
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
            Experience
          </p>

          <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
            Built through practice.
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
          About
        </p>

        <p className="mt-8 max-w-4xl text-3xl leading-tight tracking-tight text-zinc-200 md:text-5xl">
          Engineer by training.
          <span className="text-zinc-600"> Builder by nature.</span>
        </p>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-7xl border-t border-white/10 px-6 py-28 md:px-12 lg:px-16 lg:py-40"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
          Contact
        </p>

        <h2 className="mt-6 text-5xl font-medium tracking-tight md:text-7xl">
          Let&apos;s build
          <br />
          something good.
        </h2>
      </section>
    </main>
  );
}
