export default function ExternalLink({href, children}: {href: string; children: React.ReactNode;}) {
  return (
    <a
      href={href}
      className="underline underline-offset-2 hover:text-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:hover:text-amber-400"
    >
      {children}
    </a>
  );
}
