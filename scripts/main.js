const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll("[data-nav-link]");
const sectionIds = ["hero", "about", "skills", "projects", "contact"];

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

function setActiveLink(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("data-nav-link") === sectionId;
    link.classList.toggle("nav-link-active", isActive);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveLink(target.id);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    let bestMatch = null;

    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      if (!bestMatch || entry.intersectionRatio > bestMatch.intersectionRatio) {
        bestMatch = entry;
      }
    });

    if (bestMatch && bestMatch.target.id) {
      setActiveLink(bestMatch.target.id);
    }
  },
  {
    root: null,
    threshold: [0.25, 0.5, 0.75],
    rootMargin: "-35% 0px -45% 0px"
  }
);

sectionIds.forEach((id) => {
  const section = document.getElementById(id);
  if (section) {
    observer.observe(section);
  }
});

const contactForm = document.getElementById("contact-form");
const FORMSUBMIT_EMAIL = "htetnaingwinn1@gmail.com";
const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`;

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formError = document.getElementById("form-error");
  const formSuccess = document.getElementById("form-success");
  const formNext = document.getElementById("form-next");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (formNext) {
    formNext.value = `${window.location.origin}${window.location.pathname}#contact`;
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameValue = nameInput ? nameInput.value.trim() : "";
    const emailValue = emailInput ? emailInput.value.trim() : "";
    const messageValue = messageInput ? messageInput.value.trim() : "";

    let isValid = true;

    if (nameError) {
      nameError.textContent = "";
    }
    if (emailError) {
      emailError.textContent = "";
    }
    if (messageError) {
      messageError.textContent = "";
    }
    if (formError) {
      formError.textContent = "";
    }
    if (formSuccess) {
      formSuccess.textContent = "";
    }

    if (!nameValue) {
      isValid = false;
      if (nameError) {
        nameError.textContent = "Please enter your name.";
      }
    }

    if (!emailValue) {
      isValid = false;
      if (emailError) {
        emailError.textContent = "Please enter your email.";
      }
    } else if (!emailPattern.test(emailValue)) {
      isValid = false;
      if (emailError) {
        emailError.textContent = "Please enter a valid email address.";
      }
    }

    if (!messageValue) {
      isValid = false;
      if (messageError) {
        messageError.textContent = "Please enter your message.";
      }
    } else if (messageValue.length < 10) {
      isValid = false;
      if (messageError) {
        messageError.textContent = "Message should be at least 10 characters.";
      }
    }

    if (!isValid) {
      return;
    }

    const previousLabel = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }

    try {
      const response = await fetch(FORMSUBMIT_AJAX, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        if (formSuccess) {
          formSuccess.textContent =
            typeof data.message === "string" && data.message
              ? data.message
              : "Thanks! Your message was sent.";
        }
        contactForm.reset();
      } else if (formError) {
        formError.textContent =
          typeof data.message === "string" && data.message
            ? data.message
            : "Could not send your message. Please try again in a moment.";
      }
    } catch {
      if (formError) {
        formError.textContent =
          "Could not reach the form service. If you opened this page as a file, use a local server or deploy the site, then try again.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = previousLabel;
      }
    }
  });
}

const revealTargets = document.querySelectorAll(
  "#hero > div, #about .card, #about > div:last-child, #skills .card, #projects .card, #contact form, #contact > div"
);

if (revealTargets.length > 0) {
  revealTargets.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observerRef) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("reveal-visible");
        observerRef.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
}
