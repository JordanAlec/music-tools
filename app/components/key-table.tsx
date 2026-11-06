import type { Chord } from "@/lib/music/chords";
import type { MusicalKey } from "@/lib/music/circle-of-fifths";
import Card from "./card";
import NoteList from "./note-list";
import Table from "./table";

function ChordCell({ chord, highlightedNotes }: { chord: Chord; highlightedNotes: string[] }) {
  const isAltered = chord.notes.some((note) => highlightedNotes.includes(note));

  return (
    <>
      <span className={`block ${isAltered ? "text-amber-700 dark:text-amber-400" : ""}`}>
        <span className="font-medium">{chord.numeral}</span> <span className="text-neutral-400">·</span> {chord.name}
      </span>
      <span className="block text-xs text-neutral-500">
        <NoteList notes={chord.notes} highlighted={highlightedNotes} />
      </span>
    </>
  );
}

export default function KeyTable({
  title,
  musicalKey,
  highlightedNotes = [],
}: {
  title: string;
  musicalKey: MusicalKey;
  highlightedNotes?: string[];
}) {
  const rows = musicalKey.scale.map((note, degree) => [
    <span key="degree">
      {degree + 1}
      <span className="block text-xs text-neutral-500">{musicalKey.degreeNames[degree]}</span>
    </span>,
    <NoteList key="note" notes={[note]} highlighted={highlightedNotes} />,
    <ChordCell key="triad" chord={musicalKey.triads[degree]} highlightedNotes={highlightedNotes} />,
    <ChordCell key="seventh" chord={musicalKey.sevenths[degree]} highlightedNotes={highlightedNotes} />,
  ]);

  return (
    <Card title={title}>
      <p className="mb-2 font-medium tracking-wide">
        <NoteList notes={musicalKey.scale} highlighted={highlightedNotes} />
      </p>
      <Table headers={["Degree", "Note", "Triad", "7th"]} rows={rows} />
    </Card>
  );
}
