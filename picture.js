/* =========================================
   WeddBA - Picture Of The Game
========================================= */

const TOTAL_PHOTOS = 73;

const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.getElementById("counter");

let current = 0;

/* =========================================
CREA GALLERY
========================================= */

function createGallery(){

    gallery.innerHTML = "";

    for(let i = 1; i <= TOTAL_PHOTOS; i++){

        const card = document.createElement("div");
        card.className = "photo";

        const img = document.createElement("img");

        img.src = `images/photos/foto${i}.jpg`;
        img.alt = `Foto ${i}`;
        img.loading = "lazy";

        img.addEventListener("click", () => {

            current = i - 1;
            openLightbox();

        });

        card.appendChild(img);
        gallery.appendChild(card);

    }

    loading.classList.add("hidden");

}

createGallery();

/* =========================================
LIGHTBOX
========================================= */

function openLightbox(){

    lightboxImage.src = `images/photos/foto${current + 1}.jpg`;

    counter.textContent = `${current + 1} / ${TOTAL_PHOTOS}`;

    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";

}

function closeLightbox(){

    lightbox.classList.remove("open");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e)=>{

    if(e.target === lightbox){

        closeLightbox();

    }

});

/* =========================================
NEXT
========================================= */

function nextPhoto(){

    current++;

    if(current >= TOTAL_PHOTOS){

        current = 0;

    }

    openLightbox();

}

nextBtn.addEventListener("click", nextPhoto);

/* =========================================
PREVIOUS
========================================= */

function prevPhoto(){

    current--;

    if(current < 0){

        current = TOTAL_PHOTOS - 1;

    }

    openLightbox();

}

prevBtn.addEventListener("click", prevPhoto);

/* =========================================
KEYBOARD
========================================= */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("open")) return;

    switch(e.key){

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
            closeLightbox();
            break;

    }

});

document.addEventListener("keydown", e => {

    if(e.key === "ArrowRight") nextPhoto();

    if(e.key === "ArrowLeft") prevPhoto();

    if(e.key === "Escape") history.back();

});