type Props = { title: string; text?: string; dark?: boolean; className?: string };

export default function SectionHeading({ title, text, dark = false, className = "" }: Props) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 className={`text-3xl leading-tight sm:text-5xl ${dark ? "text-white" : "text-night"}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{text}</p>}
    </div>
  );
}
