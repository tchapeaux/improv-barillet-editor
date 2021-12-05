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

      <div className="instructions">
        <h2>Mais qu'est-ce que c'est</h2>
        <p>
          Cet outil vous permet de créer des barillets de matchs
          d'improvisation.
        </p>
        <p>
          Composez votre barillet ci-dessus puis exportez-le en PDF pour pouvoir
          l'imprimer. Pour un meilleur rendu, veuillez utiliser le navigateur
          Chrome.
        </p>

        <p>
          Les changements sont enregistrés dans votre navigateur, vous pouvez
          donc fermer la page et reprendre votre édition plus tard. Vous pouvez
          également sauvegarder puis ré-importer un barillet.
        </p>

        <p>
          Cet outil est gratuit, n'utilise aucun cookies ni autre méthode de
          tracking des visiteurs. Si vous l'appréciez, ou si vous voulez
          suggérer une amélioration, vous pouvez me contacter à<br />
          chapeauxthomas AT gmail POINT com.
        </p>
      </div>

      <h2>Qui a fait ça</h2>
      <p>
        👯‍♂️ Web app par 🐢{" "}
        <a href="https://github.com/tchapeaux" target="_blank">
          tchapeaux
        </a>{" "}
        et 🎨 Banjopalmo.
      </p>
      <p>
        🦓 Envie de faire de l'impro à Bruxelles ? Va voir la{" "}
        <a href="https://www.fbia.be" target="_blank">
          FBIA
        </a>
        .
      </p>
      <p>
        Hébergé par{" "}
        <a href="https://vercel.com" target="_blank">
          Vercel
        </a>
        , code source disponible{" "}
        <a
          href="https://github.com/tchapeaux/improv-barillet-editor"
          target="_blank"
        >
          sur Github
        </a>
        .
      </p>
    </div>
  );
}
