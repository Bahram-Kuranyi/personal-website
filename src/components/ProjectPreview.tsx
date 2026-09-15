type ProjectPreviewProps = {
  type: "portfolio" | "freelance";
};

export default function ProjectPreview({ type }: ProjectPreviewProps) {
  if (type === "portfolio") {
    return (
      <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden bg-zinc-950 p-8">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>

            <span className="text-[10px] text-zinc-600">bahram.dev</span>
          </div>

          <div className="px-7 py-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Software Engineer
            </p>

            <h4 className="mt-4 text-3xl font-semibold leading-none tracking-tight">
              Bahram
              <br />
              Kuranyi
            </h4>

            <div className="mt-8 flex gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-[9px] font-medium text-black">
                Work
              </span>

              <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] text-zinc-400">
                Experience
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid h-full min-h-[320px] grid-cols-2 gap-4 overflow-hidden bg-zinc-950 p-8">
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative translate-y-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-lg">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Client
        </p>

        <div className="mt-12 space-y-3">
          <div className="h-2 w-3/4 rounded-full bg-white/20" />
          <div className="h-2 w-1/2 rounded-full bg-white/10" />
          <div className="h-16 rounded-xl bg-white/[0.05]" />
        </div>
      </div>

      <div className="relative -translate-y-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-lg">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Website
        </p>

        <div className="mt-10">
          <div className="aspect-square rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02]" />

          <div className="mt-4 h-2 w-2/3 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}
