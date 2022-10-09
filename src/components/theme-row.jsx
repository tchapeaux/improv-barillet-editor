import React from "react";

export default function ThemeRow({ theme, onChangeTheme, onDelete }) {
  const onUpdateProp = (propName, propValue) => {
    onChangeTheme({ ...theme, [propName]: propValue });
  };

  return (
    <div className="list-row" key={theme.id}>
      <button
        className="list-del-btn"
        onClick={() => onDelete(theme.id)}
        title="Supprimer"
      >
        ❌
      </button>
      <input
        type="text"
        onChange={({ target: { value } }) => onUpdateProp("nature", value)}
        value={theme.nature}
      />
      <input
        type="text"
        onChange={({ target: { value } }) => onUpdateProp("titre", value)}
        value={theme.titre}
      />
      <input
        type="text"
        onChange={({ target: { value } }) => onUpdateProp("nbJ", value)}
        value={theme.nbJ}
      />
      <input
        type="text"
        onChange={({ target: { value } }) => onUpdateProp("categorie", value)}
        value={theme.categorie}
      />
      <input
        type="text"
        onChange={({ target: { value } }) => onUpdateProp("duree", value)}
        value={theme.duree}
      />
      <input
        type="text"
        onChange={({ target: { value } }) => onUpdateProp("extra", value)}
        value={theme.extra}
      />
    </div>
  );
}
