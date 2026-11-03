(function () {
  "use strict";

  /* =====================================================
       CONFIGURATION
       ===================================================== */

  const WHATSAPP_NUMBER = "2348032211668";

  const pageMap = {
    home: "index.html",
    about: "aboutus.html",
    services: "services.html",
    properties: "properties.html",
    construction: "construction.html",
    management: "management.html",
    portfolio: "portfolio.html",
    contact: "contact.html",
  };

  const pageTitles = {
    home: "Gabosh-Global-Nig-Ltd | Engineering & Real Estate Solutions",
    about: "About Us | Gabosh Global Nig Ltd - Who We Are",
    services: "Services | Gabosh-Global-Nig-Ltd",
    properties: "Buy & Sell | Gabosh-Global-Nig-Ltd",
    construction: "Construction & Blueprint | Gabosh-Global-Nig-Ltd",
    management: "Estate Management | Gabosh-Global-Nig-Ltd",
    portfolio: "Projects | Gabosh-Global-Nig-Ltd",
    contact: "Contact | Gabosh-Global-Nig-Ltd",
  };

  /* =====================================================
       HELPER FUNCTIONS
       ===================================================== */

  function $(selector, parent) {
    return (parent || document).querySelector(selector);
  }

  function $$(selector, parent) {
    return Array.from((parent || document).querySelectorAll(selector));
  }

  function createIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function getCurrentPage() {
    let fileName = window.location.pathname.split("/").pop().toLowerCase();

    if (!fileName) {
      fileName = "index.html";
    }

    for (const page in pageMap) {
      if (pageMap[page].toLowerCase() === fileName) {
        return page;
      }
    }

    return "home";
  }

  function navigateTo(page) {
    if (!pageMap[page]) {
      return;
    }

    const destination = pageMap[page];

    const currentFile =
      window.location.pathname.split("/").pop().toLowerCase() || "index.html";

    if (currentFile === destination.toLowerCase()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      closeMobileMenu();
      return;
    }

    window.location.href = destination;
  }

  /* =====================================================
       PAGE TITLE
       ===================================================== */

  function setupPageTitle() {
    const page = getCurrentPage();

    if (pageTitles[page]) {
      document.title = pageTitles[page];
    }
  }

  /* =====================================================
       PAGE LOADER
       ===================================================== */

  function setupPageLoader() {
    const loader = $("#pageLoader");

    if (!loader) {
      return;
    }

    loader.style.opacity = "1";
    loader.style.width = "15%";

    requestAnimationFrame(function () {
      loader.style.width = "85%";
    });

    setTimeout(function () {
      loader.style.width = "100%";

      setTimeout(function () {
        loader.style.opacity = "0";

        setTimeout(function () {
          loader.style.width = "0%";
        }, 300);
      }, 250);
    }, 350);
  }

  /* =====================================================
       MOBILE MENU
       ===================================================== */

  function closeMobileMenu() {
    const menu = $("#mobileMenu");
    const menuButton = $("#menuBtn");
    const openIcon = $("#menuIconOpen");
    const closeIcon = $("#menuIconClose");

    if (!menu) {
      return;
    }

    menu.classList.remove("open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
    }

    if (openIcon) {
      openIcon.classList.remove("hidden");
    }

    if (closeIcon) {
      closeIcon.classList.add("hidden");
    }
  }

  function toggleMobileMenu() {
    const menu = $("#mobileMenu");
    const menuButton = $("#menuBtn");
    const openIcon = $("#menuIconOpen");
    const closeIcon = $("#menuIconClose");

    if (!menu) {
      return;
    }

    const isOpen = menu.classList.toggle("open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", String(isOpen));
    }

    if (openIcon) {
      openIcon.classList.toggle("hidden", isOpen);
    }

    if (closeIcon) {
      closeIcon.classList.toggle("hidden", !isOpen);
    }
  }

  function setupMobileMenu() {
    const menuButton = $("#menuBtn");

    if (menuButton) {
      menuButton.addEventListener("click", toggleMobileMenu);
    }

    $$(".mobile-link").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", function (event) {
      const menu = $("#mobileMenu");
      const button = $("#menuBtn");

      if (!menu) {
        return;
      }

      if (!menu.classList.contains("open")) {
        return;
      }

      if (
        menu.contains(event.target) ||
        (button && button.contains(event.target))
      ) {
        return;
      }

      closeMobileMenu();
    });
  }

  /* =====================================================
       NAVIGATION
       ===================================================== */

  function setupNavigation() {
    $$(".page-link, .goto-btn").forEach(function (element) {
      element.addEventListener("click", function (event) {
        const page = this.dataset.page || this.dataset.goto;

        if (!page) {
          return;
        }

        if (!pageMap[page]) {
          return;
        }

        event.preventDefault();

        navigateTo(page);
      });
    });

    /*
     * Support elements that use data-page
     * without the page-link class.
     */

    document.addEventListener("click", function (event) {
      const element = event.target.closest("[data-page], [data-goto]");

      if (!element) {
        return;
      }

      if (
        element.classList.contains("page-link") ||
        element.classList.contains("goto-btn")
      ) {
        return;
      }

      const page = element.dataset.page || element.dataset.goto;

      if (!page || !pageMap[page]) {
        return;
      }

      event.preventDefault();

      navigateTo(page);
    });

    /*
     * Mark the current navigation link active
     * without changing its styling.
     */

    const currentPage = getCurrentPage();

    $$(".nav-link").forEach(function (link) {
      const linkPage = link.dataset.page;

      if (linkPage && linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  }

  /* =====================================================
       BACK TO TOP
       ===================================================== */

  function setupBackToTop() {
    const button = $("#backTop");

    if (!button) {
      return;
    }

    function updateButton() {
      if (window.scrollY > 600) {
        button.classList.remove("hidden");

        button.classList.add("flex");
      } else {
        button.classList.add("hidden");

        button.classList.remove("flex");
      }
    }

    window.addEventListener("scroll", updateButton, {
      passive: true,
    });

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    updateButton();
  }

  /* =====================================================
       TABS
       ===================================================== */

  function setupTabs() {
    $$(".tab-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        const tab = this.dataset.tab;

        if (!tab) {
          return;
        }

        $$(".tab-btn").forEach(function (btn) {
          btn.classList.remove("active");
        });

        this.classList.add("active");

        $$(".tab-panel").forEach(function (panel) {
          panel.classList.add("hidden");
        });

        const target = $("#tab-" + tab);

        if (target) {
          target.classList.remove("hidden");
        }

        createIcons();
      });
    });
  }

  /* =====================================================
       PROPERTY FILTER
       ===================================================== */

  function setupPropertyFilters() {
    const propertyGrid = $("#propertyGridFull");

    if (!propertyGrid) {
      return;
    }

    const cards = $$(".property-card", propertyGrid);

    if (!cards.length) {
      return;
    }

    const noResults = $("#noResults");

    $$(".filter-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        const filter = this.dataset.filter || "all";

        let visibleCount = 0;

        $$(".filter-btn").forEach(function (btn) {
          btn.classList.remove("filter-active");
        });

        this.classList.add("filter-active");

        cards.forEach(function (card) {
          const category = card.dataset.category || "";

          const shouldShow = filter === "all" || category === filter;

          if (shouldShow) {
            card.style.display = "";

            visibleCount++;
          } else {
            card.style.display = "none";
          }
        });

        if (noResults) {
          if (visibleCount === 0) {
            noResults.classList.remove("hidden");
          } else {
            noResults.classList.add("hidden");
          }
        }
      });
    });
  }

  /* =====================================================
       SCROLL REVEAL
       ===================================================== */

  function setupRevealAnimations() {
    const elements = $$(".reveal");

    if (!elements.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
      },
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  /* =====================================================
       COUNTERS
       ===================================================== */

  function setupCounters() {
    const counters = $$("[data-counter]");

    if (!counters.length) {
      return;
    }

    counters.forEach(function (counter) {
      const target = parseInt(counter.dataset.counter, 10);

      if (Number.isNaN(target)) {
        return;
      }

      let started = false;

      function animateCounter() {
        if (started) {
          return;
        }

        started = true;

        const duration = 1400;
        const startTime = performance.now();

        function animate(now) {
          const progress = Math.min((now - startTime) / duration, 1);

          /*
           * Smooth easing.
           */

          const eased = 1 - Math.pow(1 - progress, 3);

          counter.textContent = Math.round(target * eased);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
      }

      if (!("IntersectionObserver" in window)) {
        animateCounter();

        return;
      }

      const observer = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            animateCounter();

            observer.disconnect();
          });
        },
        {
          threshold: 0.4,
        },
      );

      observer.observe(counter);
    });
  }

  /* =====================================================
       FAQ ACCORDION
       ===================================================== */

  function setupAccordions() {
    $$(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        const item = this.closest(".acc-item");

        if (!item) {
          return;
        }

        const parent = item.parentElement;

        const wasOpen = item.classList.contains("open");

        /*
         * Close the other accordion
         * items in the same group.
         */

        if (parent) {
          parent.querySelectorAll(".acc-item").forEach(function (other) {
            other.classList.remove("open");
          });
        }

        /*
         * Re-open the clicked one
         * if it wasn't already open.
         */

        if (!wasOpen) {
          item.classList.add("open");
        }
      });
    });
  }

  /* =====================================================
       PROPERTY ENQUIRY MODAL
       ===================================================== */

  function getEnquiryElements() {
    return {
      modal: $("#enquiryModal"),
      title: $("#enquiryTitle"),
      name: $("#eq-name"),
      phone: $("#eq-phone"),
      whatsapp: $("#eq-whatsapp"),
    };
  }

  function updateWhatsAppLink() {
    const elements = getEnquiryElements();

    if (!elements.whatsapp) {
      return;
    }

    const propertyTitle = elements.title
      ? elements.title.textContent.trim()
      : "your property";

    const name = elements.name ? elements.name.value.trim() : "";

    const phone = elements.phone ? elements.phone.value.trim() : "";

    let message = "Hello Gabosh, I'm interested in: " + propertyTitle;

    if (name) {
      message += ". My name is " + name;
    }

    if (phone) {
      message += " (" + phone + ")";
    }

    elements.whatsapp.href =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);
  }

  function openEnquiry(title) {
    const elements = getEnquiryElements();

    if (!elements.modal) {
      return;
    }

    if (elements.title) {
      elements.title.textContent = title || "Property enquiry";
    }

    updateWhatsAppLink();

    elements.modal.classList.remove("hidden");

    elements.modal.classList.add("flex");

    document.body.style.overflow = "hidden";

    createIcons();
  }

  function closeEnquiry() {
    const modal = $("#enquiryModal");

    if (!modal) {
      return;
    }

    modal.classList.add("hidden");

    modal.classList.remove("flex");

    document.body.style.overflow = "";
  }

  /*
   * Make these functions available to
   * existing inline onclick handlers.
   *
   * Example:
   * onclick="openEnquiry('Property name')"
   */

  window.openEnquiry = openEnquiry;

  window.closeEnquiry = closeEnquiry;

  function setupEnquiryModal() {
    const elements = getEnquiryElements();

    if (!elements.modal) {
      return;
    }

    const backdrop = $("#modalBackdrop");

    if (backdrop) {
      backdrop.addEventListener("click", closeEnquiry);
    }

    if (elements.name) {
      elements.name.addEventListener("input", updateWhatsAppLink);
    }

    if (elements.phone) {
      elements.phone.addEventListener("input", updateWhatsAppLink);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeEnquiry();
      }
    });

    updateWhatsAppLink();
  }

  /* =====================================================
       CONTACT FORM
       ===================================================== */

  function setupContactForm() {
    const form = $("#contactFormMain");

    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = $("#cf-name");

      const phoneInput = $("#cf-phone");

      const serviceInput = $("#cf-service");

      const messageInput = $("#cf-msg");

      const note = $("#cf-note");

      const name = nameInput ? nameInput.value.trim() : "";

      const phone = phoneInput ? phoneInput.value.trim() : "";

      const service = serviceInput ? serviceInput.value : "";

      const message = messageInput ? messageInput.value.trim() : "";

      const whatsappMessage =
        "Hello Gabosh Global!" +
        "\n\nName: " +
        name +
        "\nPhone: " +
        phone +
        "\nService: " +
        service +
        "\nDetails: " +
        (message || "—");

      if (note) {
        note.classList.remove("hidden");

        note.textContent = "Opening WhatsApp with your request...";
      }

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  /* =====================================================
       ESCAPE KEY
       ===================================================== */

  function setupEscapeKey() {
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }

      closeMobileMenu();
      closeEnquiry();
    });
  }

  /* =====================================================
       INITIALIZE EVERYTHING
       ===================================================== */

  function init() {
    setupPageTitle();

    setupPageLoader();

    setupMobileMenu();

    setupNavigation();

    setupBackToTop();

    setupTabs();

    setupPropertyFilters();

    setupRevealAnimations();

    setupCounters();

    setupAccordions();

    setupEnquiryModal();

    setupContactForm();

    setupEscapeKey();

    /*
     * Initialize Lucide after all page
     * elements have been loaded.
     */

    createIcons();
  }

  /* =====================================================
       START
       ===================================================== */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
