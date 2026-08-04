let photos = [];
let current = 0;
let timer;

const img = document.getElementById("photo");
const counter = document.getElementById("counter");

fetch("gallery.json")
    .then(res => res.json())
    .then(data => {

        photos = data.celibato.map(file => `images/celibato/${file}`);

        showPhoto();

        timer = setInterval(nextPhoto, 5000);

    });

function showPhoto(){

    img.src = photos[current];

    counter.textContent = `${current + 1} / ${photos.length}`;

}

function nextPhoto(){

    current++;

    if(current >= photos.length)
        current = 0;

    showPhoto();

}

function prevPhoto(){

    current--;

    if(current < 0)
        current = photos.length - 1;

    showPhoto();

}

document.getElementById("next").addEventListener("click", nextPhoto);

document.getElementById("prev").addEventListener("click", prevPhoto);

document.addEventListener("keydown", e => {

    if(e.key === "ArrowRight") nextPhoto();

    if(e.key === "ArrowLeft") prevPhoto();

});


document.addEventListener("keydown", e => {

    if(e.key === "ArrowRight") nextPhoto();

    if(e.key === "ArrowLeft") prevPhoto();

    if(e.key === "Escape") history.back();

});