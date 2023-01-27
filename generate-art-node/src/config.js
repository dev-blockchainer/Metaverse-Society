const layersOrder = [
    // { name: 'background', number: 1 },
    // { name: 'ball', number: 2 },
    // { name: 'eye color', number: 12 },
    // { name: 'iris', number: 3 },
    // { name: 'shine', number: 1 },
    // { name: 'shine', number: 1 },
    // { name: 'bottom lid', number: 3 },
    // { name: 'top lid', number: 3 },
    { name: '_bg', number: 17 },
    { name: '_body', number: 55 },
    { name: '_body_props', number: 89 },
    { name: '_ears', number: 34 },
    { name: '_eyes', number: 27 },
    { name: '_head', number: 82 },
    { name: '_eyes_props', number: 26 },
    { name: '_goatee_angry', number: 5 },
    { name: '_goatee_common', number: 5 },
    { name: '_goatee_smile', number: 5 },
    { name: '_goatee_smoking', number: 5 },
    { name: '_goatee_tongue', number: 5 },
    { name: '_neck', number: 22 },
    { name: '_noise', number: 21 },
    { name: '_smoking', number: 7 },
];
  
const format = {
    width: 500,
    height: 500
};

const rarity = [
    { key: "", val: "original" },
    { key: "rare_", val: "rare" }
];

const defaultEdition = 8888;

module.exports = { layersOrder, format, rarity, defaultEdition };