'use strict';

/**
 * ELEMENT TOGGLE FUNCTION
 */
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

/**
 * SIDEBAR TOGGLE
 */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});

/**
 * TESTIMONIALS MODAL
 */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal elements
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// CONTACT FORM
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector(".form-status");

// Real-time validation
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Disable button during submission
  formBtn.setAttribute("disabled", "");
  formStatus.style.display = "block";
  formStatus.textContent = "Sending your message...";
  formStatus.style.backgroundColor = "#f8f8f8";
  formStatus.style.color = "#333";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formStatus.textContent = "Message sent successfully! 🎉";
      formStatus.style.backgroundColor = "#d4edda";
      formStatus.style.color = "#155724";
      form.reset();
    } else {
      formStatus.textContent = "Oops! There was an error. Please try again.";
      formStatus.style.backgroundColor = "#f8d7da";
      formStatus.style.color = "#721c24";
    }
  } catch (error) {
    formStatus.textContent = "Network error. Please check your internet connection.";
    formStatus.style.backgroundColor = "#fff3cd";
    formStatus.style.color = "#856404";
  } finally {
    formBtn.removeAttribute("disabled");
    setTimeout(() => {
      formStatus.style.display = "none";
    }, 5000);
  }
});



/**
 * PAGE NAVIGATION
 */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all navigation links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();
    
    // Show the selected page, hide others
    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}


if (response.ok) {
  formStatus.textContent = "Message sent successfully! 🎉";
  formStatus.classList.add("success");
} else {
  formStatus.textContent = "Oops! There was an error. Please try again.";
  formStatus.classList.add("error");
}