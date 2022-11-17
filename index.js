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

//to get the form inputs  and display books
const newBook = document.querySelector(".add");
newBook.addEventListener("click", function () {
  renderLibrary(true);
});

// to render myLibrary []
function renderLibrary(addNewBookBool) {
  // to clear content /child elemnts of library container before rendering from the mylibrary array
  removeChilElements(library);

  //  if a new book has been added , the fun creates a book object
  // else if the delete btn waas clicked we just render books from myLibrary []
  if (addNewBookBool) {
    createNewBookObject();
  }
  //  create new elemwnts and appened them to the library container
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
    btn.textContent = "X";
    read.textContent = "read " + myLibrary[i].isRead;

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
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let isRead = document.getElementById("isRead").value;

  const book = new Book(title, author, isRead);
  addBookToLibrary(book);
}
//to push the book to the library [].
function addBookToLibrary(book) {
  book.index = myLibrary.length;
  myLibrary.push(book);
}
