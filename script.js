const container = document.getElementById("categoriesContainer");

// ===============================
// CREA LE SEZIONI
// ===============================

sections.forEach(section => {

    const sectionDiv = document.createElement("div");
    sectionDiv.className = "season-section";

    sectionDiv.innerHTML = `
        <h2 class="section-title-custom">${section.title}</h2>
        <div class="cards-grid"></div>
    `;

    const grid = sectionDiv.querySelector(".cards-grid");

    // ===============================
    // CREA LE CARD
    // ===============================

    section.cards.forEach(card => {

        const cardDiv = document.createElement("div");

        cardDiv.className = "category";
        cardDiv.id = card.id;
        cardDiv.dataset.page = card.page || "";

        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.title}">

            <div class="play-icon">
                ▶
            </div>

            <div class="category-content">

                <h3>${card.title}</h3>

                <p class="card-subtitle">
                    ${card.subtitle || ""}
                </p>

            </div>
        `;

        cardDiv.addEventListener("click", () => {

            if(card.id){

                sessionStorage.setItem("returnTo", card.id);

            }

            if(card.page){

                window.location.href = card.page;

            }

        });

        grid.appendChild(cardDiv);

    });

    container.appendChild(sectionDiv);

});

// ===============================
// TORNA ALLA CARD APERTA
// ===============================

window.addEventListener("load", () => {

    const target = sessionStorage.getItem("returnTo");

    if(!target) return;

    setTimeout(() => {

        const card = document.getElementById(target);

        if(card){

            card.scrollIntoView({

                behavior:"smooth",
                block:"center"

            });

        }

    },300);

});

// ===============================
// ANIMAZIONI
// ===============================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(".fadeUp").forEach(element => {

    observer.observe(element);

});

// ===============================
// HEADER
// ===============================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(header){

        header.classList.toggle("scrolled", window.scrollY > 40);

    }

});

// ===============================
// CAROUSEL (se presente)
// ===============================

document.querySelectorAll(".carousel").forEach(carousel => {

    const grid = carousel.querySelector(".cards-grid");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");

    if(!grid || !prev || !next) return;

    next.addEventListener("click", () => {

        grid.scrollBy({

            left:420,
            behavior:"smooth"

        });

    });

    prev.addEventListener("click", () => {

        grid.scrollBy({

            left:-420,
            behavior:"smooth"

        });

    });

});

// ===============================
// NAVIGAZIONE STILE NETFLIX
// ===============================

let cards = [];
let current = 0;

const isTouchDevice =
    ("ontouchstart" in window) ||
    navigator.maxTouchPoints > 0;

// ===============================
// INIZIALIZZA
// ===============================

function initKeyboardNavigation(){

    if(isTouchDevice) return;

    cards = [
        ...document.querySelectorAll(".category")
    ];

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

// ===============================
// AGGIORNA FOCUS
// ===============================

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

// ===============================
// TASTIERA / SMART TV
// ===============================

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

            e.preventDefault();

            history.back();

        break;

    }

});

// ===============================
// LOAD
// ===============================

window.addEventListener("load", () => {

    initKeyboardNavigation();

});

// ===============================
// RESIZE
// ===============================

window.addEventListener("resize", () => {

    if(isTouchDevice) return;

    updateFocus();

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

// ===============================
// PRECARICAMENTO IMMAGINI
// ===============================

document.querySelectorAll(".category img").forEach(img => {

    const preload = new Image();

    preload.src = img.src;

});

// ===============================
// READY
// ===============================

console.log("🏀 WeddBA Ready");

// ===============================
// SERVICE WORKER
// ===============================

if("serviceWorker" in navigator){

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./sw.js")
        .then(reg => {

            console.log("🏀 Service Worker attivo");

            reg.update();

        })
        .catch(err => console.error(err));

    });

}