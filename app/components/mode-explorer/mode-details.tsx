import { stepPattern } from "@/lib/music/intervals";
import type { ModeInKey } from "@/lib/music/mode-explorer";
import Card from "../card";
import KeyTable from "../key-table";
import NoteList from "../note-list";

export default function ModeDetails({ mode }: { mode: ModeInKey }) {
  const { name, parent, degree, tonic, scale, degrees, triads } = mode;
  const alteredDegrees = degrees.filter(({ isAltered }) => isAltered);
  const alteredNotes = scale.filter((_, index) => degrees[index].isAltered);

  return (
    <div className="w-full space-y-4">
      <header aria-live="polite" className="text-center">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm text-neutral-500">
          Mode {degree} of {parent}. Tonic chord: {triads[0].name} ({triads[0].quality})
        </p>
      </header>
      <Card title="Formula">
        <p className="text-lg font-medium tracking-wide">
          <NoteList notes={degrees.map(({ label }) => label)} highlighted={alteredDegrees.map(({ label }) => label)} />
        </p>
        <p className="mt-1 font-medium tracking-wide">
          <span className="text-sm text-neutral-500">Steps:</span> {stepPattern(scale).join(" ")}
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          W is a whole step, H a half step.{" "}
          {alteredDegrees.length > 0
            ? `Highlighted degrees differ from the major scale on ${tonic}.`
            : `Identical to the major scale on ${tonic}.`}
        </p>
      </Card>
      <KeyTable title={name} musicalKey={mode} highlightedNotes={alteredNotes} />
    </div>
  );
}
