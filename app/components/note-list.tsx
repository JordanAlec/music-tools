import { Fragment } from "react";

export default function NoteList({ notes, highlighted = [] }: { notes: string[]; highlighted?: string[] }) {
  return (
    <span>
      {notes.map((note, index) => (
        <Fragment key={index}>
          {index > 0 && " "}
          {highlighted.includes(note) ? (
            <mark className="rounded bg-amber-100 px-0.5 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
              {note}
            </mark>
          ) : (
            note
          )}
        </Fragment>
      ))}
    </span>
  );
}
