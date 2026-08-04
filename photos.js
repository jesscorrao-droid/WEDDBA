const TOTAL_PHOTOS = 73;

const photos = [];

for(let i = 1; i <= TOTAL_PHOTOS; i++){

    photos.push(`images/photos/foto${i}.jpg`);

}

let current = 0;

const slide = document.getElementById("slide");

slide.src = photos[0];

setInterval(()=>{

    current++;

    if(current >= photos.length){

        current = 0;

    }

    slide.style.opacity = 0;

    setTimeout(()=>{

        slide.src = photos[current];

        slide.style.opacity = 1;

    },400);

},5000);


document.addEventListener("keydown", function(e){

    if(e.key === "Backspace" || e.key === "Escape"){

        e.preventDefault();

        history.back();

    }

});


document.addEventListener("keydown", e => {

    if(e.key === "ArrowRight") nextPhoto();

    if(e.key === "ArrowLeft") prevPhoto();

    if(e.key === "Escape") history.back();

});