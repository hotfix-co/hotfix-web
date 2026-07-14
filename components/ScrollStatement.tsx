"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface ScrollStatementProps {
  strong: string;
  rest: string;
  headingId?: string;
}

/**
 * The page's signature moment: a statement that pins while the reader
 * scrolls through it, lighting up word by word — the thesis in ink,
 * the supporting text in warm gray. Collapses to a static block under
 * prefers-reduced-motion and on screens without room to pin.
 */
export default function ScrollStatement({
  strong,
  rest,
  headingId,
}: ScrollStatementProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [litCount, setLitCount] = useState(0);

  const strongWords = strong.split(" ");
  const restWords = rest.split(" ");
  const totalWords = strongWords.length + restWords.length;

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      // Fallback for viewports where the section doesn't pin: light up
      // based on how far the block has travelled into the viewport.
      const progress =
        scrollable > 60
          ? -rect.top / scrollable
          : (window.innerHeight - rect.top) / (window.innerHeight * 0.9);
      const clamped = Math.min(1, Math.max(0, progress));
      setLitCount(Math.round(clamped * totalWords));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, totalWords]);

  const effectiveLit = reduced ? totalWords : litCount;

  const wordClass = (index: number, strongPart: boolean) => {
    if (index >= effectiveLit) return "statement-word";
    return strongPart
      ? "statement-word is-lit-strong"
      : "statement-word is-lit";
  };

  const renderWords = (words: string[], offset: number, strongPart: boolean) =>
    words.map((word, i) => (
      <Fragment key={`${word}-${i}`}>
        <span className={wordClass(offset + i, strongPart)}>{word}</span>{" "}
      </Fragment>
    ));

  return (
    <div ref={wrapRef} className="relative md:h-[170vh]">
      <div className="flex items-center md:sticky md:top-0 md:min-h-screen">
        <p className="statement-text max-w-5xl">
          <strong className="statement-strong">
            <span id={headingId}>{renderWords(strongWords, 0, true)}</span>
          </strong>
          {renderWords(restWords, strongWords.length, false)}
        </p>
      </div>
    </div>
  );
}
