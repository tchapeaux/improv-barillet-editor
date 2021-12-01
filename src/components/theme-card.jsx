import React, { useRef } from "react";

export default function ThemeCard({ theme, onChangeTheme, onDelete }) {
  function onChangeAttribute(attr, newValue) {
    if (onChangeTheme) {
      return onChangeTheme({
        ...theme,
        [attr]: newValue,
      });
    }
  }

  function onToggleNature() {
    return onChangeAttribute("nature", theme.nature === "M" ? "C" : "M");
  }

  return (
    <>
      <div className="theme-card">
        <button
          className={`nature nature-${theme.nature}`}
          onClick={onToggleNature}
          title={theme.nature === "M" ? "Mixte" : "Comparée"}
        >
          {theme.nature}
        </button>
        <textarea
          className="titre"
          onChange={({ target: { value } }) =>
            onChangeAttribute("titre", value)
          }
          placeholder="Indiquez votre titre"
          value={theme.titre}
        ></textarea>
        <div className="double-row">
          <input
            className="nbJ"
            onChange={({ target: { value } }) =>
              onChangeAttribute("nbJ", value)
            }
            value={theme.nbJ}
          />
          {"·"}
          <input
            className={`categorie${
              theme.categorie !== "L" ? " cate-not-libre" : ""
            }`}
            onChange={({ target: { value } }) =>
              onChangeAttribute("categorie", value)
            }
            value={theme.categorie}
          />
        </div>
        <div className="duree">
          <input
            onChange={({ target: { value } }) =>
              onChangeAttribute("duree", value)
            }
            value={theme.duree}
          />
          <span>min</span>
        </div>
        <textarea
          className="extra"
          onChange={({ target: { value } }) =>
            onChangeAttribute("extra", value)
          }
          placeholder="Ajouter des infos suppl. ici"
          value={theme.extra}
        ></textarea>

        {onDelete ? (
          <button className="del-card-btn" onClick={onDelete}>
            supprimer
          </button>
        ) : null}
      </div>
    </>
  );
}
