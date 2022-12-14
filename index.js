let myLibrary = [];

// Book object constructor
class Book {
  constructor(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.index;
  }
}

const library = document.querySelector(".library");
let title = document.getElementById("title");
let author = document.getElementById("author");
let isRead = document.getElementById("isRead");
let errorMessage = document.getElementById("error-message");

//to get the form inputs  and display books
const newBook = document.querySelector(".add");
newBook.addEventListener("click", function () {
  renderLibrary(true);
  title.value = "";
  author.value = "";
  isRead.value = "";
});

// to render myLibrary []
function renderLibrary(newBook) {
  // to clear content /child elemnts of library container before rendering from the mylibrary array
  removeChilElements(library);

  //  if a new book has been added , the function creates a book object
  // else if the delete btn was clicked we just render books from myLibrary []
  if (newBook) {
    createNewBookObject();
  }
  //  create new elements and appened them to the library container
  for (i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.className = "card";
    const btn = document.createElement("button");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const read = document.createElement("div");
    read.setAttribute("text", "checkbox");

    // Add textcontent
    btn.className = "delete ";
    author.textContent = "Author: " + myLibrary[i].author;
    btn.className += myLibrary[i].index;
    title.textContent = "Title: " + myLibrary[i].title;
    btn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    read.textContent = "Read: " + myLibrary[i].isRead;

    // append book info elemnts to the card contanier
    bookCard.appendChild(btn);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(read);
    //  and then append the card container to the library containar
    library.appendChild(bookCard);
  }

  document.querySelectorAll(".delete").forEach((item) => {
    item.addEventListener("click", () => {
      item.parentElement.remove();
      deleteBookFromLibrary(item.className);
    });
  });
}

// to delete book object from myLibrary []
function deleteBookFromLibrary(index) {
  console.log("++index", index);
  // to get te index from the class name of the card
  let indexToRemove = parseInt(index.at(-1));
  //  remove the book from myLibarary array
  myLibrary.splice(indexToRemove, 1);
  updateLibraryIndex();
  renderLibrary(false);
}

//  To update the index of books object
function updateLibraryIndex() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
  }
}

function removeChilElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//  to create new book object from the form  inputs
function createNewBookObject() {
  if (title.value === "" || author.value === "" || isRead.value === "")
    return (errorMessage.innerHTML = "Please fill in all fields");

  let bookTitle = title.value;
  let bookAuthor = author.value;
  let isBookRead = isRead.value;

  const book = new Book(bookTitle, bookAuthor, isBookRead);
  addBookToLibrary(book);
}

const theHobbit = new Book("The Hobbit", "J.R.R ", "Yes");
const theFoundation = new Book("The Foundation", "I.Assimov", "Yes");
const don = new Book("Don Quixote", "M. Cervantes", "No");

addBookToLibrary(theHobbit);
addBookToLibrary(theFoundation);
addBookToLibrary(don);

// to render books from myLibrary array
renderLibrary(false);

//to push the book to the library [].
function addBookToLibrary(book) {
  book.index = myLibrary.length;
  myLibrary.push(book);
}
