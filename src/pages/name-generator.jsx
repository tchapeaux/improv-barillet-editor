import React, { useState } from "react";

import BE_NAMES from "../utils/list-names-2022-be.js";
import FR_NAMES from "../utils/list-names-2022-fr.js";

function getNewListOfNames(fromList) {
  const names = [];
  while (names.length < 4) {
    const idx = Math.round(Math.random() * fromList.length);
    const name = BE_NAMES[idx];
    if (!names.includes(name)) {
      names.push(name);
    }
  }

  return names;
}

export default function NameGenerator() {
  const [listOfNames, setListOfNames] = useState([]);

  return (
    <div className="page">
      <h1 className="title">Générateur de Prénoms 📛</h1>

      <div>
        Cette page vous permet de générer des prénoms à utiliser dans vos
        titres. Prenez garde à la parité.
      </div>

      <div>
        <button onClick={() => setListOfNames(getNewListOfNames(BE_NAMES))}>
          Générer depuis Top 200 BE
        </button>
        <button onClick={() => setListOfNames(getNewListOfNames(FR_NAMES))}>
          Générer depuis Top 200 FR
        </button>
        {listOfNames.map((name) => (
          <p>👤 {name}</p>
        ))}
        {listOfNames.length > 0 && (
          <>
            <hr />
            <span>
              <a href="https://nameberry.com/popular-names/">Source</a> (Liste
              récupérée en Octobre 2022)
            </span>
          </>
        )}
      </div>
    </div>
  );
}
