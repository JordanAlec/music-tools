import type { Mode } from "@/lib/music/modes";
import Card from "./card";
import NoteList from "./note-list";
import Table from "./table";

export default function ModesTable({
  title,
  modes,
  highlightedNotes = [],
}: {
  title: string;
  modes: Mode[];
  highlightedNotes?: string[];
}) {
  const rows = modes.map((mode) => [
    <span key="mode">
      <span className="font-medium">
        {mode.tonic} {mode.name}
      </span>
      <span className="block text-xs text-neutral-500">Degree {mode.degree}</span>
    </span>,
    mode.quality,
    <NoteList key="notes" notes={mode.notes} highlighted={highlightedNotes} />,
  ]);

  return (
    <Card title={title}>
      <Table headers={["Mode", "Quality", "Notes"]} rows={rows} />
    </Card>
  );
}
