function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  const button = document.querySelector("#menu-toggle");
  nav.classList.toggle("active");
  button.classList.toggle("active");
}
