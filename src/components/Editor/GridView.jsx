import React from "react";

import ThemeCard from "../theme-card.jsx";

export default function GridView({ impros, onDeleteImpro, onUpdateImpro }) {
  return (
    <div className="barillet-grid">
      {impros.map((card) => (
        <ThemeCard
          key={card.id}
          onDelete={() => onDeleteImpro(card.id)}
          onChangeTheme={(newTheme) => onUpdateImpro(newTheme, card.id)}
          theme={card}
        />
      ))}
    </div>
  );
}
