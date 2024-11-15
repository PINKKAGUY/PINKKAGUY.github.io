const carousel = document.querySelector('.grid-carousel');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
let isTransitioning = false;

// Dupliquer les éléments pour créer un effet de boucle infinie
const cloneCarouselItems = () => {
    const items = Array.from(carousel.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
};

// Mettre à jour l'affichage du carrousel
const updateCarousel = () => {
    const itemWidth = document.querySelector('.grid-item').offsetWidth + 20; // Largeur d'un item + espace
    const totalItems = document.querySelectorAll('.grid-item').length;

    // Calculer l'offset en fonction de l'index actuel
    const offset = currentIndex * itemWidth;
    carousel.style.transition = isTransitioning ? 'transform 0.5s ease-in-out' : 'none';
    carousel.style.transform = `translateX(-${offset}px)`;
};

// Fonction pour défiler vers la droite d'une image
const scrollRight = () => {
    const visibleItems = 6;
    const totalItems = document.querySelectorAll('.grid-item').length;

    if (!isTransitioning) {
        currentIndex++;
        isTransitioning = true;
        updateCarousel();

        // Vérifier si on est à la fin de la copie et réinitialiser la position
        if (currentIndex >= totalItems - visibleItems) {
            setTimeout(() => {
                isTransitioning = false;
                currentIndex = 0;
                updateCarousel();
            }, 500); // Correspond à la durée de la transition
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
};

// Fonction pour défiler vers la gauche d'une image
const scrollLeft = () => {
    const totalItems = document.querySelectorAll('.grid-item').length;

    if (!isTransitioning) {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Si on est au début de la copie, on revient en arrière sur la copie
            currentIndex = totalItems / 2 - 1; // Revenir au dernier élément avant la copie
        }

        isTransitioning = true;
        updateCarousel();

        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Correspond à la durée de la transition
    }
};

// Événements pour les flèches
leftArrow.addEventListener('click', scrollLeft);
rightArrow.addEventListener('click', scrollRight);

// Défilement automatique toutes les 10 secondes
setInterval(scrollRight, 5000); // 10000 ms = 10 secondes

// Initialisation
cloneCarouselItems();
updateCarousel();
