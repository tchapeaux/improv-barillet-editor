import Theme from "./theme";

export const CARD_PLACEHOLDERS = [
  new Theme({
    nature: "M",
    titre: "Dans le brouillard",
    nbJ: "max 2 / eq",
    categorie: "L",
    duree: 4.5
  }),
  new Theme({
    nature: "C",
    titre: "Anniversaire d'un mauvais souvenir",
    nbJ: "tou·te·s",
    categorie: "L",
    duree: "2x3"
  }),

  new Theme({
    nature: "M",
    titre: "Range ton arme, Virginie",
    nbJ: "ill.",
    categorie: "Exercice de style",
    duree: "5x1",
    extra: "western, science-fiction, Disney, débat politique"
  })
];

const MIXTE_LIBRE = {
  nature: "M",
  titre: "",
  nbJ: "ill.",
  categorie: "L",
  duree: "0"
};

const MIXTE_CATE = {
  ...MIXTE_LIBRE,
  categorie: "<Une catégorie>"
};

const COMP_LIBRE = {
  ...MIXTE_LIBRE,
  nature: "C"
};

const COMP_CATE = {
  ...MIXTE_CATE,
  nature: "C"
};

export const FBIA_DEFAULT_BARILLET = [];

for (let x = 0; x < 12; x++) {
  FBIA_DEFAULT_BARILLET.push(new Theme(MIXTE_LIBRE));
}
for (let x = 0; x < 6; x++) {
  FBIA_DEFAULT_BARILLET.push(new Theme(MIXTE_CATE));
}
for (let x = 0; x < 6; x++) {
  FBIA_DEFAULT_BARILLET.push(new Theme(COMP_LIBRE));
}
for (let x = 0; x < 3; x++) {
  FBIA_DEFAULT_BARILLET.push(new Theme(COMP_CATE));
}

export const SMALL_BARILLET = [];
for (let x = 0; x < 8; x++) {
  SMALL_BARILLET.push(new Theme(MIXTE_LIBRE));
}
for (let x = 0; x < 4; x++) {
  SMALL_BARILLET.push(new Theme(MIXTE_CATE));
}
for (let x = 0; x < 4; x++) {
  SMALL_BARILLET.push(new Theme(COMP_LIBRE));
}
for (let x = 0; x < 2; x++) {
  SMALL_BARILLET.push(new Theme(COMP_CATE));
}
