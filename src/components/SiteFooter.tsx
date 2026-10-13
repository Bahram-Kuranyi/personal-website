export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-12 md:pb-12 md:pt-28 lg:px-16">
        <div className="flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-start md:justify-between md:gap-12 md:pt-10">
          <div className="min-w-0 space-y-3">
            <p className="text-xl leading-8 font-medium tracking-wide sm:text-2xl text-zinc-300">© 2026 Bahram Kuranyi</p>
            <p lang="en" className="max-w-2xl text-lg leading-8 sm:text-xl sm:leading-9">
              Designed &amp; engineered with <span className="font-medium text-zinc-300">Next.js</span>,{' '}
              <span className="font-medium text-zinc-300">TypeScript</span>,{' '}
              <span className="font-medium text-zinc-300">Sanity</span> &amp;{' '}
              <span className="font-medium text-zinc-300">Interactive Motion</span>.
            </p>
          </div>
          <a href="#top" lang="en" className="group inline-flex min-h-11 shrink-0 items-center gap-3 self-start rounded-sm text-xl leading-8 sm:text-2xl text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-200 motion-reduce:transition-none">
            Back to top
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
