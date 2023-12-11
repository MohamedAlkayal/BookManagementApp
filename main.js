// DOM elements
//// Book count view:
var countView = document.getElementsByClassName("book-count")[0];
var countInp = document.getElementsByName("bookCount")[0];
var countBtn = document.getElementById("countBtn");
var countValid = document.getElementById("countInvalid");
//// Book info view:
var infoView = document.getElementsByClassName("book-info")[0];
var infoTitle = document.getElementById("bookInfoTitle");
var progress = document.getElementsByClassName("progress")[0];
var progressEnd = document.getElementsByClassName("progress-end")[0];
var titleInp = document.getElementsByName("bookName")[0];
var authorInp = document.getElementsByName("bookAuth")[0];
var pagesInp = document.getElementsByName("bookPages")[0];
var catInp = document.getElementsByName("bookCat")[0];
var infoBtn = document.getElementById("infoBtn");
var infoSkipBtn = document.getElementById("infoSkipBtn");
var infoInvalid = document.getElementById("infoInvalid");
//// Book gallery view:
var listView = document.getElementsByClassName("book-list")[0];

// Book constructor
function Book(t, a, p, c) {
  this.bookTitle = t;
  this.bookAuth = a;
  this.bookPages = p;
  this.bookCat = c;
}

// Book-related variables
var bookCount;
var bookArr = [];
var clickCount = 0;
var textRegex = /^[A-Za-z\s'.-]+$/;

// Event listeners
countBtn.addEventListener("click", handleCountBtn);
infoBtn.addEventListener("click", handleInfoBtn);
infoSkipBtn.addEventListener("click", handleInfoSkipBtn);

// Event listeners functions
function handleCountBtn() {
  if (handelCountValidation()) {
    bookCount = countInp.value;
    updateBookInfoTitle();
    hideElement(countView);
    showElement(infoView);
  }
}

function handleInfoBtn() {
  resetInputValidity();
  if (handelInfoValidation()) {
    createNewBook();
    clearInputFields();
    clickCount++;
    updateBookInfoTitle();
    progress.style.width = `calc(${(clickCount / bookCount) * 100}%)`;
    if (clickCount == bookCount) {
      progressEnd.style.width = "100%";
      createBookList();
      setTimeout(() => {
        hideElement(infoView);
        showElement(listView);
      }, 900);
    }
  }
}

function handleInfoSkipBtn() {
  clearInputFields();
  progressEnd.style.width = "100%";
  createBookList();
  setTimeout(() => {
    hideElement(infoView);
    showElement(listView);
  }, 900);
}

// Validation functions
function handelCountValidation() {
  if (countInp.value === "" || countInp.value > 6) {
    countInp.style.outline = "1px solid red";
    countValid.style.visibility = "visible";
    return false;
  } else {
    return true;
  }
}

function handelInfoValidation() {
  if (titleInp.value === "" || isFinite(titleInp.value)) {
    titleInp.classList.add("invalid");
    infoInvalid.style.visibility = "visible";
    infoInvalid.innerText = "Please enter a valid book title";
    return false;
  } else if (!textRegex.test(authorInp.value)) {
    authorInp.classList.add("invalid");
    infoInvalid.style.visibility = "visible";

    infoInvalid.innerText = "Please enter a valid author name";
    return false;
  } else if (isNaN(pagesInp.value) || pagesInp.value === "") {
    pagesInp.classList.add("invalid");
    infoInvalid.style.visibility = "visible";

    infoInvalid.innerText = "Please enter valid page number";
    return false;
  } else if (!textRegex.test(catInp.value)) {
    catInp.classList.add("invalid");
    infoInvalid.style.visibility = "visible";

    infoInvalid.innerText = "Please enter a valid book category";
    return false;
  } else {
    return true;
  }
}

function clearInputFields() {
  titleInp.value = "";
  authorInp.value = "";
  pagesInp.value = "";
  catInp.value = "";
}

function resetInputValidity() {
  titleInp.classList.remove("invalid");
  authorInp.classList.remove("invalid");
  pagesInp.classList.remove("invalid");
  catInp.classList.remove("invalid");
  infoInvalid.style.visibility = "hidden";
}

// Helper functions
function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "flex";
}

function createNewBook() {
  var newBook = new Book(
    titleInp.value,
    authorInp.value,
    pagesInp.value,
    catInp.value
  );
  bookArr.push(newBook);
}

function updateBookInfoTitle() {
  if (clickCount + 1 <= bookCount) {
    infoTitle.innerHTML = `📚 Enter book ( ${clickCount + 1} / ${bookCount} )`;
  } else {
    infoTitle.innerHTML = `📚 Enter book ✅`;
  }
}

// Creating book list

function createBookList() {
  for (var i = 0; i < bookArr.length; i++) {
    var book = document.createElement("div");
    book.classList.add("book");
    (function () {
      for (var key in bookArr[i]) {
        var data = document.createElement("div");
        data.classList.add("book-data");
        if (key == "bookCat") {
          data.classList.add("book-cat");
        }
        data.innerText = bookArr[i][key];
        book.append(data);
      }
    })();
    listView.append(book);
  }
}
