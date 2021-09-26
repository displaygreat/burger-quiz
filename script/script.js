import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  push,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

const btnOpenModal = document.querySelector("#btnOpenModal");
const modalBlock = document.querySelector("#modalBlock");
const closeModal = document.querySelector("#closeModal");
const questionTitle = document.querySelector("#question");
const formAnswers = document.querySelector("#formAnswers");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
// const burgerBtn = document.getElementById("burger-btn");
const sendBtn = document.getElementById("send");

const firebaseConfig = {
  apiKey: "AIzaSyDuiNUZF6Xn_-BsMjh-m33eMQd-havnxWc",
  authDomain: "burger-quiz-c3f4e.firebaseapp.com",
  databaseURL:
    "https://burger-quiz-c3f4e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "burger-quiz-c3f4e",
  storageBucket: "burger-quiz-c3f4e.appspot.com",
  messagingSenderId: "462040911843",
  appId: "1:462040911843:web:ea373c50cfa6515d825ad6",
  measurementId: "G-MV7Q4RJSF0",
};

const app = initializeApp(firebaseConfig);

const getData = () => {
  formAnswers.textContent = "LOAD";

  nextButton.classList.add("d-none");
  prevButton.classList.add("d-none");

  setTimeout(() => {
    const db = getDatabase();
    const questionsRef = ref(db, "/questions/");

    //Read data once with get()
    get(questionsRef)
      .then((snapshots) => {
        if (snapshots.exists()) {
          playTest(snapshots.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 2000);

  //get question from questions.json
  // setTimeout(() => {
  //   fetch("./questions.json")
  //     .then((res) => res.json())
  //     .then((data) => playTest(data.questions))
  //     .catch((err) => {
  //       formAnswers.textContent = "Server error";
  //       console.log(err);
  //     });
  // }, 2000);
};

// if (document.documentElement.clientWidth < 768) {
//   burgerBtn.style.display = "flex";
// } else {
//   burgerBtn.style.display = "none";
// }

// window.addEventListener("resize", () => {
//   if (document.documentElement.clientWidth < 768) {
//     burgerBtn.style.display = "flex";
//   } else {
//     burgerBtn.style.display = "none";
//   }
// });

btnOpenModal.addEventListener("click", () => {
  modalBlock.classList.add("d-block");
  getData();
});

closeModal.addEventListener("click", () => {
  modalBlock.classList.remove("d-block");
});

const playTest = (questions) => {
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
    const db = getDatabase();
    const questionsRef = ref(db, "/contacts/");
    push(questionsRef, finalAnswers);
  };
};
