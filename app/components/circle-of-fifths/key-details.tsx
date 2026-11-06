import type { CirclePosition } from "@/lib/music/circle-of-fifths";
import { describeSignature } from "@/lib/music/key-signature";
import Button from "../button";
import KeySignatureSummary from "../key-signature-summary";
import KeyTable from "../key-table";
import ModesTable from "../modes-table";

export default function KeyDetails({
  details,
  enharmonic,
  onEnharmonicSwap,
}: {
  details: CirclePosition;
  enharmonic?: CirclePosition;
  onEnharmonicSwap: () => void;
}) {
  const { major, minor, diminished, signature, modes } = details;

  return (
    <div className="w-full space-y-4">
      <header aria-live="polite" className="text-center">
        <h2 className="text-xl font-semibold">
          {major.tonic} major / {minor.tonic} minor
        </h2>
        <p className="text-sm text-neutral-500">Diminished chord: {diminished.name}</p>
        {enharmonic && (
          <>
            <p className="text-sm text-neutral-500">
              Enharmonic with {enharmonic.major.tonic} major / {enharmonic.minor.tonic} minor (
              {describeSignature(enharmonic.signature)})
            </p>
            <Button onClick={onEnharmonicSwap} className="mt-2">
              Show {enharmonic.major.tonic} on the circle
            </Button>
          </>
        )}
      </header>
      <KeySignatureSummary signature={signature} />
      <div className="grid grid-cols-1 gap-4">
        <KeyTable title={`${major.tonic} major`} musicalKey={major} />
        <KeyTable title={`${minor.tonic} natural minor`} musicalKey={minor} />
      </div>
      <ModesTable title={`Modes of ${major.tonic} major`} modes={modes} />
    </div>
  );
}
