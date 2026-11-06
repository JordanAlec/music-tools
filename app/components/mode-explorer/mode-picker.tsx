import type { ModeFamily, ModeOption } from "@/lib/music/mode-explorer";
import ButtonGroup from "../button-group";

export default function ModePicker({
  families,
  selected,
  onSelect,
}: {
  families: ModeFamily[];
  selected: ModeOption;
  onSelect: (mode: ModeOption) => void;
}) {
  return (
    <div className="space-y-4">
      {families.map((family) => (
        <div key={family.name} className="space-y-2">
          <h2 className="text-center text-sm font-medium text-neutral-500">{family.name}</h2>
          <ButtonGroup
            label={`${family.name} modes`}
            options={family.modes}
            selected={selected}
            optionLabel={({ name }) => name}
            onSelect={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
