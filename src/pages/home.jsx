import React, { useState, useEffect, useReducer } from "react";
import LZUTF8 from "lzutf8";

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
      alert("Voulez-vous vraiment vider ce barillet ?");
      newState = [];
      break;
    case "replace":
      newState = [...action.payload];
      break;
  }

  if (newState !== undefined) {
    localStorage.setItem("barillet", JSON.stringify(newState));
  }

  return newState;
}

function getBarilletFromUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const barilletDataBase64 = params.get("barilletDataBase64");

  if (barilletDataBase64) {
    try {
      console.log("DECODING");
      console.log(barilletDataBase64);

      const decodedJson = LZUTF8.decompress(barilletDataBase64, {
        inputEncoding: "Base64",
      });

      const data = JSON.parse(decodedJson);
      console.log("new barillet", data);
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
  const [barillet, dispatchBarillet] = useReducer(barilletReducer, []);
  const [view, setView] = useState("editor");

  // initialize barillet
  useEffect(() => {
    const barilletFromStorage = JSON.parse(
      localStorage.getItem("barillet") || "[]"
    );
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
            🚂 Lancer le barillet
          </button>
        </>
      ) : (
        <>
          <LiveMode barillet={barillet} />
          <button onClick={() => setView("editor")}>
            🔙 Revenir à l'éditeur
          </button>
        </>
      )}
    </>
  );
}
