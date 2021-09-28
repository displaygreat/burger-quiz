import { btnOpenModal, closeModal } from "./variables.js";
import { getData } from "./firebase.js";

btnOpenModal.addEventListener("click", () => {
  modalBlock.classList.add("d-block");
  getData();
});

closeModal.addEventListener("click", () => {
  modalBlock.classList.remove("d-block");
});
