const pageContactForm = document.getElementById("page-contact-form");
const pageContactSuccess = document.getElementById("page-contact-success");

if (pageContactForm && pageContactSuccess) {
  pageContactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    pageContactSuccess.textContent =
      "Thank you for reaching out. Our team will get back to you shortly.";
    pageContactForm.reset();
  });
}

