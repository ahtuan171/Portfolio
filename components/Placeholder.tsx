import type { ReactNode } from "react";
import { showDrafts } from "@/lib/site";

/**
 * Marks content that still needs real input from the site owner.
 * Renders only in `next dev` — production builds output nothing.
 */
export default function Placeholder({ children }: { children: ReactNode }) {
  if (!showDrafts) return null;
  return (
    <p className="placeholder-note mt-3" role="note">
      <span className="font-semibold">TODO (dev only):</span> {children}
    </p>
  );
}
