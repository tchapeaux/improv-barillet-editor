import React from "react";

import percent from "../utils/percent.js";

export function CheckIndicator({ content, isValid }) {
  return (
    <div
      className={`check-indicator ${isValid ? "check-valid" : "check-invalid"}`}
    >
      {content}
    </div>
  );
}

export function TotalCardsCheck({ nbOfThemes }) {
  return (
    <CheckIndicator
      isValid={nbOfThemes > 0 && nbOfThemes % 3 === 0}
      content={`Total: ${nbOfThemes} thème${nbOfThemes > 1 ? "s" : ""}`}
    />
  );
}

export function NatureRatioCheck({ nbOfM, nbOfC, nbOfThemes }) {
  return (
    <CheckIndicator
      isValid={nbOfThemes % 3 === 0}
      content={`${nbOfM} M / ${nbOfC} C (${percent(nbOfM, nbOfThemes)} % / 
      ${percent(nbOfC, nbOfThemes)} %)`}
    />
  );
}

export function CateRatioCheck({ nbOfL, nbOfCate, nbOfThemes }) {
  return (
    <CheckIndicator
      isValid={nbOfThemes % 3 === 0}
      content={`${nbOfL} L / ${nbOfCate} caté (${percent(
        nbOfL,
        nbOfThemes
      )} % / 
      ${percent(nbOfCate, nbOfThemes)} %)`}
    />
  );
}
