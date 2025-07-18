const addButton = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const confirm = document.querySelector(".confirm");
const cancel = document.querySelector(".cancel");

addButton.addEventListener("click", () => {
  dialog.showModal();
});
const myLibrary = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
  };
}
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
}
function displayBooks(arr) {}
