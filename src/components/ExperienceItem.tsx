import type { Experience } from "@/data/experience";

type ExperienceItemProps = {
  experience: Experience;
};

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <article className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-[1fr_2fr] md:py-14">
      <div>
        <p className="text-sm text-zinc-500">{experience.period}</p>

        <p className="mt-2 text-sm text-zinc-600">{experience.location}</p>
      </div>

      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-2xl font-medium tracking-tight">
            {experience.role}
          </h3>

          <p className="text-sm text-zinc-500">{experience.company}</p>
        </div>

        <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
          {experience.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
