import React, { useState, useRef, useEffect } from "react";

import ThemeCard from "./theme-card";

function randomIntUpTo(max) {
  if (max === 0) {
    return 0;
  }
  return Math.round(Math.random() * max);
}

export default function LiveMode({ barillet }) {
  const count = barillet.length;
  const [currentId, setCurrentId] = useState(null);
  const alreadySeenIds = useRef(new Set());

  useEffect(reset, []);

  if (barillet.length === 0) {
    return "Votre barillet est vide";
  }

  if (currentId === null && alreadySeenIds.current.size === 0) {
    // loading
    return null;
  }

  function reset() {
    alreadySeenIds.current = new Set();
    const randomTheme =
      barillet.length > 0 ? barillet[randomIntUpTo(count - 1)] : null;
    setCurrentId(randomTheme ? randomTheme.id : null);
  }

  function getNextId() {
    const remainingIds = barillet
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
  }

  function onSkip() {
    let nextId = getNextId();
    // Avoid choosing the same card again
    const remainingIds = barillet
      .map((t) => t.id)
      .filter((id) => !alreadySeenIds.current.has(id));

    while (remainingIds.length > 1 && nextId === currentId) {
      nextId = getNextId();
    }
    setCurrentId(nextId);
  }

  const currentTheme = barillet.find((t) => t.id === currentId);
  const hasSeenAllThemes = alreadySeenIds.current.size === barillet.length;

  return (
    <>
      {hasSeenAllThemes ? (
        <>
          <p>Vous avez vu tous les thèmes !</p>
          <button onClick={reset}>Recommencer</button>
        </>
      ) : (
        <>
          <p>
            Vues: {alreadySeenIds.current.size} / Restantes :
            {barillet.length - alreadySeenIds.current.size}
          </p>
          <ThemeCard theme={currentTheme} />
          <div className="live-menu">
            <button onClick={onSkip}>Garder pour plus tard</button>
            <button onClick={onNext}>Impro suivante</button>
          </div>
        </>
      )}
    </>
  );
}
