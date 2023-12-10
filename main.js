// DOM elements
var bookCountView = document.getElementsByClassName("book-count")[0];
var bookCounInp = document.getElementById("bookCount");
var countBtn = document.getElementById("countBtn");
var countInvalid = document.getElementById("bookCountInvalid");
var bookInfoView = document.getElementsByClassName("book-info")[0];
var bookInfoTitle = document.getElementById("bookInfoTitle");
var infoBtn = document.getElementById("infoBtn");
var bookNameInp = document.getElementsByName("bookName")[0];
var bookAuthInp = document.getElementsByName("bookAuth")[0];
var bookAuthMailInp = document.getElementsByName("bookAuthEmail")[0];
var bookPriceInp = document.getElementsByName("bookPrice")[0];
var bookTableView = document.getElementsByClassName("book-table")[0];
var bookTableBody = document.getElementsByTagName("tbody")[0];

// Book-related variables
var bookCountNo;
var bookArr = [];
var addCount = 0;
var nameRegex = /^[A-Za-z\s'.-]+$/;
var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Event listeners
countBtn.addEventListener("click", handleCountBtn);
infoBtn.addEventListener("click", handleInfoBtn);

// Event listeners functions
function handleCountBtn() {
  if (bookCounInp.value === "" || bookCounInp.value > 6) {
    displayCountError();
  } else {
    bookCountNo = bookCounInp.value;
    hideElement(bookCountView);
    showElement(bookInfoView);
  }
}

function handleInfoBtn() {
  resetInputValidity();

  if (isInvalidBookInfo()) {
    handleInvalidBookInfo();
  } else {
    handleValidBookInfo();
  }
}

// Helper functions
function displayCountError() {
  bookCounInp.style.outline = "1px solid red";
  countInvalid.style.visibility = "visible";
}

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "flex";
}

function resetInputValidity() {
  bookNameInp.classList.remove("invalid");
  bookAuthInp.classList.remove("invalid");
  bookAuthMailInp.classList.remove("invalid");
  bookPriceInp.classList.remove("invalid");
}

function isInvalidBookInfo() {
  return (
    bookNameInp.value === "" ||
    isFinite(bookNameInp.value) ||
    !nameRegex.test(bookAuthInp.value) ||
    !emailRegex.test(bookAuthMailInp.value) ||
    bookPriceInp.value === "" ||
    isNaN(bookPriceInp.value)
  );
}

function handleInvalidBookInfo() {
  bookNameInp.classList.add("invalid");
}

function handleValidBookInfo() {
  bookArr.push(
    new Book(
      bookNameInp.value,
      bookAuthInp.value,
      bookAuthMailInp.value,
      bookPriceInp.value
    )
  );
  addCount++;
  updateBookInfoTitle();
  clearInputFields();

  if (addCount == bookCountNo) {
    displayBookTable();
  }
}

function updateBookInfoTitle() {
  bookInfoTitle.innerHTML = `Enter book ${addCount + 1} details`;
}

function clearInputFields() {
  bookNameInp.value = "";
  bookAuthInp.value = "";
  bookAuthMailInp.value = "";
  bookPriceInp.value = "";
}

function displayBookTable() {
  for (var n = 0; n < bookArr.length; n++) {
    var tr = createTableRow(bookArr[n]);
    createEditAndDeleteButtons(tr, n);
    addTableRowToTableBody(tr);
    addDeleteButtonListener(delBtn, tr, n);
    addEditButtonListener(editBtn, tr);
  }

  hideElement(bookInfoView);
  showElement(bookTableView);
}

function createTableRow(book) {
  var tr = document.createElement("tr");
  for (var key in book) {
    var td = document.createElement("td");
    td.innerHTML = book[key];
    tr.append(td);
  }
  return tr;
}

function createEditAndDeleteButtons(tr, n) {
  edit = document.createElement("td");
  editBtn = createButton("Edit");
  del = document.createElement("td");
  delBtn = createButton("Delete");
  editBtn.classList.add("btn");
  delBtn.classList.add("btn");
  edit.append(editBtn);
  del.append(delBtn);
  tr.append(edit);
  tr.append(del);
}

function createButton(text) {
  var button = document.createElement("button");
  button.innerHTML = text;
  return button;
}

function addTableRowToTableBody(tr) {
  bookTableBody.append(tr);
}

function addDeleteButtonListener(delBtn, tr, n) {
  delBtn.addEventListener("click", function () {
    bookArr.splice(n, 1);
    tr.remove();
    console.log(bookArr);
  });
}

function addEditButtonListener(editBtn, tr) {
  editBtn.addEventListener("click", function () {
    toggleEditButtonState(editBtn, tr);
  });
}

function toggleEditButtonState(editBtn, tr) {
  if (editBtn.innerHTML === "Edit") {
    editBtn.innerHTML = "Done";
    editTableRow(tr);
  } else {
    editBtn.innerHTML = "Edit";
    updateTableRow(tr);
  }
}

function editTableRow(tr) {
  for (var k = 0; k < tr.children.length - 2; k++) {
    var currentVal = tr.children[k].innerHTML;
    tr.children[k].innerHTML = `<input type="text" value=${currentVal} />`;
  }
}

function updateTableRow(tr) {
  for (var x = 0; x < tr.children.length - 2; x++) {
    var currentVal = tr.children[x].firstChild.value;
    tr.children[x].innerHTML = currentVal;
  }
}

// Book constructor
function Book(n, a, m, p) {
  this.bookName = n;
  this.bookAuth = a;
  this.authMail = m;
  this.bookPrice = p;
}
