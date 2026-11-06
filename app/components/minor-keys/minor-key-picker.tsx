import type { MinorKey } from "@/lib/music/minor-keys";
import Button from "../button";

export default function MinorKeyPicker({
  keys,
  selected,
  onSelect,
}: {
  keys: MinorKey[];
  selected: MinorKey;
  onSelect: (key: MinorKey) => void;
}) {
  return (
    <div role="group" aria-label="Minor key" className="flex flex-wrap justify-center gap-2">
      {keys.map((key) => {
        const isSelected = key === selected;
        return (
          <Button
            key={key.tonic}
            aria-pressed={isSelected}
            onClick={() => onSelect(key)}
            className={`min-w-14 ${isSelected ? "border-amber-500 bg-amber-50 dark:bg-amber-950" : ""}`}
          >
            {key.tonic}m
          </Button>
        );
      })}
    </div>
  );
}
