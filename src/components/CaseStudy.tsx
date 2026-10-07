import type { CaseStudySection } from "@/data/projects";
import { getDictionary } from "@/data/locales";
import type { Locale } from "@/lib/site";

export default function CaseStudy({ sections, locale }: { sections?: readonly CaseStudySection[]; locale: Locale }) {
  if (!sections?.length) return null;
  const labels = getDictionary(locale).caseStudy;
  return (
    <div className="mt-20 divide-y divide-white/10">
      {sections.map(({ id, body, items }) => (
        <section key={id} aria-labelledby={`case-${id}`} className="grid gap-5 py-10 md:grid-cols-[1fr_2fr] md:gap-12 md:py-14">
          <h2 id={`case-${id}`} className="text-xl font-medium tracking-tight text-zinc-200">{labels[id]}</h2>
          <div className="max-w-2xl text-base leading-8 text-zinc-400">
            {body && <p>{body}</p>}
            {items && <ul className="list-disc space-y-4 pl-5 marker:text-zinc-500">{items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </div>
        </section>
      ))}
    </div>
  );
}
