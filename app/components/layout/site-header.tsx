import Link from "next/link";
import Container from "../container";
import { site } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <Container className="flex h-14 items-center">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
      </Container>
    </header>
  );
}
