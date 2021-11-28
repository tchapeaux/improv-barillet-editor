import util from "util";

export function downloadObjectAsJson(exportObj, exportName) {
  // from https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser

  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function readSingleFile(e, cb) {
  const file = e.target.files[0];
  if (!file) {
    return cb();
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const contents = e.target.result;
    cb(null, contents);
  };
  reader.readAsText(file);
}

