import React from "react";

import {
  CARD_PLACEHOLDERS,
  FBIA_DEFAULT_BARILLET,
  SMALL_BARILLET,
} from "../../utils/data";

export default function TitleHeader({
  isEmpty,
  onRenameBarillet,
  onReplaceBarillet,
  onResetBarillet,
  onSortBarillet,
  name,
  setViewType,
  viewType,
}) {
  return (
    <>
      <div className="barillet-options">
        {!isEmpty ? (
          <>
            <input
              className="barillet-name"
              placeholder="Nom du barillet..."
              onChange={onRenameBarillet}
              value={name}
            />
            <button onClick={onResetBarillet}>♻️ Vider</button>
            <button
              onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
            >
              👁️ {viewType == "grid" ? "Liste" : "Grille"}
            </button>
            <button onClick={onSortBarillet}>⬇ Trier</button>
          </>
        ) : (
          <>
          <p>Créer depuis un modèle :</p> 
            <button onClick={() => onReplaceBarillet(CARD_PLACEHOLDERS)}>
              Petit Exemple
            </button>

            <button onClick={() => onReplaceBarillet(FBIA_DEFAULT_BARILLET)}>
              Barillet complet
            </button>

            <button onClick={() => onReplaceBarillet(SMALL_BARILLET)}>
              Demi-barillet
            </button>
          </>
        )}
      </div>
    </>
  );
}
