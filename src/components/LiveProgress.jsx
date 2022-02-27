import React from "react";

import percent from "../utils/percent";

const BUBBLE_STATES = {
  SEEN: "seen",
  SKIPPED: "skipped",
  EMPTY: "empty",
};

function Bubble({ state }) {
  return <div className={`progress-bubble ${state}`}></div>;
}

export default function LiveProgress({ barillet, alreadySeenIds }) {
  const alreadySeenCards = [...alreadySeenIds].map((id) =>
    barillet.find((impro) => impro.id === id)
  );

  const alreadySeenM = alreadySeenCards.filter((impro) => impro.nature === "M");
  const alreadySeenC = alreadySeenCards.filter((impro) => impro.nature === "C");

  const alreadySeenLibre = alreadySeenCards.filter(
    (impro) => impro.categorie === "L"
  );
  const alreadySeenCate = alreadySeenCards.filter(
    (impro) => impro.categorie !== "L"
  );

  return (
    <div className="live-progress">
      <div className="live-progress-bubbles">
        {barillet
          .filter((impro) => alreadySeenIds.has(impro.id))
          .map((impro) => (
            <Bubble key={impro.id} state={BUBBLE_STATES.SEEN} />
          ))}
        <p>{alreadySeenIds.size}</p>
        {barillet
          .filter((impro) => !alreadySeenIds.has(impro.id))
          .map((impro) => (
            <Bubble key={impro.id} state={BUBBLE_STATES.EMPTY} />
          ))}
      </div>
      {alreadySeenIds.size > 0 ? (
        <div className="live-progress-stats">
          <p>{`C/M = ${alreadySeenC.length} / ${
            alreadySeenM.length
          } = ${percent(
            alreadySeenC.length,
            alreadySeenC.length + alreadySeenM.length
          )}%`}</p>
          <p>{`Cate/L = ${alreadySeenCate.length} / ${
            alreadySeenLibre.length
          } = ${percent(
            alreadySeenCate.length,
            alreadySeenCate.length + alreadySeenLibre.length
          )}%`}</p>
        </div>
      ) : null}
    </div>
  );
}
