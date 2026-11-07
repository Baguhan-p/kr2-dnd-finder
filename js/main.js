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

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i % 3) * 90 + "ms";
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".card, .adv-tile, .review-card, .faq-item").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});