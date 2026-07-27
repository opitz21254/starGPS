import { products, profiles } from "./domain.js";



function findProduct(productId) {
  return products.find((product) => product.id === productId);
}

function unassignedProducts(customer) {
  return products.filter((product) => !customer.inbox.includes(product.id));
}

function renderCustomers() {
  const customerContainer = document.getElementById("customerList");
  customerContainer.replaceChildren();

  profiles.forEach((customer, index) => {
    const column = document.createElement("section");
    column.className = "column";
    column.id = `column${index + 1}`;

    column.appendChild(renderCustomerLabel(customer));

    customer.inbox.forEach((productId) => {
      column.appendChild(renderSingleProduct(productId));
    });

    customerContainer.appendChild(column);
  });
}

function renderCustomerLabel(customer) {
  const label = document.createElement("div");
  label.className = "sem-txt-box";

  const customerTextLabel = document.createElement("div");
  customerTextLabel.className = "course-top-txt";

  const heading = document.createElement("h3");
  heading.textContent = customer.label;
  customerTextLabel.appendChild(heading);
  label.appendChild(customerTextLabel);

  const customerImageLabel = document.createElement("div");
  customerImageLabel.className = "course-top-img";

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "caret-btn";
  addButton.setAttribute("aria-label", `Add product to ${customer.label}'s inbox`);
  addButton.addEventListener("click", () => addProductToInbox(customer));

  const plusIcon = document.createElement("img");
  plusIcon.src = "images/plus-sign.svg";
  plusIcon.className = "plus-icon";
  plusIcon.alt = "";
  addButton.appendChild(plusIcon);

  customerImageLabel.appendChild(addButton);
  label.appendChild(customerImageLabel);

  return label;
}

function renderSingleProduct(productId) {
  const card = document.createElement("div");
  card.className = "white-sem-txt";

  const product = findProduct(productId);

  const title = document.createElement("h2");
  title.className = "course-info";
  title.textContent = product ? product.title : productId;
  card.appendChild(title);

  const description = document.createElement("p");
  description.className = "course-info";
  description.textContent = product
    ? `${product.description} $${product.price}`
    : "";
  card.appendChild(description);

  return card;
}

function addProductToInbox(customer) {
  const available = unassignedProducts(customer);
  if (available.length === 0) {
    alert(`${customer.label} already has every product in their inbox.`);
    return;
  }

  const menu = available
    .map((product, index) => `${index + 1}. ${product.title} ($${product.price})`)
    .join("\n");
  const answer = prompt(
    `Add a product to ${customer.label}'s inbox.\nEnter a number:\n\n${menu}`
  );
  if (answer === null) return;

  const choice = Number(answer.trim());
  if (!Number.isInteger(choice) || choice < 1 || choice > available.length) {
    alert("Please enter one of the listed numbers.");
    return;
  }

  customer.inbox.push(available[choice - 1].id);
  renderCustomers();
}

renderCustomers();
