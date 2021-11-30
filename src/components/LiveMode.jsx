import React, { useState, useRef } from "react";

import ThemeCard from "./theme-card";

function randomIntUpTo(max) {
  return Math.round(Math.random() * max);
}

export default function LiveMode({ barillet }) {
  const count = barillet.length;
  const [currentId, setCurrentId] = useState(
    barillet[randomIntUpTo(count - 1)].id
  );
  const alreadySeenIds = useRef(new Set());

  function reset() {
    alreadySeenIds.current = new Set();
    setCurrentId(barillet[randomIntUpTo(count - 1)].id);
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
        <p>Vous n'avez plus de thèmes !</p>
      ) : (
        <>
          <p>
            Vues: {alreadySeenIds.current.size} / Restantes :
            {barillet.length - alreadySeenIds.current.size}
          </p>
          <ThemeCard theme={currentTheme} />
          <button onClick={onSkip}>Garder pour plus tard</button>
          <button onClick={onNext}>Impro suivante</button>
        </>
      )}
    </>
  );
}
