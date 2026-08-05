// ===============================
// NAVIGAZIONE STILE NETFLIX
// ===============================

let cards = [];
let current = 0;

const isTouchDevice =
    ("ontouchstart" in window) ||
    navigator.maxTouchPoints > 0;

function initKeyboardNavigation(){

    if(isTouchDevice) return;

    cards = [...document.querySelectorAll(".category")];

    if(!cards.length) return;

    cards.forEach(card => card.classList.remove("focused"));

    const saved = sessionStorage.getItem("returnTo");

    current = 0;

    if(saved){

        const index = cards.findIndex(card => card.id === saved);

        if(index >= 0){

            current = index;

        }

    }

    updateFocus();

}

function updateFocus(){

    if(isTouchDevice) return;

    cards.forEach(card => card.classList.remove("focused"));

    if(!cards[current]) return;

    cards[current].classList.add("focused");

    cards[current].scrollIntoView({

        behavior:"smooth",
        block:"center",
        inline:"center"

    });

}

document.addEventListener("keydown", e => {

    if(isTouchDevice) return;

    if(!cards.length) return;

    const columns =
        window.innerWidth > 1200 ? 3 :
        window.innerWidth > 700 ? 2 : 1;

    switch(e.key){

        case "ArrowRight":

            e.preventDefault();

            if(current < cards.length - 1){

                current++;
                updateFocus();

            }

        break;

        case "ArrowLeft":

            e.preventDefault();

            if(current > 0){

                current--;
                updateFocus();

            }

        break;

        case "ArrowDown":

            e.preventDefault();

            if(current + columns < cards.length){

                current += columns;
                updateFocus();

            }

        break;

        case "ArrowUp":

            e.preventDefault();

            if(current - columns >= 0){

                current -= columns;
                updateFocus();

            }

        break;

        case "Enter":

            e.preventDefault();

            if(cards[current]){

                cards[current].click();

            }

        break;

        case "Escape":

            history.back();

        break;

    }

});

window.addEventListener("load", () => {

    initKeyboardNavigation();

});

// ===============================
// AGGIORNA IL FOCUS SOLO SU DESKTOP
// ===============================

window.addEventListener("resize", () => {

    if(!isTouchDevice){

        updateFocus();

    }

});

// ===============================
// CLICK SULLA CARD
// ===============================

document.addEventListener("click", e => {

    if(isTouchDevice) return;

    const card = e.target.closest(".category");

    if(!card) return;

    const index = cards.indexOf(card);

    if(index !== -1){

        current = index;

        updateFocus();

    }

});