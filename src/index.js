import { btnOpenModal, closeModal } from "./js/variables.js";
import { getData } from "./js/firebase.js";
import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

btnOpenModal.addEventListener("click", () => {
  modalBlock.classList.add("d-block");
  getData();
});

closeModal.addEventListener("click", () => {
  modalBlock.classList.remove("d-block");
});
