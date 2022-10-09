import React, { useState } from "react";

import { downloadObjectAsJson, readSingleFile } from "../utils/file-io.js";
import { copyDataURL } from "../utils/copy-data-url";

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

export default function Editor({ barillet, dispatchBarillet }) {
  const { name, impros } = barillet;
  const countThemes = impros.length;
  const countM = impros.filter((t) => t.nature === "M").length;
  const countC = impros.filter((t) => t.nature === "C").length;
  const countL = impros.filter((t) => t.categorie === "L").length;
  const countNotL = impros.filter((t) => t.categorie !== "L").length;

  const [viewType, setViewType] = useState("grid");
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <h1 className="editor-title">Éditeur de barillets</h1>
      <div className="barillet-options">
        {countThemes > 0 ? (
          <>
            <input
              className="barillet-name"
              placeholder="Nom du barillet..."
              onChange={({ target: { value: newValue } }) =>
                dispatchBarillet({ type: "rename", payload: newValue })
              }
              value={name}
            />
            <button onClick={() => dispatchBarillet({ type: "reset" })}>
              ♻️ Vider
            </button>
            <button
              onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
            >
              👁️ {viewType == "grid" ? "Liste" : "Grille"}
            </button>{" "}
          </>
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
              Demi-barillet
            </button>
          </>
        )}
      </div>
      {impros.length === 0 ? (
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
                    payload: JSON.parse(content),
                  })
              )
            }
            type="file"
          />
        </div>
      ) : null}
      {impros.length > 0 ? (
        <>
          {viewType === "grid" ? (
            <div className="barillet-grid">
              {impros.map((card) => (
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
              <div className="list-row row-title">
                <span></span>
                <span>Nat</span>
                <span>Titre</span>
                <span>Nombre</span>
                <span>Catégorie</span>
                <span>Durée</span>
                <span>Divers</span>
              </div>
              {impros.map((theme) => {
                const onUpdateProp = (propName, propValue) => {
                  dispatchBarillet({
                    type: "update",
                    payload: { ...theme, [propName]: propValue },
                  });
                };

                return (
                  <div className="list-row" key={theme.id}>
                    <button
                      className="list-del-btn"
                      onClick={() =>
                        dispatchBarillet({ type: "remove", payload: theme.id })
                      }
                      title="Supprimer"
                    >
                      ❌
                    </button>
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
                    <input
                      type="text"
                      onChange={({ target: { value } }) =>
                        onUpdateProp("extra", value)
                      }
                      value={theme.extra}
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
          💾 Sauvegarder en JSON
        </button>
        <button
          onClick={() => {
            copyDataURL(barillet);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
          }}
        >
          {isCopied
            ? "✅ Copié dans le presse-papier"
            : "🔗 Partager une copie"}
        </button>
      </div>
    </>
  );
}
