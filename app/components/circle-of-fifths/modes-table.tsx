import type { Mode } from "@/lib/music/modes";
import Card from "../card";
import Table from "../table";

export default function ModesTable({ tonic, modes }: { tonic: string; modes: Mode[] }) {
  const rows = modes.map((mode) => [
    <span key="mode" className="font-medium">
      {mode.tonic} {mode.name}
    </span>,
    mode.degree,
    mode.quality,
    mode.notes.join(" "),
  ]);

  return (
    <Card title={`Modes of ${tonic} major`}>
      <Table headers={["Mode", "Degree", "Quality", "Notes"]} rows={rows} />
    </Card>
  );
}
