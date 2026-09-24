document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const answerContainer = button.previousElementSibling;

      if (answerContainer) {
        answerContainer.toggleAttribute("hidden");
        const isHidden = answerContainer.hasAttribute("hidden");
        button.textContent = isHidden ? "Show anwser" : "Hide answer";
      }
    });
  });
});
