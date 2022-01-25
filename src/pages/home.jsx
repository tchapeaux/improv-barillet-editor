import React, { useState, useReducer } from "react";

import Editor from "../components/editor";
import Theme from "../utils/theme.js";
import LiveMode from "../components/LiveMode";

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
      alert("Are you sure you want to empty this barillet?");
      newState = [];
      break;
    case "replace":
      newState = [...action.payload];
      break;
  }

  localStorage.setItem("barillet", JSON.stringify(newState));

  return newState;
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
  const [view, setView] = useState("editor");

  return (
    <>
      {view === "editor" ? (
        <>
          <Editor barillet={barillet} dispatchBarillet={dispatchBarillet} />
          <button onClick={() => setView("liveMode")}>
            Lancer le barillet
          </button>
        </>
      ) : (
        <>
          <LiveMode barillet={barillet} />
          <button onClick={() => setView("editor")}>Revenir à l'éditeur</button>
        </>
      )}
    </>
  );
}
