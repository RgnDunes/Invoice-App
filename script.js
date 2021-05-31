var customersData = [];
var invoicesData = [];
var itemsData = [];

function sendCustomersData() {
  var customerDataLength = customersData.length;
  let tr_s =
    "<tr><th>NAME</th><th>PHONE</th><th>EMAIL</th><th>CREATED ON</th></tr>";
  for (var i = 0; i < customerDataLength; i++) {
    tr_s +=
      "<tr><td>" +
      customersData[i]["name"] +
      "</td><td>" +
      customersData[i]["phone"] +
      "</td><td>" +
      customersData[i]["email"] +
      "</td><td>" +
      customersData[i]["date"] +
      "</td></tr>";
  }
  var table = document.getElementsByClassName("table__customers")[0];
  table.innerHTML = tr_s;
}

function sendItemsData() {
  var itemDataLength = itemsData.length;
  let tr_s =
    "<tr><th>NAME</th><th>DESCRIPTION</th><th>PRICE</th><th>ADDED ON</th></tr>";
  for (var i = 0; i < itemDataLength; i++) {
    tr_s +=
      "<tr><td>" +
      itemsData[i]["name"] +
      "</td><td>" +
      itemsData[i]["description"] +
      "</td><td>" +
      itemsData[i]["price"] +
      "</td><td>" +
      itemsData[i]["added_on"] +
      "</td></tr>";
  }
  var table = document.getElementsByClassName("table__items")[0];
  table.innerHTML = tr_s;
}

function sendInvoicesData() {
  var invoiceDataLength = invoicesData.length;
  let tr_s =
    "<tr><th>DATE</th><th>CUSTOMER</th><th>NUMBER</th><th>PAID STATUS</th><th>AMOUNT</th><th>AMOUNT DUE</th></tr>";
  for (var i = 0; i < invoiceDataLength; i++) {
    tr_s +=
      "<tr><td>" +
      invoicesData[i]["date"] +
      "</td><td>" +
      invoicesData[i]["customer"] +
      "</td><td>" +
      invoicesData[i]["invoice_no"] +
      "</td><td>" +
      invoicesData[i]["paid_status"] +
      "</td><td>" +
      invoicesData[i]["amount"] +
      "</td><td>" +
      "</td><td>" +
      invoicesData[i]["amount_due"] +
      "</td></tr>";
  }
  var table = document.getElementsByClassName("table__invoices")[0];
  table.innerHTML = tr_s;
}

(async function fetchData() {
  await fetch("customers.json")
    .then((response) => response.json())
    .then((json) => (customersData = json));

  await fetch("items.json")
    .then((response) => response.json())
    .then((json) => (itemsData = json));

  await fetch("invoices.json")
    .then((response) => response.json())
    .then((json) => (invoicesData = json));

  sendCustomersData();
  sendItemsData();
  sendInvoicesData();
})();

var customerClicked = true;
var itemsClicked = false;
var invoicesClicked = false;

var customerDisplay = document.getElementsByClassName("customer")[0];
var itemDisplay = document.getElementsByClassName("items")[0];
var invoiceDisplay = document.getElementsByClassName("invoices")[0];

function customerRoute() {
  customerDisplay.style.display = "block";
  itemDisplay.style.display = "none";
  invoiceDisplay.style.display = "none";
}

function itemRoute() {
  console.log("ITEM ROUTE");
  customerDisplay.style.display = "none";
  itemDisplay.style.display = "block";
  invoiceDisplay.style.display = "none";
}

function invoiceRoute() {
  customerDisplay.style.display = "none";
  itemDisplay.style.display = "none";
  invoiceDisplay.style.display = "block";
}

var newCustomerShow = false;
var newItemShow = false;
var newInvoiceShow = false;

function newCustomer() {
  newCustomerShow = !newCustomerShow;
  var addCustomerCSS = document.getElementsByClassName("newCustomer");
  if (newCustomerShow) {
    addCustomerCSS[0].style.display = "block";
  } else {
    addCustomerCSS[0].style.display = "none";
  }
}

function newItem() {
  newItemShow = !newItemShow;
  var addItemCSS = document.getElementsByClassName("newItem");
  if (newItemShow) {
    addItemCSS[0].style.display = "block";
  } else {
    addItemCSS[0].style.display = "none";
  }
}

function newInvoice() {
  newInvoiceShow = !newInvoiceShow;
  var addInvoiceCSS = document.getElementsByClassName("newInvoice");
  if (newInvoiceShow) {
    addInvoiceCSS[0].style.display = "block";
  } else {
    addInvoiceCSS[0].style.display = "none";
  }
}
