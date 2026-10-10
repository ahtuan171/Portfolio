/**
 * Keeps the reader's place across a re-render that changes layout (a theme
 * or language switch): remember the nearest element with an id at the top
 * of the viewport and its offset, then hold it there while the new layout
 * settles (fonts and images of the new theme load after the re-render).
 */
export function captureScrollAnchor(): () => void {
  if (window.scrollY < 40) return () => {};
  const probe = document.elementFromPoint(window.innerWidth / 2, 96);
  const anchor = probe?.closest<HTMLElement>("[id]:not(body):not(#content)") ?? null;
  const id = anchor?.id;
  const offset = anchor ? anchor.getBoundingClientRect().top : 0;
  const ratio = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

  const restore = () => {
    const target = id ? document.getElementById(id) : null;
    const top = target
      ? window.scrollY + target.getBoundingClientRect().top - offset
      : ratio * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "instant" });
  };

  return () => {
    restore();
    // Re-apply on every layout change for a short settling window; stop
    // early if the visitor starts scrolling themselves.
    const observer = new ResizeObserver(restore);
    observer.observe(document.body);
    const stop = () => {
      observer.disconnect();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    window.setTimeout(stop, 2000);
  };
}
