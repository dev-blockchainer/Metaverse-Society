const fs = require('fs');

var CID = "QmRfRUMfMCKm3rgxSMRiJ8jP8HxBbGGzfy1Hs4dhcez9qd";

var temp = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [],
}
const legendary = {
    1 : "Snoop Kang",
    2 : "Elon Kang",
    3 : "Kangeta",
    4 : "Ultimate Kang",
    5 : "Iron MVS",
    6 : "Meta Witch",
    7 : "Božidar",
    101 : "Captain Kang",
    119 : "King Vader",
    259 : "Spiderkang",
    892 : "Meta Sledger",
    1200 : "Grootaroo",
    1777 : "Meta Kang",
    1888 : "MVS Ghost",
    2000 : "Metborg",
    2222 : "MVS Jokang",
}
for(let i=1; i<=8888; i++) {
    let metadata = JSON.parse(fs.readFileSync(`./Metadata/${i}.json`, 'utf-8'));
    // for(const key in legendary) {
    //     if(i == key) i++;
    // }
    if (i > 4444)
        CID = "QmXE6hrWe8k9GCgY4bbBVjsuoWEv2CxhYPUst3F1Wygbxt";
    else
        CID = "QmRfRUMfMCKm3rgxSMRiJ8jP8HxBbGGzfy1Hs4dhcez9qd";

    metadata.image = `https://ipfs.io/ipfs/${CID}/` + i + ".png";
    // let data = metadata.attributes;
    // let attr = [];
    // for(const key in data) {
    //     attr.push({
    //         "trait_type": data[key].layer,
    //         "value": data[key].name,
    //     })
    // }
    // temp.attributes = attr;
    
    const myJSON = JSON.stringify(metadata)
    console.log("ready");
    fs.writeFile(`./_metadata/${i}.json`, myJSON, (err) => {
        if(err) throw err;
        console.log(i + ' Saved!');
    })
}

// for(const key in legendary) {
//     temp.name = legendary[key];
//     temp.description = "MetaVerse Kangaroos #" + legendary[key];
//     temp.image = "https://ipfs.io/ipfs/QmbqAU99zmffsAg5wXyYMcrymhHHfLXn1mZSkn6XsWVonC/" + key + ".png";
//     temp.attributes = [{
//         "trait_type": "legendary",
//         "value": legendary[key]
//     }];

//     const myJSON = JSON.stringify(temp)
//     console.log("ready");
//     fs.writeFile(`./_metadata/${key}.json`, myJSON, (err) => {
//         if(err) throw err;
//         console.log(key + ' Saved!');
//     })
// }