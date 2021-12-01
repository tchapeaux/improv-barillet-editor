import React from "react";

import { downloadObjectAsJson, readSingleFile } from "../utils/file-io.js";
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
        Ajouter une impro
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
