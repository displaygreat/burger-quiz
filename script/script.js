const btnOpenModal = document.querySelector("#btnOpenModal");
const modalBlock = document.querySelector("#modalBlock");
const closeModal = document.querySelector("#closeModal");
const questionTitle = document.querySelector("#question");
const formAnswers = document.querySelector("#formAnswers");
const answerImg = document.querySelector(".answerImg");
const answerText = document.querySelector(".answerText");

btnOpenModal.addEventListener("click", () => {
  modalBlock.classList.add("d-block");
  playTest();
});

closeModal.addEventListener("click", () => {
  modalBlock.classList.remove("d-block");
});
const playTest = () => {
  const renderQuestions = () => {
    questionTitle.textContent = "What burger color do you want?";

    const [nameStandart, imgStandart] = ["Standart", "./image/burger.png"];
    const [nameBlack, imgBlack] = ["Black", "./image/burgerBlack.png"];

    formAnswers.innerHTML = `
    <div class="answers-item d-flex flex-column">
      <input type="radio" id="answerItem1" name="answer" class="d-none">
      <label for="answerItem1" class="d-flex flex-column justify-content-between">
        <img class="answerImg" src="${imgStandart}" alt="burger">
        <span class="answerText">${nameStandart}</span>
      </label>
    </div>
    <div class="answers-item d-flex justify-content-center">
      <input type="radio" id="answerItem2" name="answer" class="d-none">
      <label for="answerItem2" class="d-flex flex-column justify-content-between">
        <img class="answerImg" src="${imgBlack}" alt="burger">
        <span>${nameBlack}</span>
      </label>
    </div>
  `;
  };
  renderQuestions();
};
