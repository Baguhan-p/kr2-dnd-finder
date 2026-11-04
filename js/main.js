document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      bootstrap.Modal.getInstance(document.getElementById("contactModal"))?.hide();
      contactForm.reset();
      showToast("Сообщение отправлено! Мы свяжемся с адресатом.", "success");
    });
  }
});