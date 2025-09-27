function filterBoxes() {
    let searchValue = document.getElementById("search").value.toLowerCase();
    let filterValue = document.getElementById("filter").value;
    let boxes = document.querySelectorAll(".box");
    
    boxes.forEach(box => {
        let text = box.textContent.toLowerCase();
        let tags = box.getAttribute("data-tags");
        let matchSearch = text.includes(searchValue);
        let matchFilter = (filterValue === "all" || tags.includes(filterValue));
        
        if (matchSearch && matchFilter) {
            box.style.display = "flex";
        } else {
            box.style.display = "none";
        }
    });
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

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

    // Přidání animace kliknutí pro všechny boxy
    document.querySelectorAll(".box").forEach(box => {
        box.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Animace kliknutí
            this.style.transform = "scale(0.95)";
            this.style.transition = "transform 0.1s ease";
            
            setTimeout(() => {
                this.style.transform = "scale(1.05)";
                this.style.transition = "transform 0.2s ease";
            }, 100);
            
            // Najdi odkaz v boxu
            const link = this.querySelector("a");
            if (link) {
                setTimeout(() => {
                    // Rychlé ztmavení
                    document.body.style.opacity = "0";
                    document.body.style.transition = "opacity 0.2s ease";
                    
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 200);
                }, 200);
            }
        });
    });

    // Přidání animace pro navigační odkazy
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Rychlé ztmavení
            document.body.style.opacity = "0";
            document.body.style.transition = "opacity 0.2s ease";
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 200);
        });
    });

    // Spuštění hodin po načtení stránky
    updateClock();
    setInterval(updateClock, 1000);
});
