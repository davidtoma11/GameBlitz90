const logo = document.getElementById("logo");
const light_button = document.getElementById("brightness_toogle");

logo.addEventListener('dblclick', () => {
    logo.classList.toggle('bright');
});

light_button.addEventListener('click', () => {
    document.querySelectorAll(".box").forEach(el => {
        el.classList.toggle("bright");
    });
    logo.classList.toggle('bright');
    light_button.classList.toggle("bright");
    playSound("info");
});


// Verifică dacă suntem pe un ecran mai mic de 1200px
const mediaQuery = window.matchMedia('(max-width: 1200px)');

// Funcția care pornește logica caruselului
function setupCarousel() {
    // Dacă nu suntem pe mobil, nu face nimic
    if (!mediaQuery.matches) {
        // Asigură-te că toate box-urile sunt vizibile pe desktop
        document.querySelectorAll('#boxes .box').forEach(box => {
            box.classList.remove('active', 'left', 'right');
        });
        return;
    }

    // Selectează elementele caruselului
    const gallery = document.getElementById('boxes');
    const boxes = gallery.querySelectorAll('.box');
    const prevNavArea = document.getElementById('nav-prev-area');
    const nextNavArea = document.getElementById('nav-next-area');

    // Adăugăm o verificare, în caz că elementele nu există (de ex. pe desktop)
    if (prevNavArea) {
        prevNavArea.onclick = showPrev;
    }
    if (nextNavArea) {
        nextNavArea.onclick = showNext;
    }

    let currentIndex = 1; // Începem cu elementul din mijloc (index 1)
    const totalBoxes = boxes.length;

    if (totalBoxes === 0) return; // Nu face nimic dacă nu există jocuri

    // Funcția principală care actualizează clasele
    function updateCarousel() {
        boxes.forEach((box, index) => {
            // Calculează indicii pentru stânga și dreapta
            // Folosim (index + totalBoxes) pentru a evita numere negative
            const leftIndex = (currentIndex - 1 + totalBoxes) % totalBoxes;
            const rightIndex = (currentIndex + 1) % totalBoxes;

            // Curăță clasele vechi
            box.classList.remove('active', 'left', 'right');

            // Adaugă clasele noi
            if (index === currentIndex) {
                box.classList.add('active');
            } else if (index === leftIndex) {
                box.classList.add('left');
            } else if (index === rightIndex) {
                box.classList.add('right');
            }
        });

    }

    // --- Definirea funcțiilor de navigare ---
    function showNext() {
        currentIndex = (currentIndex + 1) % totalBoxes;
        updateCarousel();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + totalBoxes) % totalBoxes;
        updateCarousel();
    }

    // --- Adăugarea evenimentelor ---


    // 2. Evenimente de click pe cardurile laterale
    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            // Dacă dăm click pe un card lateral, oprește link-ul
            // și navighează la el
            if (box.classList.contains('left')) {
                e.preventDefault(); // Oprește navigarea paginii
                showPrev();
            } else if (box.classList.contains('right')) {
                e.preventDefault(); // Oprește navigarea paginii
                showNext();
            }
            // Dacă e 'active', link-ul funcționează normal
        });
    });

    // 3. Logică pentru Swipe (glisare)
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Distanța minimă (în px) pentru un swipe valid

    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true }); // {passive: true} pentru performanță

    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > swipeThreshold) {
            // Swipe spre Dreapta (degetul s-a mișcat spre dreapta)
            showPrev();
        } else if (swipeDistance < -swipeThreshold) {
            // Swipe spre Stânga (degetul s-a mișcat spre stânga)
            showNext();
        }
    }

    // --- Inițializarea ---
    // Setează starea inițială a caruselului
    updateCarousel();

    gallery.classList.add('carousel-ready')
}

// Pornește caruselul la încărcarea paginii
setupCarousel();

// Repornește/Oprește caruselul dacă utilizatorul redimensionează fereastra
mediaQuery.addEventListener('change', setupCarousel);
