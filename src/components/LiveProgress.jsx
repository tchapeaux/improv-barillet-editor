import React from "react";

const BUBBLE_STATES = {
  SEEN: "seen",
  SKIPPED: "skipped",
  EMPTY: "empty",
};

function Bubble({ state }) {
  return <div className={`progress-bubble ${state}`}></div>;
}

export default function LiveProgress({ barillet, alreadySeenIds }) {
  return (
    <div className="live-progress">
      {barillet
        .filter((impro) => alreadySeenIds.has(impro.id))
        .map((impro) => (
          <Bubble key={impro.id} state={BUBBLE_STATES.SEEN} />
        ))}
      {barillet
        .filter((impro) => !alreadySeenIds.has(impro.id))
        .map((impro) => (
          <Bubble key={impro.id} state={BUBBLE_STATES.EMPTY} />
        ))}
    </div>
  );
}
