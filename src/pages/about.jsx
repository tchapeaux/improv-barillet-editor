import * as React from "react";
/* ADD IMPORTS FROM TODO ON THE NEXT LINE */

/**
 * The About function defines the component that makes up the About page
 * This component is attached to the /about path in router.jsx
 */

export default function About() {
  return (
    <div className="page">
      <h1 className="title">À Propos</h1>
      <p>
        🦓 Ce site est maintenu par{" "}
        <a href="https://github.com/tchapeaux" target="_blank">
          tchapeaux
        </a>
        .
      </p>
      <p>
        Envie de faire de l'impro à Bruxelles ? Va voir la{" "}
        <a href="https://www.fbia.be" target="_blank">
          FBIA
        </a>
        .
      </p>
      <p>
        Hébergé sur{" "}
        <a href="https://glitch.com/" target="_blank">
          Glitch.com
        </a>
        , code source disponible{" "}
        <a
          href="https://glitch.com/edit/#!/improv-barillet-editor"
          target="_blank"
        >
          ici
        </a>
        .
      </p>
    </div>
  );
}
