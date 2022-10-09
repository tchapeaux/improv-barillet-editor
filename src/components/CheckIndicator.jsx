import React from "react";

import percent from "../utils/percent.js";

function CheckIndicator({ content, isValid }) {
  return (
    <div
      className={`check-indicator ${isValid ? "check-valid" : "check-invalid"}`}
    >
      {content}
    </div>
  );
}

function TotalCardsCheck({ nbOfThemes }) {
  return (
    <CheckIndicator
      isValid={nbOfThemes > 0 && nbOfThemes % 3 === 0}
      content={`Total: ${nbOfThemes} thème${nbOfThemes > 1 ? "s" : ""}`}
    />
  );
}

function NatureRatioCheck({ nbOfM, nbOfC, nbOfThemes }) {
  return (
    <CheckIndicator
      isValid={nbOfThemes % 3 === 0}
      content={`${nbOfM} M / ${nbOfC} C (${percent(nbOfM, nbOfThemes)} % / 
      ${percent(nbOfC, nbOfThemes)} %)`}
    />
  );
}

function CateRatioCheck({ nbOfL, nbOfCate, nbOfThemes }) {
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

export default function ValidityIndicators({ impros }) {
  const countThemes = impros.length;
  const countM = impros.filter((t) => t.nature === "M").length;
  const countC = impros.filter((t) => t.nature === "C").length;
  const countL = impros.filter((t) => t.categorie === "L").length;
  const countNotL = impros.filter((t) => t.categorie !== "L").length;

  return (
    <>
      <TotalCardsCheck nbOfThemes={countThemes} />
      {countThemes > 0 && (
        <>
          <NatureRatioCheck
            nbOfC={countC}
            nbOfM={countM}
            nbOfThemes={countThemes}
          />
          <CateRatioCheck
            nbOfCate={countNotL}
            nbOfL={countL}
            nbOfThemes={countThemes}
          />
          <div>
            <a
              href="https://drive.google.com/file/d/1LhHamiDoLfvjBT-eljnxLvvovdtNO5Tv/view?usp=sharing"
              target="_blank"
            >
              Liste des catégories
            </a>
          </div>
        </>
      )}
    </>
  );
}
