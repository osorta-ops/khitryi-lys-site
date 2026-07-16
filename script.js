const body = document.body;
const ageGate = document.querySelector("#ageGate");
const acceptButton = document.querySelector("#ageAccept");
const declineButton = document.querySelector("#ageDecline");
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

function unlockSite() {
  body.classList.remove("age-locked");
  ageGate.setAttribute("aria-hidden", "true");
  sessionStorage.setItem("khitryiLysAge", "accepted");
}

if (sessionStorage.getItem("khitryiLysAge") === "accepted") unlockSite();
acceptButton.addEventListener("click", unlockSite);
declineButton.addEventListener("click", () => {
  if (history.length > 1) history.back();
  else window.location.replace("about:blank");
});

window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });

function closeMenu() {
  menuButton.classList.remove("is-open");
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const open = menuButton.classList.toggle("is-open");
  nav.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

const revealObserver = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

document.querySelector("#year").textContent = new Date().getFullYear();
