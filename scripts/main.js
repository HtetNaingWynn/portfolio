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

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formSuccess = document.getElementById("form-success");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener("submit", (event) => {
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

    contactForm.reset();
    if (formSuccess) {
      formSuccess.textContent = "Message sent successfully. Thank you!";
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
