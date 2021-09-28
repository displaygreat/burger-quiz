import { formAnswers, nextButton, prevButton } from "./variables.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push } from "firebase/database";
import { playTest } from "./quiz.js";

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

export const getData = () => {
  formAnswers.textContent = "LOAD";

  nextButton.classList.add("d-none");
  prevButton.classList.add("d-none");

  const db = getDatabase();
  const questionsRef = ref(db, "/questions/");

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
};

export const sendData = (answers) => {
  const db = getDatabase();
  const contactsRef = ref(db, "/contacts/");
  push(contactsRef, answers);
};
