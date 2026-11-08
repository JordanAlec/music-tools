import type { Metadata } from "next";
import BackLink from "../components/back-link";
import ExternalLink from "../components/external-link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The source code, how to contribute, and how AI is used in this project.",
};

function Section({title, children}: {title: string; children: React.ReactNode;}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <BackLink />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
        <p className="text-neutral-500">
          A collection of tools in a single web app to support music teaching and study.
        </p>
      </div>
      <Section title="Source code">
        <p>
          The code for this site is available on <ExternalLink href={site.repository}>GitHub</ExternalLink>.
        </p>
      </Section>
      <Section title="Contributing">
        <p>Contributions are welcome. Please open a pull request from a feature branch into <code>main</code>.</p>
        <p>Every commit to <code>main</code>, including merges, deploys to Vercel and goes live on this site.</p>
        <p>AI-generated code is welcome, but it will need review and approval before it is merged.</p>
        <p>
          Setup steps and the checks to run before pushing are in
          the <ExternalLink href={`${site.repository}#development`}>README</ExternalLink>.
        </p>
      </Section>
      <Section title="A note on AI">
        <p>
          This project is almost entirely written by AI. I know that may not sit well with everyone, particularly in a
          project about music.
        </p>
        <p>
          My view, and this project&apos;s position, is that AI is a perfectly acceptable tool for writing and reviewing
          code. I work as a software developer, where AI is used extensively, and this project is also a chance for me
          to learn more about tools like Copilot and Claude.
        </p>
        <p>
          That view does not extend to creative work. I do not support AI in music, art, or other creative works, and I
          do not endorse AI music generation apps like Suno.
        </p>
        <p>
          If you would rather not use or contribute to this project for that reason, I completely understand and respect
          your decision. It has been built extensively with Claude, and that is unlikely to change.
        </p>
      </Section>
    </div>
  );
}
