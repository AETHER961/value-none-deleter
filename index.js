var fs = require("fs");
var jsonFiles = fs.readdirSync("./json/");
const jsonFilesLength = jsonFiles.length;
const dirNewPath = "./newerJson";

function makeNewDirectory(directoryname = "") {
  fs.mkdirSync(directoryname, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Directory ${directoryname} has been created.`);
  });
}
function loadJSON(filename = "") {
  return JSON.parse(
    fs.existsSync(filename) ? fs.readFileSync(filename).toString() : '""'
  );
}
function saveJSON(filename = "", json = '""') {
  return fs.writeFileSync(filename, JSON.stringify(json, null, 2));
}

function doTheWholeThing() {
  makeNewDirectory(dirNewPath);
  for (let i = 1; i < jsonFilesLength + 1; i++) {
    const obj = loadJSON(`./json/${i}.json`);

    for (j = 0; j < obj.attributes.length; j++) {
      if (obj.attributes[j].value === "None") {
        delete obj.attributes[j];
      }
    }
    console.log("after object", obj);
    saveJSON(`./newerJson/${i}.json`, obj);
  }
}
doTheWholeThing();
