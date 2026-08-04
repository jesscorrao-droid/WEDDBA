const TOTAL_PHOTOS = 73;

const photos = [];

// ==========================
// CREA ARRAY FOTO
// ==========================

for (let i = 1; i <= TOTAL_PHOTOS; i++) {

    photos.push(`images/photos/foto${i}.jpg`);

}

let current = 0;

const slide = document.getElementById("slide");

// Prima foto
slide.src = photos[current];

// ==========================
// CAMBIA FOTO
// ==========================

function showPhoto() {

    slide.style.opacity = 0;

    setTimeout(() => {

        slide.src = photos[current];

        slide.style.opacity = 1;

    }, 300);

}

// ==========================
// FOTO SUCCESSIVA
// ==========================

function nextPhoto() {

    current++;

    if (current >= photos.length) {

        current = 0;

    }

    showPhoto();

}

// ==========================
// FOTO PRECEDENTE
// ==========================

function prevPhoto() {

    current--;

    if (current < 0) {

        current = photos.length - 1;

    }

    showPhoto();

}

// ==========================
// SLIDESHOW AUTOMATICO
// ==========================

setInterval(nextPhoto, 5000);

// ==========================
// TORNA ALLA HOME
// ==========================

function goHome() {

    window.location.href = "index.html";

}

// ==========================
// CONTROLLI TASTIERA
// ==========================

document.addEventListener("keydown", function (e) {

    switch (e.key) {

        case "ArrowRight":
            e.preventDefault();
            nextPhoto();
            break;

        case "ArrowLeft":
            e.preventDefault();
            prevPhoto();
            break;

        case "Escape":
            e.preventDefault();
            goHome();
            break;

    }

});