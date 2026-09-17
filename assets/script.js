document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector("#menuBtn");
  const navLinks = document.querySelector(".navlinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
      const isOpen = navLinks.classList.contains("mobile-open");
      menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        menuBtn.textContent = "☰";
      });
    });
  }

  // Generic Form Handler
  function setupForm(formId, successId) {
    const form = document.querySelector(formId);
    const success = document.querySelector(successId);

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Request Received ✓";
      }
      if (success) {
        success.classList.add("show");
      }
      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = btn.dataset.original || "Request My Free Quote <span>→</span>";
        }
      }, 3500);
    });
  }

  setupForm("#heroQuoteForm", "#heroSuccess");
  setupForm("#quoteForm", "#quoteSuccess");

  // Smooth Scroll Active Links
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".navlinks a[href^='#']");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach(item => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  }, { passive: true });
});