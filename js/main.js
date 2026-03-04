// Mobile navigation toggle
const body = document.body;
const navToggle = document.querySelector(".sr-nav-toggle");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("sr-nav-open");
    // Prevent background scroll when mobile nav is open
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  });
}

// Dropdown for Home 1 / Home 2
const dropdownToggles = document.querySelectorAll(".sr-dropdown-toggle");
let dropdownHoverTimeout;

dropdownToggles.forEach((toggle) => {
  const menu = toggle.parentElement?.querySelector(".sr-dropdown-menu");
  const dropdownItem = toggle.parentElement;
  if (!menu) return;

  // Click handler
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    // On mobile, toggle the dropdown instead of navigating
    const isMobile = window.innerWidth <= 992 || body.classList.contains("sr-nav-open");
    if (isMobile) {
      event.preventDefault();
      const isOpen = menu.classList.contains("sr-dropdown-menu-open");
      document
        .querySelectorAll(".sr-dropdown-menu-open")
        .forEach((el) => el.classList.remove("sr-dropdown-menu-open"));
      if (!isOpen) {
        menu.classList.add("sr-dropdown-menu-open");
      }
    }
  });

  // Hover handler with delay
  dropdownItem.addEventListener("mouseenter", () => {
    clearTimeout(dropdownHoverTimeout);
    dropdownHoverTimeout = setTimeout(() => {
      document
        .querySelectorAll(".sr-dropdown-menu-open")
        .forEach((el) => el.classList.remove("sr-dropdown-menu-open"));
      menu.classList.add("sr-dropdown-menu-open");
    }, 200);
  });

  dropdownItem.addEventListener("mouseleave", () => {
    clearTimeout(dropdownHoverTimeout);
    menu.classList.remove("sr-dropdown-menu-open");
  });
});

document.addEventListener("click", () => {
  document
    .querySelectorAll(".sr-dropdown-menu-open")
    .forEach((el) => el.classList.remove("sr-dropdown-menu-open"));
});

// Scroll-triggered animations
const animated = document.querySelectorAll(
  ".sr-fade-up, .sr-fade-left, .sr-fade-right, .sr-zoom-in, .sr-float-in"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sr-animate-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animated.forEach((el) => observer.observe(el));
} else {
  animated.forEach((el) => el.classList.add("sr-animate-visible"));
}

// Simple counters for hero stats on Home 1
const counters = document.querySelectorAll(".sr-stat-number[data-target]");

function animateCounter(counter) {
  const target = parseFloat(counter.getAttribute("data-target") || "0");
  const isDecimal = !Number.isInteger(target);
  const duration = 1400;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = target * progress;
    counter.textContent = isDecimal ? value.toFixed(1) : Math.floor(value).toString();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window && counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => counterObserver.observe(c));
} else {
  counters.forEach(animateCounter);
}

// Menu tabs on Home 1
const menuTabs = document.querySelectorAll(".sr-menu-tab");
const menuPanels = document.querySelectorAll(".sr-menu-panel");

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const menu = tab.getAttribute("data-menu");
    if (!menu) return;

    menuTabs.forEach((t) => t.classList.remove("sr-menu-tab-active"));
    tab.classList.add("sr-menu-tab-active");

    menuPanels.forEach((panel) => {
      if (panel.getAttribute("data-menu-panel") === menu) {
        panel.classList.add("sr-menu-panel-active");
      } else {
        panel.classList.remove("sr-menu-panel-active");
      }
    });
  });
});

// Reservation and newsletter fake submit handlers
const reservationForm = document.getElementById("reservation-form");
const reservationSuccess = document.getElementById("reservation-success");

if (reservationForm && reservationSuccess) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    reservationSuccess.textContent =
      "Thank you! Your reservation request has been received. Our team will confirm shortly.";
    reservationForm.reset();
  });
}

const newsletterForm = document.getElementById("newsletter-form");
const newsletterSuccess = document.getElementById("newsletter-success");

if (newsletterForm && newsletterSuccess) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterSuccess.textContent = "You’re in! Watch your inbox for golden updates.";
    newsletterForm.reset();
  });
}

// Current year in footer
const yearTargets = document.querySelectorAll("#current-year");
const year = new Date().getFullYear();
yearTargets.forEach((el) => (el.textContent = String(year)));

