import LinkCard from "./components/link-card";
import { site, tools } from "@/lib/site";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{site.name}</h1>
        <p className="text-neutral-500">{site.description}</p>
      </div>
      <nav aria-label="Tools" className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <LinkCard key={tool.href} href={tool.href} title={tool.name}>
            <p className="text-sm text-neutral-500">{tool.description}</p>
          </LinkCard>
        ))}
      </nav>
    </div>
  );
}
