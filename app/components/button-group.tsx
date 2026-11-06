import Button from "./button";

export default function ButtonGroup<T>({
  label,
  options,
  selected,
  optionLabel,
  onSelect,
}: {
  label: string;
  options: T[];
  selected: T;
  optionLabel: (option: T) => string;
  onSelect: (option: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2">
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Button
            key={optionLabel(option)}
            aria-pressed={isSelected}
            onClick={() => onSelect(option)}
            className={`min-w-14 ${isSelected ? "border-amber-500 bg-amber-50 dark:bg-amber-950" : ""}`}
          >
            {optionLabel(option)}
          </Button>
        );
      })}
    </div>
  );
}
