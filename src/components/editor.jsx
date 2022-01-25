import React, { useState } from "react";

import { downloadObjectAsJson, readSingleFile } from "../utils/file-io.js";

import {
  CateRatioCheck,
  NatureRatioCheck,
  TotalCardsCheck,
} from "./CheckIndicator.jsx";
import ThemeCard from "./theme-card.jsx";

import Theme from "../utils/theme.js";

import {
  CARD_PLACEHOLDERS,
  FBIA_DEFAULT_BARILLET,
  SMALL_BARILLET,
} from "../utils/data";

function percent(value, total) {
  return Math.floor((100 * Number(value)) / Number(total));
}

export default function Editor({ barillet, dispatchBarillet }) {
  const countThemes = barillet.length;
  const countM = barillet.filter((t) => t.nature === "M").length;
  const countC = barillet.filter((t) => t.nature === "C").length;
  const countL = barillet.filter((t) => t.categorie === "L").length;
  const countNotL = barillet.filter((t) => t.categorie !== "L").length;

  const [viewType, setViewType] = useState("grid");

  return (
    <>
      <div className="barillet-options">
        {countThemes > 0 ? (
          <button onClick={() => dispatchBarillet({ type: "reset" })}>
            Vider
          </button>
        ) : (
          <>
            <button
              onClick={() =>
                dispatchBarillet({
                  type: "replace",
                  payload: CARD_PLACEHOLDERS,
                })
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
          </>
        )}
      </div>
      {barillet.length === 0 ? (
        <div className="import-from-json">
          {"Charger depuis un JSON"}
          <input
            accept=".json,application/json"
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
        <>
          <div className="barillet-view-options">
            <button
              onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
            >
              👁️ {viewType == "grid" ? "List" : "Grid"}
            </button>
          </div>

          {viewType === "grid" ? (
            <div className="barillet-grid">
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

          {viewType === "list" ? (
            <div className="barillet-list">
              {barillet.map((theme) => {
                const onUpdateProp = (propName, propValue) => {
                  dispatchBarillet({
                    type: "update",
                    payload: { ...theme, [propName]: propValue },
                  });
                };

                return (
                  <div className="list-row" key={theme.id}>
                    <input
                      type="text"
                      onChange={({ target: { value } }) =>
                        onUpdateProp("nature", value)
                      }
                      value={theme.nature}
                    />
                    <input
                      type="text"
                      onChange={({ target: { value } }) =>
                        onUpdateProp("titre", value)
                      }
                      value={theme.titre}
                    />
                    <input
                      type="text"
                      onChange={({ target: { value } }) =>
                        onUpdateProp("nbJ", value)
                      }
                      value={theme.nbJ}
                    />
                    <input
                      type="text"
                      onChange={({ target: { value } }) =>
                        onUpdateProp("categorie", value)
                      }
                      value={theme.categorie}
                    />
                    <input
                      type="text"
                      onChange={({ target: { value } }) =>
                        onUpdateProp("duree", value)
                      }
                      value={theme.duree}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
        </>
      ) : null}
      <button
        className="add-card-btn"
        onClick={() => dispatchBarillet({ type: "add" })}
      >
        Ajouter une impro
      </button>
      <div className="barillet-summary">
        <TotalCardsCheck nbOfThemes={countThemes} />
        {countThemes > 0 ? (
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
        ) : null}
      </div>
      <div className="barillet-options">
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
    </>
  );
}
