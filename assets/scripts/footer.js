const footerConfig = {
    about: {
        title: "About SHARELIGHT",
        description:
            "SHARELIGHT Library is dedicated to providing free access to knowledge and education for everyone. We believe in empowering minds through free information access.",
    },
    contact: {
        title: "Contact Us",
        details: [
            "123 Library Street",
            "Booktown, BK 12345",
            "Email: info@sharelightlibrary.com",
            "Phone: (123) 456-7890",
        ],
    },
    social: {
        title: "Follow Us",
        links: [
            { platform: "facebook", url: "#", icon: "fab fa-facebook-f" },
            { platform: "twitter", url: "#", icon: "fab fa-twitter" },
            { platform: "instagram", url: "#", icon: "fab fa-instagram" },
        ],
    },
};


function generateFooter(config) {
    const footer = document.createElement("footer");
    footer.className = "bg-dark text-white pt-4 pb-4";

    footer.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>${config.about.title}</h5>
            <p>${config.about.description}</p>
          </div>
          <div class="col-md-4">
            <h5>${config.contact.title}</h5>
            <ul class="list-unstyled">
              ${config.contact.details.map(detail => `<li>${detail}</li>`).join("")}
            </ul>
          </div>
          <div class="col-md-4">
            <h5>${config.social.title}</h5>
            ${config.social.links
            .map(
                link =>
                    `<a href="${link.url}" class="text-white me-2"><i class="${link.icon}"></i></a>`
            )
            .join("")}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(footer); // Append the footer at the bottom of the body
}

// Call the function to render the footer
generateFooter(footerConfig);
