let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{

    e.preventDefault();

    deferredPrompt=e;

    document.getElementById("install-banner").style.display="flex";

});

document.getElementById("install-btn").addEventListener("click",async()=>{

    if(!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt=null;

    document.getElementById("install-banner").style.display="none";

});