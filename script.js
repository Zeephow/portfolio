const revealElements = document.querySelectorAll(".reveal");
const tiltElements = document.querySelectorAll(".tilt");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 90}ms`;
  revealObserver.observe(element);
});

const maxTilt = 10; // degrees

const applyTilt = (el, clientX, clientY) => {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (clientX - cx) / (rect.width / 2);
  const dy = (clientY - cy) / (rect.height / 2);
  const rx = (-dy * maxTilt).toFixed(2);
  const ry = (dx * maxTilt).toFixed(2);
  el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
};

tiltElements.forEach((el) => {
  el.addEventListener("pointermove", (e) => applyTilt(el, e.clientX, e.clientY));
  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
  });
});

console.log("Portfolio ready");
