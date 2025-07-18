const addButton = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const confirm = document.querySelector(".confirm");
const cancel = document.querySelector(".cancel");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");
const table = document.querySelector(".table");
const refresh = document.querySelector(".refresh");
const myLibrary = [];
//loop through myLibrary and refresh the disply table.
refresh.addEventListener("click", () => {
  displayBooks(myLibrary);
});
function displayBooks(arr) {
  while (table.children[1]) {
    console.log(table.children[1]);
    table.removeChild(table.children[1]);
  }
  for (let v of arr) {
    addItem(v, arr);
  }
}
//dialog control
addButton.addEventListener("click", () => {
  dialog.showModal();
});
cancel.addEventListener("click", () => {
  dialog.close();
  clearValue();
});
confirm.addEventListener("click", () => {
  if (bookTitle.value) dialog.close();
  else {
    return;
  }
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.value === "notread" ? false : true,
  );
  clearValue();
  addItem(myLibrary[myLibrary.length - 1], myLibrary);
});
function clearValue() {
  bookRead.value = "read";
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
}
//Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.UUID = crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
  };
}
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}
//take and object then append the item on the table
function addItem(v, arr) {
  const item = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const status = document.createElement("input");
  const statusDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const deleteBtnDiv = document.createElement("div");
  title.textContent = v.title;
  author.textContent = v.author;
  pages.textContent = v.pages;
  status.addEventListener("click", () => (v.read = v.read ? false : true));
  status.type = "checkbox";
  if (v.read) status.checked = true;
  else {
    status.checked = false;
  }
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    item.remove();
    arr.splice(
      arr.findIndex((value) => value.UUID === v.uuid),
      1,
    );
  });
  statusDiv.appendChild(status);
  deleteBtnDiv.appendChild(deleteBtn);
  item.setAttribute("data-uuid", v.UUID);
  item.append(title, author, pages, statusDiv, deleteBtnDiv);
  table.appendChild(item);
}
