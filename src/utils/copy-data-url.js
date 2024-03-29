import LZUTF8 from "lzutf8";

export function copyDataURL(data) {
  if (!navigator?.clipboard?.writeText) {
    return alert(
      "Votre navigateur ne supporte pas la copie dans le presse-papier"
    );
  }

  const json = JSON.stringify(data);
  const encoded = LZUTF8.compress(json, { outputEncoding: "Base64" });

  const params = new URLSearchParams({ barilletDataBase64: encoded });

  navigator.clipboard.writeText(
    `${window.location.origin}?${params.toString()}`
  );
}
