import Link from "next/link";
import Card from "./card";

export default function LinkCard({href, title, children}: {href: string; title: string; children: React.ReactNode;}) {
  return (
    <Link
      href={href}
      className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
    >
      <Card title={title} className="h-full transition-colors group-hover:border-amber-500 group-hover:bg-amber-50 dark:group-hover:bg-amber-950">
        {children}
      </Card>
    </Link>
  );
}
