import type { Metadata } from "next";
import BackLink from "../components/back-link";
import BackToTop from "../components/back-to-top";
import CircleOfFifths from "../components/circle-of-fifths/circle-of-fifths";

export const metadata: Metadata = {
  title: "Circle of Fifths",
  description: "Interactive circle of fifths and fourths with relative minors and diminished chords.",
};

export default function CircleOfFifthsPage() {
  return (
    <div className="space-y-6">
      <BackLink />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Circle of Fifths</h1>
        <p className="text-neutral-500">
          Rotate the wheel to bring a key to 12 o&apos;clock. Clockwise moves up a fifth, anticlockwise up a fourth.
          Highlighted segments are the diatonic chords of the selected key.
        </p>
      </div>
      <CircleOfFifths />
      <BackToTop />
    </div>
  );
}
