import type { Alteration, MinorScale } from "@/lib/music/minor-keys";
import KeyTable from "../key-table";
import ModesTable from "../modes-table";

function describeAlterations(alterations: Alteration[]): string {
  return alterations.map(({ degree, from, to }) => `raised ${degree}th (${from} → ${to})`).join(", ");
}

export default function MinorScaleSection({
  scale,
  description,
  modesTitle = `Modes of ${scale.name}`,
}: {
  scale: MinorScale;
  description: string;
  modesTitle?: string;
}) {
  const highlightedNotes = scale.alterations.map(({ to }) => to);

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{scale.name}</h2>
        <p className="text-sm text-neutral-500">{description}</p>
        {scale.alterations.length > 0 && (
          <p className="text-sm">
            Differs from the natural minor by its {describeAlterations(scale.alterations)}. Highlighted notes and chords
            are the ones that change.
          </p>
        )}
      </div>
      <KeyTable title={scale.name} musicalKey={scale} highlightedNotes={highlightedNotes} />
      <ModesTable title={modesTitle} modes={scale.modes} highlightedNotes={highlightedNotes} />
    </section>
  );
}
