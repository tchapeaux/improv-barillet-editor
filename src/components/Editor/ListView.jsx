import React from "react";
import ThemeRow from "../theme-row";

export default function ListView({ impros, onDeleteImpro, onUpdateImpro }) {
  return (
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
      {impros.map((theme) => (
        <ThemeRow
          key={theme.id}
          onDelete={() => onDeleteImpro(theme.id)}
          onChangeTheme={(newTheme) => onUpdateImpro(newTheme, theme.id)}
          theme={theme}
        />
      ))}
    </div>
  );
}
