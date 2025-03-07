document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("button");

  button.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
});
