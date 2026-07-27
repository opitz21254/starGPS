import { countries } from "./domain.js";

const setupForm = () => {
  // Create Name Row
  const nameElement = document.createElement("div");
  nameElement.className = "air3-grid-container my-6x my-md-10x col-gap-4x";

  const firstName = renderTextField({
    name: "first-name",
    label: "First name",
    autocomplete: "given-name",
    wrapperClasses: ["span-6", "mt-3x"],
  });
  const lastName = renderTextField({
    name: "last-name",
    label: "Last name",
    autocomplete: "family-name",
    wrapperClasses: ["span-6", "mt-3x"],
  });
  nameElement.append(firstName, lastName);

  // Create Email Row - No "Parent Class" is needed
  const emailElement = renderTextField({
    name: "email",
    label: "Work email address",
    type: "email",
    autocomplete: "email",
    placeholder: "",
    wrapperClasses: ["mt-3x", "mt-md-6x"],
  });

  // Create Password Row
  const passwordElement = renderTextField({
    name: "password",
    label: "Password",
    type: "password",
    autocomplete: "password",
    placeholder: "",
    wrapperClasses: ["mt-3x", "mt-md-6x"],
  });

  // Create Country Row
  // const countryElement =

  // Create User Agreement Acknowledgement

  // Create "Create my account" button

  // Create "Apply as a Client" link

  const form = document.getElementById("signupForm-redesigned");
  form.replaceChildren(nameElement, emailElement, passwordElement);
};

function renderTextField({
  name,
  label,
  type,
  autocomplete,
  placeholder,
  wrapperClasses,
}) {
  const wrapper = document.createElement("div");
  addClasses(wrapper, wrapperClasses);

  const labelElement = document.createElement("label");
  labelElement.className = "mb-1x";
  labelElement.htmlFor = `${name}-input`;
  labelElement.textContent = label; // I need to add something to differentiate between the param "label" and the HTML keyword

  const inputWrapper = document.createElement("div");
  inputWrapper.className = "air3-input-group";

  const input = document.createElement("input");
  input.className = "air3-input";
  input.id = `${name}-input`;
  input.name = name;
  input.type = type;
  if (placeholder) input.placeholder = placeholder;

  inputWrapper.append(input);
  wrapper.append(labelElement, inputWrapper);
  return wrapper;
}


// const formElement = document.getElementById("signupForm-redesigned");
// formElement.addEventListener("submit", async (event) => {
  //   event.preventDefault();
  
  //   const nameInputElement = document.getElementById("projectName");
  //   await createClientOnApi(nameInputElement.value);
  
  //   await renderProjects();
  // });
  
  setupForm();


  function addClasses(element, classes) {
    for (let i = 0; i < classes.length; i++) {
      element.classList.add(classes[i]);
    }
  }