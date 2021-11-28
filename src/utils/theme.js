let INDEX_ACC = 1;

export default class Theme {
  constructor(initialData) {
    this.id = initialData?.id || INDEX_ACC++;
    this.nature = initialData?.nature || "M";
    this.titre = initialData?.titre || "";
    this.nbJ = initialData?.nbJ || "ill";
    this.categorie = initialData?.categorie || "L";
    this.duree = initialData?.duree || 2;
    this.extra = initialData?.extra || '';
  }
}