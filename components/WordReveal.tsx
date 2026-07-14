"use client";

import { Fragment } from "react";

interface WordRevealProps {
  text: string;
  baseDelay?: number;
  step?: number;
  className?: string;
}

/**
 * Splits text into words and reveals them one by one with the
 * blur-up animation defined in globals.css (.word-reveal).
 * Pure CSS after render, so it also plays without hydration.
 */
export default function WordReveal({
  text,
  baseDelay = 0,
  step = 0.06,
  className = "",
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className="word-reveal"
            style={{ animationDelay: `${baseDelay + i * step}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
