const addButton = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const confirm = document.querySelector(".confirm");
const cancel = document.querySelector(".cancel");
const table = document.querySelector(".table");
const refresh = document.querySelector(".refresh");
const myLibrary = [];
//loop through myLibrary and refresh the disply table.
refresh.addEventListener("click", () => {
  displayBooks(myLibrary);
});
function displayBooks(arr) {
  while (table.children[1]) {
    table.removeChild(table.children[1]);
  }
  for (let v of arr) {
    domAddItem(v);
  }
}
//dialog control
addButton.addEventListener("click", () => {
  dialog.showModal();
});
cancel.addEventListener("click", () => {
  dialog.close();
  document.forms[0].reset();
});
confirm.addEventListener("click", () => {
  // require only title
  const bookTitle = document.querySelector("#title");
  const bookAuthor = document.querySelector("#author");
  const bookPages = document.querySelector("#pages");
  const bookRead = document.querySelector("#read");
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
  document.forms[0].reset();
  domAddItem(myLibrary[myLibrary.length - 1]);
});

//Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.UUID = crypto.randomUUID();
}
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
};
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}
//take and object then append the item on the table
function domAddItem(v) {
  const item = document.createElement("div");
  const title = document.createElement("div");
  const pages = document.createElement("div");
  const author = document.createElement("div");
  const status = document.createElement("input");
  const statusDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const deleteBtnDiv = document.createElement("div");
  title.textContent = v.title;
  author.textContent = v.author;
  pages.textContent = v.pages;
  deleteBtn.textContent = "Delete";
  status.addEventListener("click", () => (v.read = v.read ? false : true));
  status.type = "checkbox";
  if (v.read) status.checked = true;
  else {
    status.checked = false;
  }
  statusDiv.appendChild(status);
  deleteBtnDiv.appendChild(deleteBtn);
  deleteBtn.setAttribute("data-uuid", v.UUID);
  item.append(title, author, pages, statusDiv, deleteBtnDiv);
  table.appendChild(item);
}
table.addEventListener("click", (e) => {
  deleteItem(e, myLibrary);
});

function deleteItem(e, arr) {
  if (e.target.getAttribute("data-uuid")) {
    arr.splice(
      arr.findIndex(
        (value) => value.UUID === e.target.getAttribute("data-uuid"),
      ),
      1,
    );
    e.target.parentElement.parentElement.remove();
  } else {
    return;
  }
}
