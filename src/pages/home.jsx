import React, { useState, useEffect, useReducer } from "react";
import LZUTF8 from "lzutf8";

import Editor from "../components/editor";
import Theme from "../utils/theme.js";
import LiveMode from "../components/LiveMode";

function barilletReducer(state, action) {
  let newState = state;

  switch (action.type) {
    case "add":
      newState = {
        name: state.name,
        impros: [...state.impros, new Theme(action.payload)],
      };
      break;
    case "remove":
      newState = {
        name: state.name,
        impros: state.impros.filter((card) => card.id !== action.payload),
      };
      break;
    case "update":
      newState = {
        name: state.name,
        impros: state.impros.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
      break;
    case "reset":
      const ok = confirm("Voulez-vous vraiment vider ce barillet ?");
      if (ok) {
        newState = { name: "", impros: [] };
      }
      break;
    case "replace":
      newState = { ...state, ...action.payload };
      break;
    case "rename":
      newState = {
        name: action.payload.substring(0, 50),
        impros: state.impros,
      };
      break;
  }

  if (newState !== undefined && newState !== state) {
    localStorage.setItem("barillet", JSON.stringify(newState));
  }

  return newState;
}

function getBarilletFromUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const barilletDataBase64 = params.get("barilletDataBase64");

  if (barilletDataBase64) {
    try {
      const decodedJson = LZUTF8.decompress(barilletDataBase64, {
        inputEncoding: "Base64",
      });

      const data = JSON.parse(decodedJson);
      return data;
    } catch (err) {
      // Ignore invalid base64 strings
      if (err.message?.includes("Invalid Base64 string")) {
        return console.error(
          "Could not parse barillet data from URL",
          err.message
        );
      }

      // Ignore invalid JSON
      if (err instanceof SyntaxError && err.message?.includes("JSON.parse")) {
        return console.error(
          "Could not parse barillet data from URL",
          err.message
        );
      }

      throw err;
    } finally {
      // Remove the params if they exist
      history.replaceState(null, "", window.location.origin);
    }
  }
}

/**
 * The Home function defines the content that makes up the main content of the Home page
 *
 * This component is attached to the /about path in router.jsx
 * The function in app.jsx defines the page wrapper that this appears in along with the footer
 */

export default function Home() {
  const [barillet, dispatchBarillet] = useReducer(barilletReducer, {
    name: "",
    impros: [],
  });
  const [view, setView] = useState("editor");

  // initialize barillet
  useEffect(() => {
    const storedData = localStorage.getItem("barillet");
    const barilletFromStorage = storedData && JSON.parse(storedData);
    const barilletFromURL = getBarilletFromUrlParams();
    const initBarillet = barilletFromURL || barilletFromStorage;

    if (initBarillet) {
      dispatchBarillet({ type: "replace", payload: initBarillet });
    }
  }, []);

  return (
    <>
      {view === "editor" ? (
        <>
          <Editor barillet={barillet} dispatchBarillet={dispatchBarillet} />
          <button onClick={() => setView("liveMode")}>
            ???? Lancer le barillet
          </button>
        </>
      ) : (
        <>
          <LiveMode barillet={barillet} />
          <button onClick={() => setView("editor")}>
            ???? Revenir ?? l'??diteur
          </button>
        </>
      )}
    </>
  );
}
