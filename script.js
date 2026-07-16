const products = {
  "black-molfar": {
    title: "Black Molfar Reserve",
    category: "Whiskey · 43%",
    image: "assets/images/black-molfar.webp",
    story: "Вибір людини, якій уже не потрібно нічого доводити. Темний, зібраний і впевнений образ для важливих розмов, завершених справ та вечорів у колі тих, хто розуміє без зайвих слів.",
    mood: "Дим · мольфарські знаки · вишивка · золото / мідь",
    quote: "Статус не демонструють. Його впізнають."
  },
  "veselyi-ditko": {
    title: "Веселий Дітько",
    category: "Традиційний містичний абсент · 68%",
    image: "assets/images/veselyi-ditko.webp",
    story: "Смарагдова легенда для тих, кому замало звичайної реальності. Ритуал подачі, світло крізь зелене скло й вечір, який непомітно стає історією.",
    mood: "Полин · місяць · алхімія · смарагдовий дим",
    quote: "Для тих, хто бачить більше."
  },
  "sliozy-chichky": {
    title: "Сльози Чічки",
    category: "Carpathian Dry Gin · 42%",
    image: "assets/images/sliozy-chichky.webp",
    story: "Світла й прохолодна сторона колекції. Напій для сонячних терас, чистих келихів, легкої розмови та компаній, які збираються не за розкладом, а за покликом.",
    mood: "Ялівець · крапля · місячна ніч · срібна роса",
    quote: "Легкість, що збирає друзів."
  },
  "witchs-blood": {
    title: "Witch’s Blood",
    category: "Blackcurrant Herbal Liqueur · 30%",
    image: "assets/images/witchs-blood.webp",
    story: "Темно-ягідна історія з характером нічної легенди. Насичений образ, чорний місяць і відчуття старого рецепта, який не записують — лише передають.",
    mood: "Смородина · дикі трави · чорний місяць · бордо",
    quote: "Ягоди. Дикі трави. Краплина магії."
  },
  "motsna-voda": {
    title: "Моцна Вода",
    category: "Виноградна горілка · 45%",
    image: "assets/images/motsna-voda.webp",
    story: "Чесний і сильний характер для щедрого столу. Її природне оточення — вогонь, гриль, зелені гори та люди, з якими не треба добирати слів.",
    mood: "Виноград · вогонь · зелень · добра забава",
    quote: "Залиш денну метушню позаду."
  },
  oseredok: {
    title: "Осередок",
    category: "Карпатський виноградний бренді · 42%",
    image: "assets/images/oseredok.webp",
    story: "Найтепліша історія колекції. Для неспішної розмови біля вогню, зустрічі давніх друзів і моменту, коли дім визначають не стіни, а люди поруч.",
    mood: "Виноград · дуб · полум’я · коло найближчих",
    quote: "Там, де збираються свої."
  }
};

const body = document.body;
const ageGate = document.querySelector("#ageGate");
const acceptButton = document.querySelector("#ageAccept");
const declineButton = document.querySelector("#ageDecline");
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const dialog = document.querySelector("#productDialog");

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

document.querySelectorAll(".product-card").forEach(card => {
  card.querySelector("button").addEventListener("click", () => {
    const product = products[card.dataset.product];
    dialog.style.setProperty("--dialog-accent", getComputedStyle(card).getPropertyValue("--accent"));
    dialog.querySelector("img").src = product.image;
    dialog.querySelector("img").alt = `Пляшка ${product.title}`;
    dialog.querySelector(".product-dialog__category").textContent = product.category;
    dialog.querySelector(".product-dialog__title").textContent = product.title;
    dialog.querySelector(".product-dialog__story").textContent = product.story;
    dialog.querySelector(".product-dialog__mood").textContent = product.mood;
    dialog.querySelector(".product-dialog__quote").textContent = `«${product.quote}»`;
    dialog.showModal();
  });
});

dialog.querySelector(".product-dialog__close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
});

document.querySelector("#year").textContent = new Date().getFullYear();
