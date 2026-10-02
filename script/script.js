// SCROLL BEHAVIOUR - KI

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

// SHOW ANSWER BTN

const buttons = document.querySelectorAll(".answer-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".quest-card");
    const answerContainer = card.querySelector('[data-js="answerWrapper"]');

    if (answerContainer) {
      answerContainer.classList.toggle("hidden");
      const isHidden = answerContainer.classList.contains("hidden");
      button.textContent = isHidden ? "Show answer" : "Hide answer";
    }
  });
});

// DYNAMISCHE ID/FOR BOOKMARKS STARTSEITE

const QuestionCards = document.querySelectorAll(".quest-card");

QuestionCards.forEach((questionCard, index) => {
  const inputEl = questionCard.querySelector("[data-js='bookmark-checkbox']");
  const labelEl = questionCard.querySelector('[data-js="bookmark-label"]');
  const headerEl = questionCard.querySelector("h3");

  inputEl.setAttribute("id", `fav-${index + 1}`);
  labelEl.setAttribute("for", `fav-${index + 1}`);
  headerEl.textContent = `#${index + 1}` + " " + `${headerEl.textContent}`;

  inputEl.addEventListener("click", () => {
    if (inputEl.checked) {
      inputEl.classList.add("faved");
    } else {
      inputEl.classList.remove("faved");
    }
  });
});

// ADDBTN

const form = document.querySelector('[data-js="form"]');
const questionContainer = document.querySelector(
  '[data-js="questionContainer"]',
);
const answerInput = document.querySelector('[data-js="answerInput"]');
const questionInput = document.querySelector('[data-js="questionInput"]');
const tagInput = document.querySelector('[data-js="tagInput"]');
const charLeftQuest = document.querySelector('[data-js="charLeftQuest"]');
const charLeftAnswer = document.querySelector('[data-js="charLeftAnswer"]');

let charLeftQuestStartLenght = questionInput.value.length;
let charLeftAnswerStartLenght = answerInput.value.length;

charLeftQuest.textContent =
  `${150 - charLeftQuestStartLenght}` + " charakters left.";

charLeftAnswer.textContent =
  `${150 - charLeftAnswerStartLenght}` + " charakters left.";

// CHARACTER LEFT

questionInput.addEventListener("input", () => {
  const questionInputValue = questionInput.value.length;
  const questionInputMaxLenght = questionInput.maxLength;
  charLeftQuest.textContent =
    `${questionInputMaxLenght - questionInputValue}` + " charakters left.";
  if (questionInputValue === questionInputMaxLenght) {
    charLeftQuest.style.color = "#ff6e6e";
  } else {
    charLeftQuest.style.color = "";
  }
});
answerInput.addEventListener("input", () => {
  const answerInputValue = answerInput.value.length;
  const answerInputMaxLenght = answerInput.maxLength;
  charLeftAnswer.textContent =
    `${answerInputMaxLenght - answerInputValue}` + " charakters left.";
  if (answerInputValue === answerInputMaxLenght) {
    charLeftAnswer.style.color = "#ff6e6e";
  } else {
    charLeftAnswer.style.color = "";
  }
});

// QUESTIONCARD ERSTELLEN

let cardCounter = 0;

function createCard() {
  cardCounter++;

  // DEFINE CONTENT
  const newCard = document.createElement("article");
  newCard.classList.add("quest-card");

  const wrapper = document.createElement("div");
  wrapper.classList.add("quest-card-wrapper-FAQ");

  const heading = document.createElement("h3");
  heading.textContent = `#${cardCounter} ` + questionInput.value;

  const answerWrapper = document.createElement("div");
  answerWrapper.classList.add("quest-card-answer-wrapper", "hidden");
  answerWrapper.setAttribute("data-js", "answerWrapper");

  const answerParagraph = document.createElement("p");
  answerParagraph.textContent = answerInput.value;
  answerWrapper.append(answerParagraph);

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("answer-btn");
  button.textContent = "Show answer";

  const tagList = document.createElement("ul");
  tagList.classList.add("tagList");

  const tagItem = document.createElement("li");
  tagItem.classList.add("tag");
  tagItem.textContent = tagInput.value;
  tagList.append(tagItem);

  const inputEl = document.createElement("input");
  inputEl.type = "checkbox";
  inputEl.classList.add("fav-checkbox");
  inputEl.setAttribute("data-js", "bookmark-checkbox");
  inputEl.id = `fav-${cardCounter}`;

  const labelEl = document.createElement("label");
  labelEl.classList.add("fav-icon-label");
  labelEl.setAttribute("data-js", "bookmark-label");
  labelEl.setAttribute("aria-label", "Frage als Favorit speichern");
  labelEl.htmlFor = `fav-${cardCounter}`;

  labelEl.innerHTML = `
    <svg xmlns="http://w3.org" height="50px" viewBox="0 -960 960 960" width="50px">
      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z"></path>
    </svg>
  `;

  // BOOKMARK EVENT
  inputEl.addEventListener("click", () => {
    if (inputEl.checked) {
      inputEl.classList.add("faved");
    } else {
      inputEl.classList.remove("faved");
    }
  });

  // ANSWER BTN EVENT
  button.addEventListener("click", () => {
    answerWrapper.classList.toggle("hidden");
    button.textContent = answerWrapper.classList.contains("hidden")
      ? "Show answer"
      : "Hide answer";
  });

  // WRAPPER BAUEN
  wrapper.append(tagList, heading, answerWrapper, button);

  // NEWCARD BAUEN
  newCard.prepend(wrapper, inputEl, labelEl);
  questionContainer.prepend(newCard);
}

// FORM ADD

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formElements = e.target.elements;
  const formValues = {
    questionValue: formElements.questionInput.value,
    answerValue: formElements.answerInput.value,
    tagValue: formElements.tagInput.value,
  };

  console.log(formValues);
  createCard();
  form.reset();
});
