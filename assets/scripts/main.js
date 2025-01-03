var jsonData;

window.onload = () => {
    initCategories();
    let categoriesCarsol = document.getElementById('carsoleOfCategories');
    if (categoriesCarsol) {
        initCategoriesCarsol();
    }

    let categoriesBooksContainer = document.getElementById('categories_books_container');
    if (categoriesBooksContainer) {
        initBooksContainer(categoriesBooksContainer);
    }

    let singleBookContainer = document.getElementById('single_book_container');
    if (singleBookContainer) {
        initSingleBook(singleBookContainer);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const profileDropdown = document.getElementById('profileDropdown');
    profileDropdown.style.left = 'unset';

    if (localStorage.getItem('login') === 'success') {
        const logoutItem = document.createElement('li');
        logoutItem.innerHTML = '<a class="dropdown-item" href="#">Logout</a>';
        logoutItem.addEventListener('click', function () {
            localStorage.removeItem('login');
            window.location.reload(); // Optionally redirect to homepage or elsewhere
        });
        profileDropdown.appendChild(logoutItem);
    } else {
        const loginItem = document.createElement('li');
        loginItem.innerHTML = '<a class="dropdown-item" href="./auth/login.html">Login</a>';
        profileDropdown.appendChild(loginItem);

        const registerItem = document.createElement('li');
        registerItem.innerHTML = '<a class="dropdown-item" href="./auth/registration.html">Registration</a>';
        profileDropdown.appendChild(registerItem);
    }
});

function initCategories() {
    const profileDropdown = document.getElementById('categoriesDropdown');
    jsonData.categories?.forEach(category => {
        const li = document.createElement('li'); // Create a new <li> element
        li.innerHTML = `<a class="dropdown-item" href="./categories.html?id=${category.id}">${category.name}</a>` // Set the text content to the category name
        profileDropdown.appendChild(li); // Append the <li> to the <ul> element
    });
}

