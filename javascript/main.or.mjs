let loadLens = require("cambria/dist/lens-loader.js").loadLens
let applyLensToDoc = require("cambria").applyLensToDoc

function translateStream() {
  let doc = JSON.parse(document.getElementById("inputTileText").innerHTML);
  let jsonLens = JSON.parse(document.getElementById("lensTileText").innerHTML);
  let lens = loadLens(jsonLens);
  let newDoc = applyLensToDoc(lens, doc);
  document.getElementById("outputTileText").innerHTML = JSON.stringify(newDoc, null, 4)
}

async function fetchStream(in_element, element) {
  let key = document.getElementById(in_element).value;
  let resp = await fetch("https://gateway-clay.ceramic.network/api/v0/streams/" + key);
  let data = await resp.json();
  data = data.state.content;
  document.getElementById(element).innerHTML = JSON.stringify(data, null, 4)
}

document.getElementById("outputTileButton").addEventListener("click", translateStream);
document.getElementById("inputTileButton").addEventListener("click", () => {
  fetchStream("inputTile", "inputTileText")
});
document.getElementById("lensTileButton").addEventListener("click", () => {
  fetchStream("lensTile", "lensTileText")
});
