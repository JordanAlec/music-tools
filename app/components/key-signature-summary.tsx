import { describeSignature, signatureSymbol, type KeySignature } from "@/lib/music/key-signature";
import Card from "./card";

export default function KeySignatureSummary({ signature }: { signature: KeySignature }) {
  return (
    <Card title="Key signature">
      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-semibold">{signatureSymbol(signature)}</span>
        <div>
          <p>{describeSignature(signature)}</p>
          {signature.notes.length > 0 && (
            <p className="text-sm text-neutral-500">In order: {signature.notes.join(", ")}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
