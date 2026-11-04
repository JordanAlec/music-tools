import type { Chord } from "@/lib/music/chords";
import type { MusicalKey } from "@/lib/music/circle-of-fifths";
import Card from "../card";
import Table from "../table";

function ChordName({ chord }: { chord: Chord }) {
  return (
    <span>
      <span className="font-medium">{chord.numeral}</span>
      <span className="mx-1.5 text-neutral-400">·</span>
      {chord.name}
    </span>
  );
}

export default function KeyTable({ title, musicalKey }: { title: string; musicalKey: MusicalKey }) {
  const rows = musicalKey.scale.map((note, degree) => {
    const triad = musicalKey.triads[degree];
    const seventh = musicalKey.sevenths[degree];
    return [
      <span key="degree">
        {degree + 1} <span className="text-xs text-neutral-500">{musicalKey.degreeNames[degree]}</span>
      </span>,
      note,
      <ChordName key="triad" chord={triad} />,
      triad.notes.join(" "),
      <ChordName key="seventh" chord={seventh} />,
      seventh.notes.join(" "),
    ];
  });

  return (
    <Card title={title}>
      <p className="mb-2 font-medium tracking-wide">{musicalKey.scale.join(" ")}</p>
      <Table headers={["Degree", "Note", "Triad", "Triad notes", "7th chord", "7th notes"]} rows={rows} />
    </Card>
  );
}
