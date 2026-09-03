// Line icons for the plain (non-link) bento cards on the Containerstauung
// and Gefahrgutschulung pages. Same viewBox and stroke weight as the icons
// in the header and contact components, so they read as one set.
const paths: Record<string, string> = {
  crate: "M4 6h16v12H4z M4 12h16 M12 6v12",
  package: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M4 7.5l8 4.5 8-4.5 M12 12v9",
  lock: "M7 10V7a5 5 0 0 1 10 0v3 M5 10h14v10H5z M12 14v3",
  scale: "M12 4v15 M8 20h8 M5 8h14 M5 8l-2.5 6a3 3 0 0 0 6 0L5 8z M19 8l-2.5 6a3 3 0 0 0 6 0L19 8z",
  clipboard: "M9 4.5h6a1 1 0 0 1 1 1V6h2v14H6V6h2v-.5a1 1 0 0 1 1-1z M9 4.5a3 3 0 0 1 6 0 M9 12h6 M9 16h4",
  tag: "M4 4h7l9 9-7 7-9-9V4z M8 8h.01",
  document: "M8 3h6l4 4v14H6V3h2z M14 3v4h4 M9 13h6 M9 17h6",
  ban: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M6 6l12 12",
};

export function FeatureIcon({ name }: { name: string }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <span className="bento-card__icon" aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </span>
  );
}
