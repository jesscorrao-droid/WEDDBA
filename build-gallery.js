const fs = require("fs");

const folders = {
    nubilato: "images/nubilato",
    celibato: "images/celibato"
};

const gallery = {};

for (const album in folders) {
    const folder = folders[album];

    if (!fs.existsSync(folder)) {
        console.log(`Cartella non trovata: ${folder}`);
        continue;
    }

    gallery[album] = fs.readdirSync(folder)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .sort();
}

fs.writeFileSync("gallery.json", JSON.stringify(gallery, null, 4));

console.log("✅ gallery.json creato con successo!");