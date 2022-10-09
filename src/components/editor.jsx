import React, { useState } from "react";

import { downloadObjectAsJson } from "../utils/file-io.js";
import { copyDataURL } from "../utils/copy-data-url";

import ValidityIndicators from "./CheckIndicator.jsx";
import TitleHeader from "./Editor/TitleHeader.jsx";
import EmptyState from "./Editor/EmptyState.jsx";
import GridView from "./Editor/GridView.jsx";
import ListView from "./Editor/ListView.jsx";

export default function Editor({ barillet, dispatchBarillet }) {
  const { name, impros } = barillet;
  const isEmpty = impros.length === 0;

  const [viewType, setViewType] = useState("grid");
  const [isCopied, setIsCopied] = useState(false);

  const onRenameBarillet = ({ target: { value: newValue } }) =>
    dispatchBarillet({ type: "rename", payload: newValue });

  const onReplaceBarillet = (newBarillet) =>
    dispatchBarillet({
      type: "replace",
      payload: newBarillet,
    });

  const onResetBarillet = () => dispatchBarillet({ type: "reset" });

  const onUpdateImpro = (newTheme, improId) =>
    dispatchBarillet({
      type: "update",
      payload: { ...newTheme, id: improId },
    });

  const onDeleteImpro = (improId) =>
    dispatchBarillet({ type: "remove", payload: improId });

  const onSortBarillet = () => dispatchBarillet({ type: "sort" });

  return (
    <>
      <h1 className="editor-title">Éditeur de barillets</h1>
      <TitleHeader
        isEmpty={isEmpty}
        onRenameBarillet={onRenameBarillet}
        onReplaceBarillet={onReplaceBarillet}
        onResetBarillet={onResetBarillet}
        onSortBarillet={onSortBarillet}
        name={name}
        setViewType={setViewType}
        viewType={viewType}
      />
      {isEmpty && <EmptyState onReplaceBarillet={onReplaceBarillet} />}
      {!isEmpty && (
        <>
          {viewType === "grid" && (
            <GridView
              impros={impros}
              onDeleteImpro={onDeleteImpro}
              onUpdateImpro={onUpdateImpro}
            />
          )}
          {viewType === "list" && (
            <ListView
              impros={impros}
              onDeleteImpro={onDeleteImpro}
              onUpdateImpro={onUpdateImpro}
            />
          )}
        </>
      )}
      <button
        className="add-card-btn"
        onClick={() => dispatchBarillet({ type: "add" })}
      >
        Ajouter une impro
      </button>
      <div className="barillet-summary">
        <ValidityIndicators impros={impros} />
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
