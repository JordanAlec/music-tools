export default function Button({ className = "", ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`touch-manipulation rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:border-neutral-700 dark:hover:bg-neutral-800 ${className}`}
      {...props}
    />
  );
}
