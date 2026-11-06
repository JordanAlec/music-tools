import type { Mode } from "@/lib/music/modes";
import Card from "../card";
import Table from "../table";

export default function ModesTable({ tonic, modes }: { tonic: string; modes: Mode[] }) {
  const rows = modes.map((mode) => [
    <span key="mode">
      <span className="font-medium">
        {mode.tonic} {mode.name}
      </span>
      <span className="block text-xs text-neutral-500">Degree {mode.degree}</span>
    </span>,
    mode.quality,
    mode.notes.join(" "),
  ]);

  return (
    <Card title={`Modes of ${tonic} major`}>
      <Table headers={["Mode", "Quality", "Notes"]} rows={rows} />
    </Card>
  );
}
