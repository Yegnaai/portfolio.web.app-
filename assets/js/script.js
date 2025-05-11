'use strict';

// Enhanced element toggle function with smooth transitions
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
  
  // Add smooth height transition for sidebar
  if (elem.classList.contains('sidebar')) {
    const height = elem.scrollHeight;
    elem.style.maxHeight = elem.classList.contains('active') ? `${height}px` : null;
  }
};

// Improved sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
  this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
});

// Enhanced testimonials modal functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Improved modal toggle with keyboard support
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  
  if (modalContainer.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    modalCloseBtn.focus();
  } else {
    document.body.style.overflow = "";
  }
};

// Enhanced modal accessibility
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalContainer.classList.contains("active")) {
    testimonialsModalFunc();
  }
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// Improved form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Enhanced form validation with better feedback
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    validateForm();
    
    // Show validation feedback
    if (this.checkValidity()) {
      this.classList.remove("invalid");
      this.classList.add("valid");
    } else {
      this.classList.remove("valid");
      this.classList.add("invalid");
    }
  });
});

function validateForm() {
  const isValid = form.checkValidity();
  formBtn.disabled = !isValid;
  
  if (isValid) {
    formBtn.classList.add("ready");
  } else {
    formBtn.classList.remove("ready");
  }
}

// Prevent form submission if invalid
form.addEventListener("submit", function (e) {
  if (!this.checkValidity()) {
    e.preventDefault();
    return;
  }
  
  // Handle form submission
  e.preventDefault();
  // Add your form submission logic here
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}