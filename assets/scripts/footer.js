const footerConfig = {
  logo: "./assets/images/logo/white/full-logo.png",
  about: {
    title: "About O.S.M",
    description: "Oyoon El-Salsabeel Marines embodies the essence of marine services and ship repair above and below water through diving.",
  },
  contact: {
    title: "Contact Us",
    details: [
      "Address: 123 Library Street",
      "Email: info@sharelightlibrary.com",
      "Phone: (123) 456-7890",
    ],
  },
  social: {
    title: "Follow Us",
    links: [
      { platform: "facebook", url: "#", icon: "fa fa-facebook" },
      { platform: "twitter", url: "#", icon: "fa fa-twitter" },
      { platform: "instagram", url: "#", icon: "fa fa-instagram" },
    ],
  },
};

function generateFooter(config) {
  const footer = document.createElement("footer");

  footer.innerHTML = `
  <div class="container">
      <div>
          <img src="${config.logo}" alt="O.S.M" class="mb-2" height="70">
          <p>${config.about.description}</p>
      </div>
      <div>
          <h5>${config.contact.title}</h5>
          <ul>
              ${config.contact.details.map(detail => `<li>${detail}</li>`).join("")}
          </ul>
      </div>
      <div>
          <h5>${config.social.title}</h5>
          <div class="social-icons">
              ${config.social.links
      .map(
        link =>
          `<a href="${link.url}" target="_blank"><i class="${link.icon}"></i></a>`
      )
      .join("")}
          </div>
      </div>
  </div>
  `;

  document.body.appendChild(footer);
}

generateFooter(footerConfig);