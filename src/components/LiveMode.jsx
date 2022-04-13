import React, { useState, useRef, useEffect } from "react";
import LiveProgress from "./LiveProgress/LiveProgress";
import ThemeCard from "./theme-card";

function randomIntUpTo(max) {
  if (max === 0) {
    return 0;
  }
  return Math.round(Math.random() * max);
}

export default function LiveMode({ barillet }) {
  const { impros, name } = barillet;
  const count = impros.length;
  const [currentId, setCurrentId] = useState(null);
  const alreadySeenIds = useRef(new Set());

  function reset() {
    alreadySeenIds.current = new Set();
    const randomTheme =
      impros.length > 0 ? impros[randomIntUpTo(count - 1)] : null;
    setCurrentId(randomTheme ? randomTheme.id : null);
  }

  useEffect(reset, [impros]);
  useEffect(() => window.scrollTo({ top: 0 }), []);

  if (impros.length === 0) {
    return "Votre barillet est vide";
  }

  if (currentId === null && alreadySeenIds.current.size === 0) {
    // loading
    return null;
  }

  function getNextId() {
    const remainingIds = impros
      .map((t) => t.id)
      .filter((id) => !alreadySeenIds.current.has(id));

    if (remainingIds.length === 0) {
      return null;
    }

    return remainingIds[randomIntUpTo(remainingIds.length - 1)];
  }

  function onNext() {
    alreadySeenIds.current.add(currentId);
    setCurrentId(getNextId());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onSkip() {
    let nextId = getNextId();
    // Avoid choosing the same card again
    const remainingIds = impros
      .map((t) => t.id)
      .filter((id) => !alreadySeenIds.current.has(id));

    while (remainingIds.length > 1 && nextId === currentId) {
      nextId = getNextId();
    }
    setCurrentId(nextId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const currentTheme = impros.find((t) => t.id === currentId);
  const hasSeenAllThemes = alreadySeenIds.current.size === impros.length;

  if (hasSeenAllThemes) {
    return (
      <div className="live-menu-end">
        <p>Vous avez vu tous les thèmes !</p>
        <button onClick={reset}>Recommencer</button>
      </div>
    );
  }

  return (
    <>
      <h1 className="live-title">{name}</h1>
      <ThemeCard theme={currentTheme} />
      <LiveProgress alreadySeenIds={alreadySeenIds.current} impros={impros} />
      <div className="live-menu-controls">
        <button onClick={onSkip}>Garder pour plus tard</button>
        <button onClick={onNext}>Impro suivante</button>
      </div>
    </>
  );
}
