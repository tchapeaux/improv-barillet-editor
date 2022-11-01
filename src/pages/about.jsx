import * as React from "react";
import * as LucideIcons from "lucide-react";

/**
 * The About function defines the component that makes up the About page
 * This component is attached to the /about path in router.jsx
 */

export default function About() {
  return (
    <div className="page">
      <h1 className="editor-title">À Propos</h1>

      <div className="instructions">
        <h2>Aperçu</h2>
        <p>
          Cet outil vous permet de créer, partager et utiliser des barillets
          pour des matchs d'improvisation.
        </p>

        <p>
          Les changements sont enregistrés dans votre navigateur, vous pouvez
          donc fermer la page et reprendre votre édition plus tard. Vous pouvez
          également sauvegarder puis ré-importer un barillet ou partager un
          barillet par URL.
        </p>

        <p>
          Cet outil est gratuit, n'utilise aucun cookies ni autre méthode de
          tracking des visiteurs. Si vous l'appréciez, ou si vous voulez
          suggérer une amélioration, vous pouvez me contacter à{" "}
          <code>chapeauxthomas AT gmail POINT com</code>.
        </p>

        <h2>Comment imprimer un barillet ?</h2>

        <p>
          L'impression depuis le navigateur n'est pas toujours idéale. La
          procédure suivante donne un résultat acceptable:
        </p>

        <ol>
          <li>Utilisez le navigateur Google Chrome</li>
          <li>
            Mettez l'éditeur en mode <LucideIcons.Grid /> Grille
          </li>
          <li>Appuyez sur CTRL+P ou CMD+P pour basculer en mode impression</li>
          <li>
            Choisissez le format "Payage" et "plusieurs pages par feuille"
          </li>
        </ol>

        <h2>Comment utiliser le barillet en spectacle ?</h2>

        <p>
          L'application permet également d'utiliser le barillet en spectacle
          depuis votre smartphone.
        </p>

        <ol>
          <li>
            Transférez le barillet sur votre smartphone via l'export JSON ou le
            lien de partage.
          </li>
          <li>
            Appuyez sur "<LucideIcons.Bike /> Lancer le barillet" en bas de
            l'éditeur.
          </li>
          <li>L'interface tire les impros une par une, au hasard.</li>
          <li>
            Si une impro ne vous convient pas, vous pouvez la "Garder pour plus
            tard".
          </li>
          <li>
            L'interface vous affiche la proportion de Mixte et Comparée, et de
            Libre et Catégorie.
          </li>
        </ol>

        <h2>Crédits</h2>
        <p>
          Web app par 🐢{" "}
          <a href="https://github.com/tchapeaux" target="_blank">
            tchapeaux
          </a>{" "}
          et 🎨 Banjopalmo.
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
    </div>
  );
}
