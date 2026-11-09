// VoltDrive interactions
document.addEventListener("DOMContentLoaded", () => {
  // Vehicle category filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const vehicleCards = document.querySelectorAll(".vehicle-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        item.classList.remove("bg-primary", "text-on-primary", "active");
        item.classList.add("text-on-surface-variant");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("bg-primary", "text-on-primary", "active");
      button.classList.remove("text-on-surface-variant");
      button.setAttribute("aria-pressed", "true");

      const selected = button.textContent.trim();
      vehicleCards.forEach((card) => {
        const matches = selected === "All Models" ||
          card.dataset.category === selected;
        card.hidden = !matches;
      });
    });
  });

  // Mobile navigation
  const menuButton = document.querySelector(".mobile-menu-toggle");
  const mobileNavigation = document.querySelector("#mobile-navigation");

  if (menuButton && mobileNavigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      mobileNavigation.classList.toggle("is-open", !isOpen);
    });

    mobileNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
        mobileNavigation.classList.remove("is-open");
      });
    });
  }

  // Subtle header treatment after scrolling
  const header = document.querySelector("header");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Demo-only form feedback; no data is sent or stored.
  const joinButton = [...document.querySelectorAll("footer button")]
    .find((button) => button.textContent.trim().toLowerCase() === "join");
  if (joinButton) {
    joinButton.addEventListener("click", () => {
      const email = joinButton.parentElement?.querySelector('input[type="email"]');
      if (!email || !email.checkValidity() || !email.value.trim()) {
        email?.reportValidity();
        return;
      }
      alert("Thank you for your interest in VoltDrive. This is a demo form; no email was submitted.");
      email.value = "";
    });
  }

  console.log("VoltDrive website loaded successfully.");
});
