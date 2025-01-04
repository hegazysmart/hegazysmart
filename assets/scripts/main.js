var jsonData;

window.onload = () => {
    let categoriesCarsol = document.getElementById('carsoleOfCategories');
    if (categoriesCarsol) {
        initCategoriesCarsol();
    }
}

function initCategoriesCarsol() {
    const categoriesCarsolInner = document.getElementById('categories_carsol_inner');
    const carouselIndicators = document.getElementById('caregories_carsol_indicator');
    // Assuming jsonData is already defined and contains categories
    jsonData.banners?.forEach((banner, index) => {
        // Carousel item
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.setAttribute('data-bs-interval', '2000');

        if (index === 0) {
            item.classList.add('active');
        }
        item.innerHTML = `<img src="${banner.photo_url}" class="d-block w-100" alt="${banner.name}">
    <div class="carousel-caption"><h5>${banner.name}</h5><p>${banner.description}</p></div>`;

        // Append items to respective containers
        categoriesCarsolInner.appendChild(item); // Append the carousel item

        // Dynamic indicators
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
        indicator.setAttribute('data-bs-slide-to', index.toString());
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) {
            indicator.className = 'active';
            indicator.setAttribute('aria-current', 'true');
        }
        carouselIndicators.appendChild(indicator); // Append the indicator
    });
}

function redirectHome() {
    window.location.href = './index.html';
}

jsonData = {
    banners: [
        {
            id: 1,
            name: 'Science',
            photo_url: './assets/images/carsol/1.webp',
            description: 'Look at a mix of classical branches of science that reflect current areas of research and development.',
        },
        {
            id: 2,
            name: "Arts",
            photo_url: './assets/images/carsol/2.webp',
            description: "A broad spectrum of creative disciplines that express human creativity, emotion, and cultural heritage.",
        },
        {
            id: 3,
            name: "Humanity",
            photo_url: './assets/images/carsol/3.webp',
            description: "study aspects of human society and culture. Areas of study that explore different facets of human experience, history, and expression.",
        },
        {
            id: 4,
            name: "Financial",
            photo_url: './assets/images/carsol/4.webp',
            description: "broad and encompasses various specializations, each focusing on different aspects of financial management, markets, and institutions.",
        }
    ]
};