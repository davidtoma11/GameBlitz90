const logo = document.getElementById("logo");
const light_button = document.getElementById("brightness_toogle");

logo.addEventListener('dblclick', () => {
    logo.classList.toggle('bright');
});

light_button.addEventListener('click', () => {
    // Toggle 'bright' class on all boxes, logo, and the button itself
    document.querySelectorAll(".box").forEach(el => {
        el.classList.toggle("bright");
    });
    logo.classList.toggle('bright');
    light_button.classList.toggle("bright");
    playSound("info");
});


// Check for screens smaller than 1200px
const mediaQuery = window.matchMedia('(max-width: 1200px)');

// Main function to initialize the carousel
function setupCarousel() {
    // If not on mobile/tablet, reset classes and exit
    if (!mediaQuery.matches) {
        document.querySelectorAll('#boxes .box').forEach(box => {
            box.classList.remove('active', 'left', 'right');
        });
        return;
    }

    // Select carousel elements
    const gallery = document.getElementById('boxes');
    const boxes = gallery.querySelectorAll('.box');
    const prevNavArea = document.getElementById('nav-prev-area');
    const nextNavArea = document.getElementById('nav-next-area');

    // Attach click events to nav areas (if they exist)
    if (prevNavArea) {
        prevNavArea.onclick = showPrev;
    }
    if (nextNavArea) {
        nextNavArea.onclick = showNext;
    }

    let currentIndex = 1; // Start with the middle element
    const totalBoxes = boxes.length;

    if (totalBoxes === 0) return; // Do nothing if there are no boxes

    // Applies .active, .left, and .right classes to boxes
    function updateCarousel() {
        boxes.forEach((box, index) => {
            // Use modulo to calculate indices and wrap around
            const leftIndex = (currentIndex - 1 + totalBoxes) % totalBoxes;
            const rightIndex = (currentIndex + 1) % totalBoxes;

            // Clear old classes
            box.classList.remove('active', 'left', 'right');

            // Add new classes
            if (index === currentIndex) {
                box.classList.add('active');
            } else if (index === leftIndex) {
                box.classList.add('left');
            } else if (index === rightIndex) {
                box.classList.add('right');
            }
        });
    }

    // --- Navigation Functions ---
    function showNext() {
        currentIndex = (currentIndex + 1) % totalBoxes;
        updateCarousel();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + totalBoxes) % totalBoxes;
        updateCarousel();
    }

    // --- Event Listeners ---

    // 1. Click on side cards to navigate
    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            if (box.classList.contains('left')) {
                e.preventDefault(); // Stop link navigation
                showPrev();
            } else if (box.classList.contains('right')) {
                e.preventDefault(); // Stop link navigation
                showNext();
            }
            // If 'active', the <a> link works normally
        });
    });

    // 2. Swipe logic
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimum pixels for a valid swipe

    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > swipeThreshold) {
            // Swiped right
            showPrev();
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left
            showNext();
        }
    }

    // --- Initialization ---
    updateCarousel(); // Set initial state
    gallery.classList.add('carousel-ready'); // Enable transitions
}

// Run on page load
setupCarousel();

// Re-run if the window is resized (e.g., orientation change)
mediaQuery.addEventListener('change', setupCarousel);