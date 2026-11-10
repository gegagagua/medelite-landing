type Props = {
  eyebrow: string;
  title: string;
  body?: string;
};

export function PageHero({ eyebrow, title, body }: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14 grain">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-15%] h-[42rem] w-[42rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="container-wide relative z-10">
        <p className="text-eyebrow">{eyebrow}</p>
        <h1 className="mt-6 text-display max-w-3xl">{title}</h1>
        {body ? (
          <p className="mt-8 text-lead max-w-2xl">{body}</p>
        ) : null}
      </div>
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-line/60" />
    </section>
  );
}
