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