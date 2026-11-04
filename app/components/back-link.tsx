import Link from "next/link";

export default function BackLink({href = "/", children = "Back home"}: {href?: string; children?: React.ReactNode;}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:hover:text-neutral-100"
    >
      <span aria-hidden>←</span>
      {children}
    </Link>
  );
}
