// SHOW ANSWER BTN

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

// SCROLL BEHAVIOUR

const navbar = document.querySelector(".navbar");
const appTitle = document.querySelector("header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // 1. Check if user is scrolling down and has scrolled past a small buffer (e.g., 10px)
  if (currentScrollY > lastScrollY && currentScrollY > 75) {
    appTitle.classList.add("is_hidden--top");
    navbar.classList.add("is_hidden--bottom");
  }
  // 2. User is scrolling up
  else if (currentScrollY < lastScrollY) {
    appTitle.classList.remove("is_hidden--top");
    navbar.classList.remove("is_hidden--bottom");
  }

  // Update the last scroll position
  lastScrollY = currentScrollY;
});

// BOOKMARKS

// const questCards = document.querySelectorAll(".quest-card");
// const bookMarks = document.querySelectorAll(".fav-checkbox");

// questCards.forEach((questCard) => {
//   // console.log(questCard.checked);
// });

// bookMarks.forEach((bookMark) => {
//   bookMark.addEventListener("click", () => {
//     console.log(index);
//   });
// });

// DYNAMISCHE ID/FOR BOOKMARKS

const QuestionCards = document.querySelectorAll(".quest-card");

QuestionCards.forEach((questionCard, index) => {
  const inputEl = questionCard.querySelector("[data-js='bookmark-checkbox']");
  const labelEl = questionCard.querySelector('[data-js="bookmark-label"]');
  const headerEl = questionCard.querySelector("h3");
  inputEl.setAttribute("id", `fav-${index + 1}`);
  labelEl.setAttribute("for", `fav-${index + 1}`);
  headerEl.textContent = ` #${index + 1}` + " " + `${headerEl.textContent}`;
  inputEl.addEventListener("click", () => {
    if (inputEl.checked) {
      inputEl.classList.add("faved");
    } else {
      inputEl.classList.remove("faved");
    }
  });
});
// ADD BTN
// RMV BTN
// EDT BTN
