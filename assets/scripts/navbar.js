//JSON structure for navbar
const navbarConfig = {
    logo: {
        src: "./assets/images/logo/blue/logo-blue.png",
        alt: "O.S.M",
        title: "O.S.M",
        subtitle: "Oyoon El-Salsabeel Marines",
        link: "./index.html",
    },
    menu: [
        {
            text: "Categories",
            link: "./categories.html",
            dropdown: [
                { text: "Fiction", link: "./fiction.html" },
                { text: "Non-fiction", link: "./non-fiction.html" },
                { text: "Science", link: "./science.html" },
            ],
        },
        { text: "About", link: "./about.html" },
    ],
    profile: {
        imageSrc: "./assets/images/profile.png",
        dropdown: [
            { text: "Login", link: "./login.html" },
            { text: "Register", link: "./register.html" },
            { text: "Logout", link: "./logout.html" },
        ],
    },
};

//render the navbar dynamically
function generateNavbar(config) {
    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-md navbar-light bg-light";

    navbar.innerHTML = `
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center p-0" href="${config.logo.link}">
          <img src="${config.logo.src}" alt="${config.logo.alt}" class="d-inline-block align-top">
          <div class="home-title">
            <h2>${config.logo.title}</h2>
            <p>${config.logo.subtitle}</p>
          </div>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between header-conent-list" id="navbarNav">
          <ul class="navbar-nav">${generateMenuItems(config.menu)}</ul>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <img src="${config.profile.imageSrc}" width="40px;" alt="profile">
            </a>
            <ul class="dropdown-menu end-0" aria-labelledby="navbarDropdownMenuLink">
              ${generateDropdownItems(config.profile.dropdown)}
            </ul>
          </div>
        </div>
      </div>
    `;

    document.body.prepend(navbar); // Insert the navbar at the top of the body
}

function generateMenuItems(menu) {
    return menu
        .map(item => {
            if (item.dropdown) {
                return `
            <li class="nav-item position-relative">
              <a class="nav-link dropdown-toggle" href="${item.link}" id="navbarcategoryMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${item.text}
              </a>
              <ul class="dropdown-menu">
                ${generateDropdownItems(item.dropdown)}
              </ul>
            </li>`;
            } else {
                return `<li class="nav-item"><a class="nav-link" href="${item.link}">${item.text}</a></li>`;
            }
        })
        .join("");
}

function generateDropdownItems(items) {
    return items.map(item => `<li><a class="dropdown-item" href="${item.link}">${item.text}</a></li>`).join("");
}

// Call the function to render the navbar
generateNavbar(navbarConfig);
