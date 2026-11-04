import Button from "../button";

export default function WheelControls({onFourth, onFifth, onReset}: {onFourth: () => void; onFifth: () => void; onReset: () => void;}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button onClick={onFourth} aria-label="Rotate up a fourth">↺ Fourth</Button>
      <Button onClick={onReset}>Reset to C</Button>
      <Button onClick={onFifth} aria-label="Rotate up a fifth">Fifth ↻</Button>
    </div>
  );
}
