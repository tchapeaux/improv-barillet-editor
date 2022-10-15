import { parse as json2csv } from "json2csv";

function downloadObject(objectDataStr, filename) {
  // from https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser

  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", objectDataStr);
  downloadAnchorNode.setAttribute("download", filename);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  downloadObject(dataStr, exportName + ".json");
}

export function downloadObjectAsCsv(exportArray, exportName) {
  const opts = {
    fields: ["nature", "titre", "nbJ", "categorie", "duree", "extra"],
  };
  var dataStr =
    "data:text/csv;charset=utf-8," +
    encodeURIComponent(json2csv(exportArray, opts));

  console.log(dataStr);

  downloadObject(dataStr, exportName + ".csv");
}

export function readSingleFile(e, cb) {
  const file = e.target.files[0];
  if (!file) {
    return cb();
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    const contents = e.target.result;
    cb(null, contents);
  };
  reader.readAsText(file);
}
