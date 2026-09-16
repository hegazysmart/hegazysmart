const marqueeTrack = document.querySelector(".marquee-track");

if (marqueeTrack) {
    marqueeTrack.innerHTML = `${marqueeTrack.innerHTML}${marqueeTrack.innerHTML}`;
}

const revealItems = document.querySelectorAll(".project-card, .timeline-item, .skills-grid article, .credential-grid article");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealItems.forEach(item => {
        item.classList.add("reveal");
        observer.observe(item);
    });
} else {
    revealItems.forEach(item => item.classList.add("is-visible"));
}
