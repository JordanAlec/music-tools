import Container from "../container";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <Container className="py-6 text-sm text-neutral-500">
        {site.description}
      </Container>
    </footer>
  );
}
