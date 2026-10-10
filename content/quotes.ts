import type { ThemeId } from "@/lib/theme";

/**
 * Epigraphs, one per world (Classic has two). Quoted verbatim as the owner
 * supplied them, in English — they are never translated, and the page marks
 * them `lang="en"`. Attribution is the author (or the work, for Spider-Man);
 * don't add a book or speaker the owner didn't give.
 */
export interface Epigraph {
  text: string;
  author: string;
}

export const epigraphs = {
  spidey: { text: "With great power comes great responsibility.", author: "Spider-Man" },
  classic: {
    /** Footer colophon. */
    colophon: {
      text: "And, when you want something, all the universe conspires in helping you to achieve it.",
      author: "Paulo Coelho",
    },
    /** Opens the About sheet, like a book's epigraph. */
    epigraph: {
      text: "Beauty is terror. Whatever we call beautiful, we quiver before it.",
      author: "Donna Tartt",
    },
  },
  pixel: { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  minimalist: { text: "Some things are in our control and others not.", author: "Epictetus" },
} satisfies Partial<Record<ThemeId, Epigraph | Record<string, Epigraph>>>;
