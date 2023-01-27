const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const { layersOrder, format, rarity } = require("./config.js");

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}/build`;
const metDataFile = '_metadata.json';
const layersDir = `${process.env.PWD}/layers`;

let metadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];
let smokingLayer = {};
let goateeLayer = [];
const Exists = new Map();


const addRarity = _str => {
  let itemRarity;

  rarity.forEach((r) => {
    if (_str.includes(r.key)) {
      itemRarity = r.val;
    }
  });

  return itemRarity;
};

const cleanName = _str => {
  let name = _str.slice(0, -4);
  rarity.forEach((r) => {
    name = name.replace(r.key, "");
  });
  return name;
};

const getElements = path => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        name: cleanName(i),
        fileName: i,
        rarity: addRarity(i),
      };
    });
};

const layersSetup = layersOrder => {
  const layers = layersOrder.map((layerObj, index) => {
    const temp = {
      id: index,
      name: layerObj.name,
      location: `${layersDir}/${layerObj.name}/`,
      elements: getElements(`${layersDir}/${layerObj.name}/`),
      position: { x: 0, y: 0 },
      size: { width: format.width, height: format.height },
      number: layerObj.number
    }
    if(temp.name == "_smoking")
      smokingLayer = temp;
    else if(temp.name == "_goatee_angry")
      goateeLayer[0] = temp;
    else if(temp.name == "_goatee_common")
      goateeLayer[1] = temp;
    else if(temp.name == "_goatee_smile")
      goateeLayer[2] = temp;
    else if(temp.name == "_goatee_smoking")
      goateeLayer[3] = temp;
    else if(temp.name == "_goatee_tongue")
      goateeLayer[4] = temp;
    return temp;
  });

  return layers;
};

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
};

const saveLayer = (_canvas, _edition) => {
  fs.writeFileSync(`${buildDir}/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const addMetadata = _edition => {
  let dateTime = Date.now();
  let tempMetadata = {
    hash: hash.join(""),
    decodedHash: decodedHash,
    edition: _edition,
    date: dateTime,
    attributes: attributes,
  };
  metadata.push(tempMetadata);
  attributes = [];
  hash = [];
  decodedHash = [];
};

const saveMetadata = _edition => {
  let dateTime = Date.now();
  let tempMetadata = {
    hash: hash.join(""),
    decodedHash: decodedHash,
    edition: _edition,
    date: dateTime,
    attributes: attributes,
  };
  fs.writeFileSync(`metadata/${_edition}.json`, JSON.stringify(tempMetadata, null, 2));
  attributes = [];
  hash = [];
  decodedHash = [];
};

const addAttributes = (_element, _layer) => {
  let tempAttr = {
    id: _element.id,
    layer: _layer.name,
    name: _element.name,
    rarity: _element.rarity,
  };
  attributes.push(tempAttr);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (_layer, _edition) => {
  let rand = Math.random();
  if(_layer.name == "_body_props")
    rand = rand * 1.5;
  else if(_layer.name == "_eyes_props")
    rand = rand * 3;
  else if(_layer.name == "_head")
    rand = rand * 3;
  else if(_layer.name == "_neck")
    rand = rand * 2;
  else if(_layer.name == "_ears")
    rand = rand * 2;
  else if(_layer.name == "_noise")
    rand = rand * 2;
  // console.log(rand);
  let element =
    _layer.elements[Math.floor(rand * _layer.number)] ? _layer.elements[Math.floor(rand * _layer.number)] : null;
  if (element) {
    addAttributes(element, _layer);
    let image = await loadImage(`${_layer.location}${element.fileName}`);

    ctx.drawImage(
      image,
      _layer.position.x,
      _layer.position.y,
      _layer.size.width,
      _layer.size.height
    );

    if(_layer.name == "_body") {
      // console.log(element.name);
      if(element.name.includes("smoking")) {
        rand = Math.random();
        element = smokingLayer.elements[Math.floor(rand * smokingLayer.number)] ? smokingLayer.elements[Math.floor(rand * smokingLayer.number)] : null;
        addAttributes(element, smokingLayer);
        img = await loadImage(`${smokingLayer.location}${element.fileName}`);
        ctx.drawImage(
          img,
          _layer.position.x,
          _layer.position.y,
          _layer.size.width,
          _layer.size.height
        );
      } else {
        addAttributes({
          "id": 0,
          "layer": smokingLayer.name,
          "name": "None",
          "rarity": ""
        }, smokingLayer);
      }
      let layer;
      if(element.name.includes("angry"))
        layer = goateeLayer[0];
      else if(element.name.includes("common"))
        layer = goateeLayer[1];
      else if(element.name.includes("smile"))
        layer = goateeLayer[2];
      else if(element.name.includes("smoking"))
        layer = goateeLayer[3];
      else if(element.name.includes("tongue"))
        layer = goateeLayer[4];

      if(layer !==undefined) {
        rand = Math.random() * 5;
        element = layer.elements[Math.floor(rand * layer.number)] ? layer.elements[Math.floor(rand * layer.number)] : null;
        if(element) {
          addAttributes(element, layer);
          img = await loadImage(`${layer.location}${element.fileName}`);
          ctx.drawImage(
            img,
            _layer.position.x,
            _layer.position.y,
            _layer.size.width,
            _layer.size.height
          );
        } else {
          addAttributes({
            "id": 0,
            "layer": layer.name,
            "name": "None",
            "rarity": ""
          }, layer);
        }
      }
    }
  } else {
    addAttributes({
      "id": 0,
      "layer": _layer.name,
      "name": "None",
      "rarity": ""
    }, _layer);
  }
  saveLayer(canvas, _edition);
};

const createFiles = async edition => {
  const layers = layersSetup(layersOrder);

  let numDupes = 0;
  for (let i = 1; i <= edition; i++) {
    await layers.forEach(async (layer) => {
      if(layer.name !== "_smoking" && !layer.name.includes("_goatee")) {
        await drawLayer(layer, i);
      }
    });

    let key = hash.toString();
    if (Exists.has(key)) {
      console.log(
        `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
          key
        )}`
      );
      numDupes++;
      if (numDupes > edition) break; //prevents infinite loop if no more unique items can be created
      i--;
    } else {
      Exists.set(key, i);
      saveMetadata(i);
      console.log("Creating edition " + i);
    }
  }
};

const createMetaData = () => {
  fs.stat(`${buildDir}/${metDataFile}`, (err) => {
    if(err == null || err.code === 'ENOENT') {
      fs.writeFileSync(`${buildDir}/${metDataFile}`, JSON.stringify(metadata, null, 2));
    } else {
        console.log('Oh no, error: ', err.code);
    }
  });
};

module.exports = { buildSetup, createFiles, createMetaData };
