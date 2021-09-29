import {
  modalBlock,
  questionTitle,
  formAnswers,
  nextButton,
  prevButton,
  sendBtn,
} from "./variables.js";

import { sendData } from "./firebase.js";

export const playTest = (questions) => {
  const finalAnswers = [];
  let numberQuestions = 0;

  const renderAnswer = (index) => {
    questions[index].answers.forEach((answer) => {
      const answerItem = document.createElement("div");
      answerItem.classList.add(
        "answers-item",
        "d-flex",
        "justify-content-center"
      );
      answerItem.innerHTML = `
        <input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none" value="${answer.title}">
        <label for="${answer.id}" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src="${answer.url}" alt="burger">
          <span class="answerText">${answer.title}</span>
        </label>
      `;
      formAnswers.appendChild(answerItem);
    });
  };

  const renderQuestions = (indexQuestion) => {
    formAnswers.innerHTML = "";

    switch (true) {
      case numberQuestions === 0:
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswer(indexQuestion);
        nextButton.classList.remove("d-none");
        sendBtn.classList.add("d-none");
        prevButton.classList.add("d-none");
        break;

      case numberQuestions > 0 && numberQuestions <= questions.length - 1:
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswer(indexQuestion);
        prevButton.classList.remove("d-none");
        break;

      case numberQuestions === questions.length:
        questionTitle.textContent = "";
        nextButton.classList.add("d-none");
        prevButton.classList.add("d-none");
        sendBtn.classList.remove("d-none");
        sendBtn.classList.remove("invisible");
        formAnswers.innerHTML = `
          <div class="form-group text-center">
            <label for="phoneNumber">Enter your phone number</label>
            <input type="phone" class="form-control" id="phoneNumber">
          </div>
        `;
        break;

      case numberQuestions === questions.length + 1:
        questionTitle.textContent = "";
        sendBtn.classList.add("invisible");
        formAnswers.textContent = "Thank you for taking the quiz!";
        setTimeout(() => {
          modalBlock.classList.remove("d-block");
        }, 2000);
        break;
    }
  };
  renderQuestions(numberQuestions);

  const checkAnswers = () => {
    const obj = {};
    const inputs = [...formAnswers.elements].filter(
      (input) => input.checked || input.id === "phoneNumber"
    );
    inputs.forEach((input, index) => {
      if (numberQuestions >= 0 && numberQuestions <= questions.length - 1) {
        obj[`${index}_${questions[numberQuestions].question}`] = input.value;
      }
      console.log(numberQuestions === questions.length);
      if (numberQuestions === questions.length) {
        console.log(input.value);
        obj["Phone number"] = input.value;
      }
    });
    finalAnswers.push(obj);
    console.log(finalAnswers);
  };

  nextButton.onclick = () => {
    checkAnswers();
    numberQuestions++;
    renderQuestions(numberQuestions);
  };
  prevButton.onclick = () => {
    numberQuestions--;
    renderQuestions(numberQuestions);
  };
  sendBtn.onclick = () => {
    checkAnswers();
    numberQuestions++;
    renderQuestions(numberQuestions);
    sendData(finalAnswers);
  };
};
