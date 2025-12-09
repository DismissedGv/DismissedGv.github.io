// ============================================================ Navbar ==============================================================
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

// Click-based highlighting
links.forEach(link => {
    link.addEventListener("click", function () {
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

// Scroll-based highlighting
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ============================================================ Skills Scrollers ==============================================================
const allScrollers = [
  ...document.querySelectorAll(".scroller"),
  ...document.querySelectorAll(".scroller2"),
];

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    allScrollers.forEach((scroller) => {
        const inner = scroller.querySelector(".skills-list");
        let totalWidth = inner.scrollWidth;
        const containerWidth = scroller.offsetWidth;

        // Clone repeatedly until the list is long enough
        while (totalWidth < containerWidth * 2) {
            Array.from(inner.children).forEach((item) => {
                const clone = item.cloneNode(true);
                clone.setAttribute("aria-hidden", true);
                inner.appendChild(clone);
            });
            totalWidth = inner.scrollWidth;
        }

        scroller.setAttribute("data-animated", "true");
    });
}