//JSON structure for navbar "Oyoon El-Salsabeel Marines"
const navbarConfig = {
    logo: {
        src: "./assets/images/logo/blue/full-logo.png",
        alt: "O.S.M",
        title: "",
        subtitle: "",
        link: "./index.html",
    },
    menu: [
        {
            text: "Activities",
            link: "./categories.html",
            dropdown: [
                { text: "Diving", link: "#moodboard", icon: "./assets/images/icons/icons8-dynamic-links.svg" },
                { text: "Searching", link: "#Searching", icon: "./assets/images/icons/icons8-dynamic-links.svg" },
                { text: "Teaching", link: "#Searching", icon: "./assets/images/icons/icons8-dynamic-links.svg" },
            ],
        },
        { text: "Clients", link: "#Clients" },
        { text: "About", link: "./about.html" },
    ],
    profile: {
        imageSrc: "./assets/images/icons/icons8-dynamic-links.svg",
        dropdown: [
            { text: "Facebook", link: "#", icon: "./assets/images/icons/icons8-dynamic-links.svg" },
            { text: "instagram", link: "#", icon: "./assets/images/icons/icons8-dynamic-links.svg" },
            { text: "Tik-Tok", link: "#", icon: "./assets/images/icons/icons8-dynamic-links.svg" },
        ],
    },
};

//render the navbar dynamically
function generateNavbar(config) {
    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-md navbar-light";

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
              <img src="${config.profile.imageSrc}" width="40px;" alt="profile"></img>
            </a>
            <ul class="dropdown-menu end-0" aria-labelledby="navbarDropdownMenuLink">
              ${generateDropdownItems(config.profile.dropdown)}
            </ul>
          </div>
        </div>
      </div>
    `;
    // <img src="${config.profile.imageSrc}" width="40px;" alt="profile"></img>

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
    return items.map(item => `<li><a class="dropdown-item" href="${item.link}">
        <img src="${item.icon}" width="40px;" alt="profile"></img>
        ${item.text}
        </a></li>`).join("");
}

// Call the function to render the navbar
generateNavbar(navbarConfig);
