let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    const banner = document.getElementById("install-banner");

    if (banner) {

        banner.style.display = "flex";

    }

});

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("install-btn");

    if (!btn) return;

    btn.addEventListener("click", async () => {

        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

        document.getElementById("install-banner").style.display = "none";

    });

});