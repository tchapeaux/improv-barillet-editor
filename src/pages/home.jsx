import React, { useReducer } from "react";

import Theme from "../utils/theme.js";
import { downloadObjectAsJson, readSingleFile } from "../utils/file-io.js";
import ThemeCard from "../components/theme-card.jsx";

import {
  CARD_PLACEHOLDERS,
  FBIA_DEFAULT_BARILLET,
  SMALL_BARILLET,
} from "../utils/data";

function barilletReducer(state, action) {
  let newState;

  switch (action.type) {
    case "add":
      newState = [...state, new Theme(action.payload)];
      break;
    case "remove":
      newState = state.filter((card) => card.id !== action.payload);
      break;
    case "update":
      newState = state.map((card) =>
        card.id === action.payload.id ? action.payload : card
      );
      break;
    case "reset":
      newState = [];
      break;
    case "replace":
      newState = [...action.payload];
      break;
  }

  localStorage.setItem("barillet", JSON.stringify(newState));

  return newState;
}

function percent(value, total) {
  return Math.floor((100 * Number(value)) / Number(total));
}

const barilletFromStorage = localStorage.getItem("barillet");

/**
 * The Home function defines the content that makes up the main content of the Home page
 *
 * This component is attached to the /about path in router.jsx
 * The function in app.jsx defines the page wrapper that this appears in along with the footer
 */

export default function Home() {
  const [barillet, dispatchBarillet] = useReducer(
    barilletReducer,
    barilletFromStorage ? JSON.parse(barilletFromStorage) : []
  );

  const countThemes = barillet.length;
  const countM = barillet.filter((t) => t.nature === "M").length;
  const countC = barillet.filter((t) => t.nature === "C").length;
  const countL = barillet.filter((t) => t.categorie === "L").length;
  const countNotL = barillet.filter((t) => t.categorie !== "L").length;

  return (
    <>
      <h1 className="title">{"Éditeur de barillet"}</h1>

      <div className="barillet-options">
        <button onClick={() => dispatchBarillet({ type: "reset" })}>
          Vider
        </button>

        <button
          onClick={() =>
            dispatchBarillet({ type: "replace", payload: CARD_PLACEHOLDERS })
          }
        >
          Exemple
        </button>

        <button
          onClick={() =>
            dispatchBarillet({
              type: "replace",
              payload: FBIA_DEFAULT_BARILLET,
            })
          }
        >
          Barillet complet
        </button>
        <button
          onClick={() =>
            dispatchBarillet({
              type: "replace",
              payload: SMALL_BARILLET,
            })
          }
        >
          Mini-barillet
        </button>
      </div>

      {barillet.length === 0 ? (
        <div className="import-from-json">
          {"Charger depuis un JSON"}
          <input
            onChange={(e) =>
              readSingleFile(
                e,
                (err, content) =>
                  content &&
                  dispatchBarillet({
                    type: "replace",
                    payload: JSON.parse(content).map((t) => new Theme(t)),
                  })
              )
            }
            type="file"
          />
        </div>
      ) : null}
      {barillet.length > 0 ? (
        <div className="barillet">
          {barillet.map((card) => (
            <ThemeCard
              key={card.id}
              onDelete={() =>
                dispatchBarillet({ type: "remove", payload: card.id })
              }
              onChangeTheme={(newTheme) =>
                dispatchBarillet({
                  type: "update",
                  payload: { ...newTheme, id: card.id },
                })
              }
              theme={card}
            />
          ))}
        </div>
      ) : null}
      <button
        className="add-card-btn"
        onClick={() => dispatchBarillet({ type: "add" })}
      >
        + Nouveau
      </button>

      <div className="barillet-summary">
        <div>{`Total: ${countThemes} thème${countThemes > 1 ? "s" : ""}`}</div>
        {countThemes > 0 ? (
          <>
            <div>
              {countM} M / {countC} C ({percent(countM, countThemes)} % /{" "}
              {percent(countC, countThemes)} %){" "}
            </div>
            <div>
              {countL} L / {countNotL} catés ({percent(countL, countThemes)} % /{" "}
              {percent(countNotL, countThemes)} %){" "}
            </div>
          </>
        ) : null}
      </div>

      <div className="barillet-options">
        <button onClick={() => print()}>Exporter en PDF</button>
        <button
          onClick={() =>
            downloadObjectAsJson(
              barillet,
              `barillet-${new Date().toISOString()}`
            )
          }
        >
          Sauvegarder en JSON
        </button>
      </div>

      <div className="instructions">
        <h2>Mais qu'est-ce que c'est</h2>
        <p>
          Cet outil vous permet de créer des barillets de matchs
          d'improvisation.
        </p>
        <p>
          Composez votre barillet ci-dessus puis exportez-le en PDF pour pouvoir
          l'imprimer. Pour un meilleur rendu, veuillez utiliser le navigateur
          Chrome.
        </p>

        <p>
          Les changements sont enregistrés dans votre navigateur, vous pouvez
          donc fermer la page et reprendre votre édition plus tard. Vous pouvez
          également sauvegarder puis ré-importer un barillet.
        </p>

        <p>
          Cet outil est gratuit, n'utilise aucun cookies ni autre méthode de
          tracking des visiteurs. Si vous l'appréciez, ou si vous voulez
          suggérer une amélioration, vous pouvez me contacter à<br />
          chapeauxthomas AT gmail POINT com.
        </p>
      </div>
    </>
  );
}
