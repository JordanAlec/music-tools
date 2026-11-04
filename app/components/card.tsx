export default function Card({title, children, className = ""}: {title: string; children: React.ReactNode; className?: string;}) {
  return (
    <section className={`rounded-lg border border-neutral-200 p-4 dark:border-neutral-800 ${className}`}>
      <h3 className="mb-3 font-semibold">{title}</h3>
      {children}
    </section>
  );
}
