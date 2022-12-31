export default function ErrorAlert({ innerRef, message }) {
  if (!message) return;

  return (
    <div
      ref={innerRef}
      className="px-4 py-1 border rounded bg-red-200 text-red-700 mb-3"
      aria-live="assertive"
    >
      {message}
    </div>
  );
}
