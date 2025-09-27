function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

// Plynulý přechod při kliknutí na boxy
document.addEventListener("DOMContentLoaded", function() {

    // Přidání animace kliknutí pro všechny boxy
    document.querySelectorAll(".box").forEach(box => {
        box.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Rychlé ztmavení
            document.body.style.opacity = "0";
            document.body.style.transition = "opacity 0.2s ease";
            
            // Najdi odkaz v boxu
            const link = this.parentElement;
            if (link && link.href) {
                setTimeout(() => {
                    window.location.href = link.href;
                }, 200);
            }
        });
    });
});

setInterval(updateClock, 1000); // Aktualizuje každou sekundu
updateClock(); // První zavolání hned po načtení
  