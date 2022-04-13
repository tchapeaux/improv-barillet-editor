import React from "react";

import BalanceRow from "./BalanceRow";
import Bubble from "./Bubble";

export const BUBBLE_STATES = {
  SEEN: "seen",
  SKIPPED: "skipped",
  EMPTY: "empty",
};

export default function LiveProgress({ alreadySeenIds, impros }) {
  const alreadySeenCards = [...alreadySeenIds].map((id) =>
    impros.find((impro) => impro.id === id)
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
        <p>{alreadySeenIds.size}</p>
        {impros
          .filter((impro) => alreadySeenIds.has(impro.id))
          .map((impro) => (
            <Bubble key={impro.id} state={BUBBLE_STATES.SEEN} />
          ))}
        {impros
          .filter((impro) => !alreadySeenIds.has(impro.id))
          .map((impro) => (
            <Bubble key={impro.id} state={BUBBLE_STATES.EMPTY} />
          ))}
      </div>
      <>
        <hr />
        <div className="live-progress-stats">
          <BalanceRow
            labelLeft="C"
            labelRight="M"
            quantityLeft={alreadySeenC.length}
            quantityRight={alreadySeenM.length}
          />

          <BalanceRow
            labelLeft="Cate"
            labelRight="L"
            quantityLeft={alreadySeenCate.length}
            quantityRight={alreadySeenLibre.length}
          />
        </div>
      </>
    </div>
  );
}
