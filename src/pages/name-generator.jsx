import React, { useState } from "react";

import UNGENDERED_NAMES from "../utils/liste-names-mixtes-cosmo.js";

import BE_NAMES from "../utils/list-names-2022-be.js";
import FR_NAMES from "../utils/list-names-2022-fr.js";

const GENDERED_NAMES = [...BE_NAMES, ...FR_NAMES];

// For the names, we used a source which tagged each name as "male" or "female"
// We let the user chose to use this classification or not

function isMaleGender(name) {
  return GENDERED_NAMES.findIndex((n) => n === name) % 2 === 0;
}

function isFemaleGender(name) {
  return GENDERED_NAMES.findIndex((n) => n === name) % 2 === 1;
}

function getNewListOfNames(fromList) {
  const names = [];
  while (names.length < 4) {
    const idx = Math.round(Math.random() * fromList.length);
    const name = fromList[idx];
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

      <header>
        <p>
          Cette page vous permet de générer des prénoms à utiliser dans vos
          titres. Prenez garde à la parité des personnages proposés.
        </p>

        <div className="names-buttons-row">
          Générer des noms :
          <button
            onClick={() => setListOfNames(getNewListOfNames(GENDERED_NAMES))}
          >
            Genrés ♀️/♂️
          </button>
          <button
            onClick={() =>
              setListOfNames(
                getNewListOfNames(GENDERED_NAMES.filter(isMaleGender))
              )
            }
          >
            Masculins ♂️
          </button>
          <button
            onClick={() =>
              setListOfNames(
                getNewListOfNames(GENDERED_NAMES.filter(isFemaleGender))
              )
            }
          >
            Féminins ♀️
          </button>
          <button
            onClick={() => setListOfNames(getNewListOfNames(UNGENDERED_NAMES))}
          >
            Mixtes ♀️♂️
          </button>
        </div>
      </header>

      <main>
        <ul className="generated-names-list">
          {listOfNames.map((name) => (
            <li key={name}>👤 {name}</li>
          ))}
        </ul>
        {listOfNames.length > 0 && (
          <>
            <hr />
            <span>
              <a href="https://nameberry.com/popular-names/">
                Source noms genrés
              </a>{" "}
              (Liste récupérée en Octobre 2022)
            </span>
            <br />
            <span>
              <a href="https://www.cosmopolitan.fr/prenom-mixte-pour-un-enfant,2054133.asp">
                Source noms mixtes
              </a>{" "}
              (Liste récupérée en Octobre 2022)
            </span>
          </>
        )}
      </main>
    </div>
  );
}