function initCategoriesCarsol() {
    const categoriesCarsolInner = document.getElementById('categories_carsol_inner');
    const barCategories = document.getElementById('bar_categories');
    const carouselIndicators = document.getElementById('caregories_carsol_indicator');
    // Assuming jsonData is already defined and contains categories
    jsonData.categories?.forEach((category, index) => {
        // Carousel item
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if (index === 0) {
            item.classList.add('active');
        }
        item.innerHTML = `<img src="${category.banner}" class="d-block" alt="...">
    <div class="carousel-caption d-none d-md-block"><h5>${category.name}</h5><p>${category.description}</p></div>`;

        // Card item
        const card = document.createElement('div');
        card.className = 'card col-12 col-sm-6 col-lg-3 mt-2';
        card.style.width = "18rem";
        card.innerHTML = `<img src="${category.photo_url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${category.name}</h5><p class="card-text">${category.description}.</p>
      <a href="./categories.html?id=${category.id}" class="btn btn-primary mt-2">Go to ${category.name}</a>
    </div>`;

        // Append items to respective containers
        categoriesCarsolInner.appendChild(item); // Append the carousel item
        barCategories.appendChild(card); // Append the card item

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

function initBooksContainer(container) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get('id');
    const selectedCategory = jsonData.categories.find(category => category.id === parseInt(id))

    // Add category name and description
    container.innerHTML = `<div class="category-info"><h2 class="mb-2">${selectedCategory.name}</h2><p">${selectedCategory.description}</p></div>`;

    // Create a row for Bootstrap cards
    const row = document.createElement('div');
    row.className = 'row';

    selectedCategory.books.forEach(book => {
        const cardHtml = `
        <div class="col-md-4 mb-3">
        <a href="./books.html?category=${selectedCategory.id}&book=${book.id}" class="text-decoration-none">
            <div class="card">
                <img src="${book.photo}" class="card-img-top" alt="${book.name}">
                <div class="card-body">
                    <h5 class="card-title">${book.name}</h5>
                    <p class="card-text mb-2" style="height: 5rem; overflow: hidden">${book.description}</p>
                    <span id="is_reserved_flag" class="${book.is_reserved ? 'text-danger' : 'text-info'}"><b>${book.is_reserved ? 'Reserved' : 'Available'}</b></span>
                    <button id="reserveButton" onclick="reserve()" class="btn btn-primary" >Reserve Now</button>
                </div>
            </div>
        </a>
        </div>`;
        row.innerHTML += cardHtml;
    });
    container.appendChild(row);
}

function initSingleBook(container){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const categoryId = urlSearchParams.get('category');
    const bookId = urlSearchParams.get('book');

    const selectedCategory = jsonData.categories.find(category => category.id === parseInt(categoryId))
    const book = selectedCategory.books.find(book => book.id === parseInt(bookId))
    
    // Create a row for Bootstrap cards
    const row = document.createElement('div');
    row.className = 'row';
    const cardHtml =`<div class="col-12 col-sm-6 col-lg-4 mb-3"><img src="${book.photo}" class="card-img-top" style="max-height: 500px" alt="${book.name}"></div>
        <div class="col-12 col-sm-6 mb-3 d-flex flex-column justify-content-between">
            <div>
                <h5 class="card-title mb-3">${book.name}</h5>
                <p class="card-text mb-2" style="height: 5rem; overflow: hidden">${book.description}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span id="is_reserved_flag" class="${book.is_reserved ? 'text-danger' : 'text-info'}"><b>${book.is_reserved ? 'Reserved' : 'Available'}</b></span>
                <button id="reserveButton" onclick="reserve()" class="btn btn-primary" >Reserve Now</button>
            </div>
        </div>`;
    row.innerHTML += cardHtml;
    container.appendChild(row);
}

function reserve() {
    // Disable the button
    document.getElementById('reserveButton').disabled = true;

    // Update the span text and class
    var span = document.getElementById('is_reserved_flag');
    span.textContent = 'Reserved';
    span.className = 'text-danger';

    // Show the Bootstrap modal
    var reservationModal = new bootstrap.Modal(document.getElementById('reservationModal'), {
        keyboard: false
    });
    reservationModal.show();
}

function redirectHome() {
    window.location.href = './index.html';
}

jsonData = {
    categories: [
        {
            id: 1,
            name: 'Science',
            photo_url: './assets/images/category-science.webp',
            banner: "./assets/images/category-science-banner.webp",
            description: 'Look at a mix of classical branches of science that reflect current areas of research and development.',
            books: [
                {
                    id: 1,
                    category_id: 1,
                    name: "Physics",
                    photo: "./assets/images/books/physics.webp",
                    description: "This fundamental science deals with the nature and properties of matter and energy. The subject matter of physics includes mechanics, heat, light and other radiation, sound, electricity, magnetism, and the structure of atoms. Physics is foundational to the understanding of the physical universe.",
                    is_reserved: false
                },
                {
                    id: 2,
                    category_id: 1,
                    name: "Chemistry",
                    photo: "./assets/images/books/chemistry.webp",
                    description: "Chemistry is the scientific study of the composition, structure, properties, and reactions of matter, especially of atomic and molecular systems. It helps in understanding substances and how they interact, combine, and change. Chemistry is vital for the development of a range of products including drugs, plastics, and cosmetics.",
                    is_reserved: false
                },
                {
                    id: 3,
                    category_id: 1,
                    name: "Biology",
                    photo: "./assets/images/books/biology.webp",
                    description: "Biology is the science of life and living organisms, including their structure, function, growth, evolution, distribution, and taxonomy. It encompasses a wide range of fields such as botany, zoology, genetics, microbiology, molecular biology, physiology, and ecology.",
                    is_reserved: false
                },
                {
                    id: 4,
                    category_id: 1,
                    name: "Earth Science",
                    photo: "./assets/images/books/earth-science.webp",
                    description: "This is a broad category that includes various related sciences dealing with the Earth. It includes geology (the study of the Earth’s solid material and structures), meteorology (the study of the atmosphere and weather), oceanography (the study of the ocean's composition and movements), and environmental science.",
                    is_reserved: false
                },
                {
                    id: 5,
                    category_id: 1,
                    name: "Computer Science",
                    photo: "./assets/images/books/computer-science.webp",
                    description: "This is the study of algorithmic processes, computational machines, and computation itself. As a discipline, computer science encompasses theoretical studies of algorithms and the practical problems involved in implementing them through computer software and hardware.",
                    is_reserved: false
                },
                {
                    id: 6,
                    category_id: 1,
                    name: "Social Science",
                    photo: "./assets/images/books/social-sciences.webp",
                    description: " Unlike the natural sciences, social sciences explore human society and social relationships. This includes disciplines like economics, psychology, sociology, anthropology, and political science. These fields study various aspects of human behavior and the structures of societies, contributing to our understanding of cultural and social systems.",
                    is_reserved: false
                }
            ]
        },
        {
            id: 2,
            name: "Arts",
            photo_url: "./assets/images/category-art.webp",
            banner: "./assets/images/category-art-banner.webp",
            description: "A broad spectrum of creative disciplines that express human creativity, emotion, and cultural heritage.",
            books: [
                {
                    id: 7,
                    category_id: 1,
                    name: "Visual Arts",
                    photo: "./assets/images/books/physics.webp",
                    description: "This category includes forms of art that are primarily visual in nature, such as painting, drawing, sculpture, photography, and printmaking. Visual arts often focus on aesthetic qualities and the creation of works that are primarily appreciated visually.",
                    is_reserved: false
                },
                {
                    id: 8,
                    category_id: 1,
                    name: "Performing Arts",
                    photo: "./assets/images/books/physics.webp",
                    description: "These are forms of art in which artists use their body, voice, or objects to convey artistic expression—as opposed to visual arts, in which artists use paint, canvas, or various materials to create physical art objects. Performing arts include disciplines like music, dance, and theater.",
                    is_reserved: false
                },
                {
                    id: 9,
                    category_id: 1,
                    name: "Literary Arts",
                    photo: "./assets/images/books/physics.webp",
                    description: "This art form involves the craft of writing and includes poetry, fiction, non-fiction, and drama. Literary artists use words to create narratives, poems, or plays that explore complex human conditions and emotions.",
                    is_reserved: false
                },
                {
                    id: 10,
                    category_id: 1,
                    name: "Cinematic Arts",
                    photo: "./assets/images/books/physics.webp",
                    description: "Often simply called filmmaking, cinematic arts combine visual art with sound to tell stories or present visual information in a dynamic way. This category includes not just feature films but also documentaries, animated movies, and other forms of visual storytelling through the medium of film and video.",
                    is_reserved: false
                },
                {
                    id: 11,
                    category_id: 2,
                    name: "Decorative Arts",
                    photo: "./assets/images/books/physics.webp",
                    description: "This refers to the design and aesthetics of functional objects to make them pleasing to the eye. The decorative arts include crafts such as ceramics, furniture making, textiles, jewelry design, and metal crafting. Unlike fine arts, the primary emphasis of decorative arts is on the utility of the final product.",
                    is_reserved: false
                },
                {
                    id: 12,
                    category_id: 2,
                    name: "Digital Arts",
                    photo: "./assets/images/books/physics.webp",
                    description: "A modern addition to the traditional art forms, digital arts use digital technology as an essential part of the creative or presentation process. This includes digital painting, digital photography, video games, and computer-generated animations. Digital arts often blend techniques from traditional visual arts with modern media and can be interactive.",
                    is_reserved: false
                }
            ]
        },
        {
            id: 3,
            name: "Humanity",
            photo_url: "./assets/images/category-humanity.webp",
            banner: "./assets/images/category-humanity-banner.webp",
            description: "study aspects of human society and culture. Areas of study that explore different facets of human experience, history, and expression.",
            books: [
                {
                    id: 13,
                    category_id: 1,
                    name: "History",
                    photo: "./assets/images/books/physics.webp",
                    description: "This specialization is concerned with the study of the past. Historians examine and analyze the sequence of events, the relationship between them, and their causes and effects. History helps us understand changes in society over time and can cover vast areas including economic history, cultural history, and political history.",
                    is_reserved: false
                },
                {
                    id: 14,
                    category_id: 1,
                    name: "Philosophy",
                    photo: "./assets/images/books/physics.webp",
                    description: "Philosophy involves the study of general and fundamental questions about existence, knowledge, values, reason, mind, and language. Philosophical methods include questioning, critical discussion, rational argument, and systematic presentation. Classics such as ethics, metaphysics, epistemology, and aesthetics fall under this category.",
                    is_reserved: false
                },
                {
                    id: 15,
                    category_id: 1,
                    name: "Literature",
                    photo: "./assets/images/books/physics.webp",
                    description: "Literature studies written works, exploring themes, narrative techniques, and the use of language. It often involves the analysis of poems, novels, and plays. Literature is a powerful tool for examining human nature, societal norms, and cultural differences across different periods and regions.",
                    is_reserved: false
                },
                {
                    id: 16,
                    category_id: 1,
                    name: "Linguistics",
                    photo: "./assets/images/books/physics.webp",
                    description: "Linguistics is the scientific study of language and its structure. It involves analyzing language form, language meaning, and language in context. Linguists traditionally study phonetics, phonology, morphology, syntax, semantics, and pragmatics.",
                    is_reserved: false
                },
                {
                    id: 17,
                    category_id: 2,
                    name: "Cultural Studies",
                    photo: "./assets/images/books/physics.webp",
                    description: "This interdisciplinary field studies cultural norms, ideals, and practices across various societies. Cultural studies scholars often examine the ways in which culture is mediated through technologies of communication and how culture shapes and is shaped by social relations.",
                    is_reserved: false
                },
                {
                    id: 18,
                    category_id: 2,
                    name: "Religious Studies",
                    photo: "./assets/images/books/physics.webp",
                    description: "This specialization involves the study of religious beliefs, behaviors, and institutions. It describes, compares, interprets, and explains religion, emphasizing systematic, historically based, and cross-cultural perspectives. Religious studies can intersect with philosophy, history, and cultural studies, among others.",
                    is_reserved: false
                }
            ]
        },
        {
            id: 4,
            name: "Financial",
            photo_url: "./assets/images/category-financial.webp",
            banner: "./assets/images/category-financial-banner.webp",
            description: "broad and encompasses various specializations, each focusing on different aspects of financial management, markets, and institutions.",
            books: [
                {
                    id: 19,
                    category_id: 1,
                    name: "Corporate Finance",
                    photo: "./assets/images/books/physics.webp",
                    description: "This specialization focuses on managing the financial actions of a corporation, aiming to maximize shareholder value through long-term and short-term financial planning and the implementation of various strategies. Corporate finance activities include managing investments, capital structuring, and dividend policies.",
                    is_reserved: false
                },
                {
                    id: 20,
                    category_id: 1,
                    name: "Investment Banking",
                    photo: "./assets/images/books/physics.webp",
                    description: "Professionals in investment banking assist in the issuance of securities to help clients raise capital. They also assist companies involved in mergers and acquisitions (M&As), and provide ancillary services such as market making, trading of derivatives, fixed securities, foreign exchange, commodities, and equity securities.",
                    is_reserved: false
                },
                {
                    id: 21,
                    category_id: 1,
                    name: "Financial Planning",
                    photo: "./assets/images/books/physics.webp",
                    description: "Financial planners help individuals manage their finances by creating a strategy tailored to the clients' financial needs and life goals. Areas of focus include investment planning, estate planning, retirement planning, budgeting, and tax planning.",
                    is_reserved: false
                },
                {
                    id: 22,
                    category_id: 1,
                    name: "Risk Management",
                    photo: "./assets/images/books/physics.webp",
                    description: "This specialization involves identifying, analyzing, and mitigating uncertainties in investment decisions. Risk management within finance is often about understanding and managing the financial risks that might jeopardize the assets or earning capacity of an organization.",
                    is_reserved: false
                },
                {
                    id: 23,
                    category_id: 2,
                    name: "Asset Management",
                    photo: "./assets/images/books/physics.webp",
                    description: "Asset management involves managing investments on behalf of others. The role includes determining what investments to make or avoid that will grow a client's portfolio. This might include stocks, bonds, real estate, and other assets.",
                    is_reserved: false
                },
                {
                    id: 24,
                    category_id: 2,
                    name: "Quantitative Analysis (Quant)",
                    photo: "./assets/images/books/physics.webp",
                    description: "Quantitative analysts, or quants, apply mathematical and statistical models to financial data to predict behavior and help financial firms optimize their investment decisions. This specialization is crucial in derivatives, risk management, and investment banking.",
                    is_reserved: false
                }
            ]
        }
    ]
};