import type { Chord } from "@/lib/music/chords";
import type { MusicalKey } from "@/lib/music/circle-of-fifths";
import Card from "../card";
import Table from "../table";

function ChordCell({ chord }: { chord: Chord }) {
  return (
    <>
      <span className="block">
        <span className="font-medium">{chord.numeral}</span> <span className="text-neutral-400">·</span> {chord.name}
      </span>
      <span className="block text-xs text-neutral-500">{chord.notes.join(" ")}</span>
    </>
  );
}

export default function KeyTable({ title, musicalKey }: { title: string; musicalKey: MusicalKey }) {
  const rows = musicalKey.scale.map((note, degree) => [
    <span key="degree">
      {degree + 1}
      <span className="block text-xs text-neutral-500">{musicalKey.degreeNames[degree]}</span>
    </span>,
    note,
    <ChordCell key="triad" chord={musicalKey.triads[degree]} />,
    <ChordCell key="seventh" chord={musicalKey.sevenths[degree]} />,
  ]);

  return (
    <Card title={title}>
      <p className="mb-2 font-medium tracking-wide">{musicalKey.scale.join(" ")}</p>
      <Table headers={["Degree", "Note", "Triad", "7th"]} rows={rows} />
    </Card>
  );
}
