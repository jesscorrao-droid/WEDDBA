/* =====================================================
   WEDDBA
   GLOBAL NAVIGATION
===================================================== */

const isTouchDevice =
    ("ontouchstart" in window) ||
    navigator.maxTouchPoints > 0;

let focusableCards = [];
let currentFocus = 0;

/* ==========================
   INIZIALIZZA
========================== */

function initNavigation(){

    if(isTouchDevice) return;

    focusableCards = [
        ...document.querySelectorAll(
            ".category, .album-card, .photo"
        )
    ];

    if(!focusableCards.length) return;

    focusableCards.forEach(card=>{

        card.classList.remove("focused");

    });

    currentFocus = 0;

    const saved = sessionStorage.getItem("returnTo");

    if(saved){

        const index = focusableCards.findIndex(card=>card.id===saved);

        if(index>=0){

            currentFocus=index;

        }

    }

    updateFocus();

}

/* ==========================
   AGGIORNA FOCUS
========================== */

function updateFocus(){

    if(isTouchDevice) return;

    focusableCards.forEach(card=>{

        card.classList.remove("focused");

    });

    const currentCard = focusableCards[currentFocus];

    if(!currentCard) return;

    currentCard.classList.add("focused");

    currentCard.scrollIntoView({

        behavior:"smooth",
        block:"center",
        inline:"center"

    });

}

/* ==========================
   CLICK
========================== */

document.addEventListener("click",e=>{

    if(isTouchDevice) return;

    const card=e.target.closest(".category,.album-card,.photo");

    if(!card) return;

    const index=focusableCards.indexOf(card);

    if(index!==-1){

        currentFocus=index;
        updateFocus();

    }

});

/* ==========================
   KEYBOARD / SMART TV
========================== */

document.addEventListener("keydown", e => {

    if(isTouchDevice) return;

    if(!focusableCards.length) return;

    const columns =
        window.innerWidth > 1200 ? 3 :
        window.innerWidth > 700 ? 2 : 1;

    switch(e.key){

        case "ArrowRight":

            e.preventDefault();

            if(currentFocus < focusableCards.length - 1){

                currentFocus++;
                updateFocus();

            }

        break;

        case "ArrowLeft":

            e.preventDefault();

            if(currentFocus > 0){

                currentFocus--;
                updateFocus();

            }

        break;

        case "ArrowDown":

            e.preventDefault();

            if(currentFocus + columns < focusableCards.length){

                currentFocus += columns;
                updateFocus();

            }

        break;

        case "ArrowUp":

            e.preventDefault();

            if(currentFocus - columns >= 0){

                currentFocus -= columns;
                updateFocus();

            }

        break;

        case "Enter":

            e.preventDefault();

            focusableCards[currentFocus].click();

        break;

        case "Escape":

            e.preventDefault();

            history.back();

        break;

    }

});

/* =====================================================
   LOAD
===================================================== */

window.addEventListener("load", () => {

    initNavigation();

});

/* =====================================================
   RESIZE
===================================================== */

window.addEventListener("resize", () => {

    if(isTouchDevice) return;

    updateFocus();

});

/* =====================================================
   PRELOAD IMMAGINI
===================================================== */

document.querySelectorAll("img").forEach(img => {

    const preload = new Image();

    preload.src = img.src;

});

/* =====================================================
   READY
===================================================== */

console.log("🏀 WeddBA Navigation Ready");