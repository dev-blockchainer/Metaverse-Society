const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

var attr = [{},{}]

for(let i=1; i<=8888; i++) {
    const metadata = JSON.parse(fs.readFileSync(`./Metadata/${i}.json`, 'utf-8'));
    const attr = 
    for(const key in metadata.attributes)
}