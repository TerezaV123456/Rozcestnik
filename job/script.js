document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".box a:first-child").forEach(link => {
        const url = new URL(link.href);
        const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${url.hostname}`;
        const img = link.querySelector(".favicon");
        
        if (img) {
            img.src = faviconUrl;
            img.onerror = () => {
                img.src = "../images/icon.jpg"; // Náhradní obrázek, pokud favicon neexistuje
            };
        }
    });
});
