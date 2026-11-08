import Link from "next/link";
import Container from "../container";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <Container className="flex items-center justify-between gap-4 py-6 text-sm text-neutral-500">
        <span>{site.description}</span>
        <Link
          href="/about"
          className="hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:hover:text-neutral-100"
        >
          About
        </Link>
      </Container>
    </footer>
  );
}
