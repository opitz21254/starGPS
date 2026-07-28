import { countries } from "./domain.js";
import { createProfileOnApi } from "./service.js";

const setupForm = () => {
  const form = document.getElementById("signupForm-redesigned");
  form.replaceChildren();

  // Create Name Row
  const nameGroup = document.createElement("div");
  nameGroup.className = "air3-grid-container name-inputs col-gap-4x";
  stampScopedAttr(nameGroup);

  var { input: firstNameInput, textFieldGroup: firstName } = renderTextField({
    name: "first-name",
    label: "First name",
    autocomplete: "given-name",
    placeholder: "Jon",
    wrapperClasses: ["span-6", "mt-3x"],
  });
  var { input: lastNameInput, textFieldGroup: lastName } = renderTextField({
    name: "last-name",
    label: "Last name",
    autocomplete: "family-name",
    placeholder: "Doe",
    wrapperClasses: ["span-6", "mt-3x"],
  });
  nameGroup.append(firstName, lastName);
  form.appendChild(nameGroup);

  // Create Email Row - No "Parent Class" is needed
  var { input: emailInput, textFieldGroup: email } = renderTextField({
    name: "email",
    label: "Work email address",
    type: "email",
    autocomplete: "email",
    placeholder: "",
    wrapperClasses: ["mt-3x", "mt-md-6x"],
  });
  form.appendChild(email);

  // Create Password Row
  var { input: passwordInput, passwordGroup: password } = renderPasswordField({
    name: "password",
    label: "Password",
    type: "password",
    autocomplete: "password",
    placeholder: "Password (8 or more characters)",
    wrapperClasses: ["mt-3x", "mt-md-6x"],
  });
  form.appendChild(password);
  
  // Create Country Row
  //   const countryElement = renderCountryField({
    //     name: "country",
    //     label: "Country",
    //     autocomplete: "country",
    //     placeholder: "",
    //     wrapperClasses: ["mt-3x", "mt-md-6x", "mb-3x"],
  //   });
  
    const submitElement = renderSubmitButton();
    form.appendChild(submitElement);

  // Create User Agreement Acknowledgement
  //   const termsElement = renderTermsCheckbox();
  
  // Create "Create my account" button
  //   const submitElement = renderSubmitButton();
  
  // // Create "Apply as talent" / "Log In" links
  // const hatchElement = renderSignupTypeHatch();

//   const form = document.getElementById("signupForm-redesigned");
//   form.replaceChildren(
//     nameGroup,
//     email,
//     passwordGroup,
//     // countryElement,
//     // termsElement,
//     submitElement,
//     // hatchElement,
//   );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await createProfileOnApi({
      givenName: firstNameInput.value,
      familyName: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      //   country: countryElementInput.value,
      //   termsAccept: termsElementInput.checked,
      isGuide: true,
    });

    console.log("createProfileOnApi response:", response.status, response.ok);
  });
};

// //Create Name Row
//   const nameElement = document.createElement("div");
//   nameElement.className = "air3-grid-container name-inputs col-gap-4x";
//   stampScopedAttr(nameElement);

//   //Start Replace
//   const firstName = document.createElement("div");
//   addClasses(firstName, ["span-6", "mt-3x"]);
//   stampScopedAttr(firstName);

//   const firstNameLabel = renderLabelElement("first-name", "First name");

//   var {input: firstNameInput, inputWrapper: firstNameInputWrapper} = renderInputGroup({
//     name: "first-name",
//     type: "text",
//     autocomplete: "given-name",
//     placeholder: "Jon",
//   });

//   firstName.append(firstNameLabel, firstNameInputWrapper);

//   // Last Name
//   const lastName = document.createElement("div");
//   addClasses(lastName, ["span-6", "mt-3x"]);
//   stampScopedAttr(lastName);

//   const lastNameLabel = renderLabelElement("last-name", "Last name");

//   var {input: lastNameInput, inputWrapper: lastNameInputWrapper} = renderInputGroup({
//     name: "last-name",
//     type: "text",
//     autocomplete: "family-name",
//     placeholder: "Doe",
//   });

//   lastName.append(lastNameLabel, lastNameInputWrapper);

//   nameElement.append(firstName, lastName);
//   form.appendChild(nameElement);

//   //Create Email Row - No Parent Class is needed
//   const email = document.createElement("div");
//   addClasses(email, ["mt-3x", "mt-md-6x"]);
//   stampScopedAttr(email);

//   const emailLabel = renderLabelElement("email", "Work email address");

//   var {input: emailInput, inputWrapper: emailInputWrapper} = renderInputGroup({
//     name: "email",
//     type: "email",
//     autocomplete: "email",
//     placeholder: "",
//   });

//   email.append(emailLabel, emailInput);
//   form.appendChild(email);

//   const submitElement = renderSubmitButton();
//   form.appendChild(submitElement);

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
  stampScopedAttr(wrapper);

  const labelElement = renderLabelElement(name, label);

  var { input: input, wrapper: inputWrapper } = renderInputGroup({
    name,
    type,
    autocomplete: autocomplete,
    placeholder: placeholder,
  });

  wrapper.append(labelElement, inputWrapper);
  const returnObjects = {
    input: input,
    textFieldGroup: wrapper,
  };
  return returnObjects;
}

function renderPasswordField({
  name,
  label,
  type,
  autocomplete,
  placeholder,
  wrapperClasses,
}) {
  const wrapper = document.createElement("div");
  addClasses(wrapper, wrapperClasses);
  stampScopedAttr(wrapper);

  const labelElement = renderLabelElement(name, label);

  var { input: input, wrapper: inputWrapper } = renderInputGroup({
    name,
    type,
    autocomplete: autocomplete,
    placeholder: placeholder,
  });

  inputWrapper.className = "air3-input-group is-appended";

  const passInputWrapper = document.createElement("div");
  stampScopedAttr(passInputWrapper);
  passInputWrapper.setAttribute("has-icon", "true");

  const wrapperEyeIcon = document.createElement("div");
  wrapperEyeIcon.className = "air3-input-append";

  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("aria-checked", "false");
  buttonElement.setAttribute("aria-label", "Show password");
  stampScopedAttr(buttonElement);
  buttonElement.role = "switch";

  buttonElement.style.display = "inline-flex";
  buttonElement.style.cursor = "pointer";
  buttonElement.style.borderWidth = "medium";
  buttonElement.style.borderStyle = "none";
  buttonElement.style.borderColor = "currentcolor";
  buttonElement.style.borderImage = "initial";
  buttonElement.style.background = "none";

  buttonElement.type = "button";

  const svgWrapper = document.createElement("div");
  addClasses(svgWrapper, ["air3-icon", "md"]);
  stampScopedAttr(svgWrapper);

  const svgElement = document.createElement("img");
  svgElement.src = "images/eye.svg";
  svgElement.alt = "Eye";

  svgWrapper.appendChild(svgElement);
  buttonElement.appendChild(svgWrapper);
  wrapperEyeIcon.appendChild(buttonElement);

  inputWrapper.appendChild(wrapperEyeIcon);
  passInputWrapper.appendChild(inputWrapper);

  const children = [labelElement, passInputWrapper];
  wrapper.replaceChildren(...children);

  const returnObjects = {
    input: input,
    passwordGroup: wrapper,
  };
  return returnObjects;
}

//   wrapper.append(labelElement, inputObjects.inputWrapper);
//   const returnObjects = {
//     input: inputObjects.input,
//     textFieldGroup: wrapper,
//   };
//   return returnObjects;
// }

// function renderCountryField({
//   name,
//   label,
//   type,
//   autocomplete,
//   placeholder,
//   wrapperClasses,
// }) {
//   const wrapper = document.createElement("div");
//   addClasses(wrapper, wrapperClasses);
//   stampScopedAttr(wrapper);

//   const labelElement = renderLabelElement(name, label);
//   labelElement.removeAttribute("for");
//   labelElement.id = "select-a-country";

//   const contInputGroup = document.createElement("div");
//   stampScopedAttr(contInputGroup);
//   addClasses(contInputGroup, [
//     "d-block",
//     "country-dropdown",
//     "air3-dropdown",
//     "is-min-width",
//     "is-desktop",
//   ]);
//   contInputGroup.id = "country-dropdown";
//   contInputGroup.setAttribute("data-ev-sublocation", "!dropdown");
//   contInputGroup.setAttribute("theme", "air-3-0");

//   const dropdownToggle = document.createElement("div");
//   addClasses(dropdownToggle, ["air3-dropdown-toggle", "is-selected"]);
//   dropdownToggle.setAttribute("aria-controls", "dropdown-menu");
//   dropdownToggle.setAttribute(
//     "aria-describedby",
//     "country-validation-messages",
//   );
//   dropdownToggle.setAttribute("aria-expanded", "false");
//   dropdownToggle.setAttribute("aria-labelledby", "select-a-country");
//   dropdownToggle.setAttribute("aria-haspopup", "listbox");
//   dropdownToggle.setAttribute("aria-required", "true");
//   dropdownToggle.setAttribute("data-ev-label", "dropdown_toggle");
//   dropdownToggle.setAttribute("data-test", "dropdown-toggle");
//   dropdownToggle.role = "combobox";
//   dropdownToggle.tabIndex = 0;

//   const toggleTitle = document.createElement("div");
//   toggleTitle.className = "air3-dropdown-toggle-title";

//   const initialCountry =
//     countries.find((c) => c.name === "United States") || countries[0];
//   if (!initialCountry) {
//     throw new Error("countries in domain.js must contain at least one entry");
//   }

//   const toggleLabel = document.createElement("span");
//   addClasses(toggleLabel, ["air3-dropdown-toggle-label", "ellipsis"]);
//   toggleLabel.textContent = initialCountry.name;

//   const iconWrapper = document.createElement("div");
//   addClasses(iconWrapper, ["air3-dropdown-icon", "air3-icon", "md"]);

//   const carrotIcon = document.createElement("img");
//   carrotIcon.src = "images/down-carrot.svg";
//   carrotIcon.alt = "";
//   carrotIcon.setAttribute("aria-hidden", "true");

//   iconWrapper.appendChild(carrotIcon);
//   toggleTitle.append(toggleLabel, iconWrapper);
//   dropdownToggle.appendChild(toggleTitle);

//   const hiddenInput = document.createElement("input");
//   hiddenInput.type = "hidden";
//   hiddenInput.name = name;
//   hiddenInput.id = `${name}-input`;
//   hiddenInput.value = initialCountry.id;
//   hiddenInput.autocomplete = autocomplete || "country";

//   contInputGroup.append(dropdownToggle, hiddenInput);
//   wrapper.append(labelElement, contInputGroup);

//   bindCountryDropdown({
//     root: contInputGroup,
//     toggle: dropdownToggle,
//     toggleLabel,
//     hiddenInput,
//     initialCountry,
//   });

//   form.appendChild(wrapper);
//   return inputWrapper;
// }

// function bindCountryDropdown({
//   root,
//   toggle,
//   toggleLabel,
//   hiddenInput,
//   initialCountry,
// }) {
//   let isOpen = false;
//   let selectedCountry = initialCountry;
//   let filteredCountries = countries.slice();
//   let activeIndex = -1;
//   let menuContainer = null;
//   let menuList = null;
//   let searchInput = null;
//   let canBlur = true;

//   const filterCountries = (query) => {
//     if (!query) return countries.slice();
//     const needle = query.toLocaleLowerCase("en");
//     return countries.filter((country) =>
//       country.name.toLocaleLowerCase("en").includes(needle),
//     );
//   };

//   const syncOptionFocusStyles = ({ moveFocus = true } = {}) => {
//     if (!menuList) return;
//     const options = menuList.querySelectorAll('[role="option"]');
//     options.forEach((option, index) => {
//       option.classList.toggle("is-focused", index === activeIndex);
//       if (moveFocus && index === activeIndex) {
//         option.focus({ preventScroll: false });
//         option.scrollIntoView({ block: "nearest" });
//       }
//     });
//   };

//   const setActiveIndex = (index, { moveFocus = true } = {}) => {
//     if (!filteredCountries.length) {
//       activeIndex = -1;
//       syncOptionFocusStyles({ moveFocus: false });
//       return;
//     }
//     activeIndex = Math.max(0, Math.min(index, filteredCountries.length - 1));
//     syncOptionFocusStyles({ moveFocus });
//   };

//   const closeMenu = ({ restoreFocus = true } = {}) => {
//     if (!isOpen) return;
//     isOpen = false;
//     toggle.setAttribute("aria-expanded", "false");
//     toggle.classList.remove("is-open");
//     if (menuContainer) {
//       menuContainer.remove();
//       menuContainer = null;
//       menuList = null;
//       searchInput = null;
//     }
//     document.removeEventListener("mousedown", onDocumentMouseDown, true);
//     document.removeEventListener("keydown", onDocumentKeyDown, true);
//     if (restoreFocus) toggle.focus();
//   };

//   const selectCountry = (country) => {
//     if (!country) return;
//     selectedCountry = country;
//     toggleLabel.textContent = country.name;
//     hiddenInput.value = country.id;
//     closeMenu({ restoreFocus: true });
//   };

//   const clearResultsFeedback = () => {
//     const host = menuList?.parentElement;
//     if (!host) return;
//     host.querySelectorAll('[role="alert"]').forEach((node) => node.remove());
//   };

//   const renderMenuItems = () => {
//     if (!menuList) return;
//     menuList.replaceChildren();
//     clearResultsFeedback();

//     if (!filteredCountries.length) {
//       activeIndex = -1;
//       const feedback = document.createElement("div");
//       feedback.setAttribute("role", "alert");
//       const empty = document.createElement("div");
//       empty.className = "air3-result-feedback";
//       empty.setAttribute("data-test", "menu-results-feedback");
//       const text = document.createElement("span");
//       text.className = "air3-result-feedback-text";
//       text.textContent = "No results found";
//       empty.appendChild(text);
//       feedback.appendChild(empty);
//       menuList.parentElement.appendChild(feedback);
//       return;
//     }

//     filteredCountries.forEach((country, index) => {
//       const isSelected = country.id === selectedCountry.id;
//       const option = document.createElement("li");
//       option.className = "air3-menu-item";
//       if (isSelected) option.classList.add("is-active");
//       option.role = "option";
//       option.id = `country-option-${country.id}`;
//       option.setAttribute("aria-selected", isSelected ? "true" : "false");
//       option.tabIndex = -1;
//       option.dataset.countryId = country.id;

//       if (isSelected) {
//         const checkWrap = document.createElement("div");
//         addClasses(checkWrap, ["air3-menu-check-icon", "air3-icon", "sm"]);
//         const checkImg = document.createElement("img");
//         checkImg.src = "images/check-icon.svg";
//         checkImg.alt = "";
//         checkImg.setAttribute("aria-hidden", "true");
//         checkWrap.appendChild(checkImg);
//         option.appendChild(checkWrap);
//       }

//       const textWrap = document.createElement("span");
//       textWrap.className = "air3-menu-item-text";
//       textWrap.setAttribute("data-ev-label", "menu_item");
//       const labelSpan = document.createElement("span");
//       labelSpan.textContent = country.name;
//       textWrap.appendChild(labelSpan);
//       if (isSelected) {
//         const sr = document.createElement("span");
//         sr.className = "sr-only";
//         sr.textContent = "selected";
//         textWrap.appendChild(sr);
//       }
//       option.appendChild(textWrap);

//       option.addEventListener("click", (event) => {
//         event.preventDefault();
//         event.stopPropagation();
//         selectCountry(country);
//       });
//       option.addEventListener("mouseenter", () => {
//         setActiveIndex(index, { moveFocus: false });
//       });

//       menuList.appendChild(option);
//     });

//     const selectedIdx = filteredCountries.findIndex(
//       (c) => c.id === selectedCountry.id,
//     );
//     activeIndex = selectedIdx >= 0 ? selectedIdx : 0;
//   };

//   const openMenu = ({ focusSearch = true, initialActiveIndex } = {}) => {
//     if (isOpen) return;
//     isOpen = true;
//     filteredCountries = filterCountries("");
//     toggle.setAttribute("aria-expanded", "true");
//     toggle.classList.add("is-open");

//     menuContainer = document.createElement("div");
//     menuContainer.className = "air3-dropdown-menu-container";
//     menuContainer.tabIndex = -1;

//     const menu = document.createElement("div");
//     menu.className = "air3-dropdown-menu";

//     const header = document.createElement("div");
//     addClasses(header, ["air3-dropdown-header-container", "has-search"]);

//     const searchWrap = document.createElement("div");
//     searchWrap.className = "air3-dropdown-search";
//     searchWrap.setAttribute("data-test", "dropdown-search");

//     const searchGroup = document.createElement("div");
//     addClasses(searchGroup, ["air3-input-group", "is-prepended"]);

//     const prepend = document.createElement("div");
//     prepend.className = "air3-input-prepend";
//     const searchIconWrap = document.createElement("div");
//     addClasses(searchIconWrap, ["air3-icon", "sm"]);
//     searchIconWrap.setAttribute("data-test", "search-icon");
//     const searchIcon = document.createElement("img");
//     searchIcon.src = "images/search-icon.svg";
//     searchIcon.alt = "";
//     searchIcon.setAttribute("aria-hidden", "true");
//     searchIconWrap.appendChild(searchIcon);
//     prepend.appendChild(searchIconWrap);

//     const searchLabelId = "country-dropdown-search-label";
//     const searchLabel = document.createElement("span");
//     searchLabel.id = searchLabelId;
//     searchLabel.hidden = true;
//     searchLabel.textContent = "Search";

//     searchInput = document.createElement("input");
//     searchInput.type = "search";
//     addClasses(searchInput, ["air3-input", "air3-input-sm"]);
//     searchInput.role = "combobox";
//     searchInput.setAttribute("aria-autocomplete", "list");
//     searchInput.setAttribute("aria-expanded", "true");
//     searchInput.setAttribute("aria-controls", "dropdown-menu");
//     searchInput.setAttribute("aria-owns", "dropdown-menu");
//     searchInput.setAttribute("aria-labelledby", searchLabelId);
//     searchInput.autocomplete = "off";
//     searchInput.placeholder = "";
//     searchInput.setAttribute("enterkeyhint", "search");

//     searchGroup.append(prepend, searchInput, searchLabel);
//     searchWrap.appendChild(searchGroup);
//     header.appendChild(searchWrap);

//     const listHost = document.createElement("div");
//     addClasses(listHost, ["air3-menu-container"]);
//     listHost.setAttribute("data-test", "menu-container");
//     listHost.setAttribute("data-ev-sublocation", "!menu");

//     menuList = document.createElement("ul");
//     menuList.id = "dropdown-menu";
//     menuList.role = "listbox";
//     menuList.setAttribute("aria-labelledby", "select-a-country");
//     addClasses(menuList, ["air3-menu-list", "has-search"]);
//     menuList.tabIndex = -1;
//     menuList.setAttribute("data-test", "menu");

//     listHost.appendChild(menuList);
//     menu.append(header, listHost);
//     menuContainer.appendChild(menu);
//     root.appendChild(menuContainer);

//     renderMenuItems();

//     searchInput.addEventListener("input", () => {
//       filteredCountries = filterCountries(searchInput.value);
//       renderMenuItems();
//       if (filteredCountries.length) setActiveIndex(0);
//     });

//     searchInput.addEventListener("keydown", (event) => {
//       switch (event.key) {
//         case "ArrowDown":
//           event.preventDefault();
//           if (filteredCountries.length) setActiveIndex(0);
//           break;
//         case "ArrowUp":
//           event.preventDefault();
//           if (filteredCountries.length) {
//             setActiveIndex(filteredCountries.length - 1);
//           }
//           break;
//         case "Escape":
//           event.preventDefault();
//           event.stopPropagation();
//           closeMenu({ restoreFocus: true });
//           break;
//         case "Enter":
//           event.preventDefault();
//           if (activeIndex >= 0) {
//             selectCountry(filteredCountries[activeIndex]);
//           }
//           break;
//         default:
//           break;
//       }
//     });

//     menuList.addEventListener("keydown", (event) => {
//       switch (event.key) {
//         case "ArrowDown":
//           event.preventDefault();
//           setActiveIndex(activeIndex + 1);
//           break;
//         case "ArrowUp":
//           event.preventDefault();
//           if (activeIndex <= 0) {
//             activeIndex = -1;
//             syncOptionFocusStyles();
//             searchInput?.focus();
//           } else {
//             setActiveIndex(activeIndex - 1);
//           }
//           break;
//         case "Home":
//           event.preventDefault();
//           setActiveIndex(0);
//           break;
//         case "End":
//           event.preventDefault();
//           setActiveIndex(filteredCountries.length - 1);
//           break;
//         case "Enter":
//         case " ":
//           event.preventDefault();
//           if (activeIndex >= 0) {
//             selectCountry(filteredCountries[activeIndex]);
//           }
//           break;
//         case "Escape":
//           event.preventDefault();
//           event.stopPropagation();
//           closeMenu({ restoreFocus: true });
//           break;
//         case "Tab":
//           closeMenu({ restoreFocus: false });
//           break;
//         default:
//           break;
//       }
//     });

//     menuContainer.addEventListener("mousedown", (event) => {
//       canBlur = !menuContainer.contains(event.target);
//     });
//     menuContainer.addEventListener("mouseup", () => {
//       setTimeout(() => {
//         canBlur = true;
//       }, 0);
//     });
//     menuContainer.addEventListener("focusout", (event) => {
//       if (
//         canBlur &&
//         menuContainer &&
//         !menuContainer.contains(event.relatedTarget) &&
//         !root.contains(event.relatedTarget)
//       ) {
//         closeMenu({ restoreFocus: false });
//       }
//     });

//     document.addEventListener("mousedown", onDocumentMouseDown, true);
//     document.addEventListener("keydown", onDocumentKeyDown, true);

//     if (focusSearch) {
//       setTimeout(() => searchInput?.focus(), 0);
//     } else if (filteredCountries.length) {
//       const index =
//         initialActiveIndex === "last"
//           ? filteredCountries.length - 1
//           : initialActiveIndex != null
//             ? initialActiveIndex
//             : activeIndex >= 0
//               ? activeIndex
//               : 0;
//       setTimeout(() => setActiveIndex(index), 0);
//     }
//   };

//   function onDocumentMouseDown(event) {
//     if (!root.contains(event.target)) {
//       closeMenu({ restoreFocus: false });
//     }
//   }

//   function onDocumentKeyDown(event) {
//     if (event.key === "Escape" && isOpen) {
//       event.preventDefault();
//       closeMenu({ restoreFocus: true });
//     }
//   }

//   const toggleMenu = () => {
//     if (isOpen) closeMenu({ restoreFocus: true });
//     else openMenu({ focusSearch: true });
//   };

//   toggle.addEventListener("click", (event) => {
//     event.preventDefault();
//     toggleMenu();
//   });

//   toggle.addEventListener("keydown", (event) => {
//     switch (event.key) {
//       case "Enter":
//       case " ":
//         event.preventDefault();
//         if (!isOpen) openMenu({ focusSearch: true });
//         else if (activeIndex >= 0) {
//           selectCountry(filteredCountries[activeIndex]);
//         }
//         break;
//       case "ArrowDown":
//         event.preventDefault();
//         if (!isOpen) {
//           openMenu({ focusSearch: false });
//         } else {
//           setActiveIndex(activeIndex >= 0 ? activeIndex + 1 : 0);
//         }
//         break;
//       case "ArrowUp":
//         event.preventDefault();
//         if (!isOpen) {
//           openMenu({
//             focusSearch: false,
//             initialActiveIndex: "last",
//           });
//         } else if (activeIndex <= 0) {
//           activeIndex = -1;
//           syncOptionFocusStyles({ moveFocus: false });
//           searchInput?.focus();
//         } else {
//           setActiveIndex(activeIndex - 1);
//         }
//         break;
//       case "Escape":
//         if (isOpen) {
//           event.preventDefault();
//           closeMenu({ restoreFocus: true });
//         }
//         break;
//       default:
//         break;
//     }
//   });
// }

// function renderTermsCheckbox() {
//   const group = document.createElement("div");
//   addClasses(group, [
//     "air3-checkbox-group",
//     "page-terms-checkboxes",
//     "mt-3x",
//     "mt-md-6x",
//   ]);
//   group.setAttribute("aria-labelledby", "checkbox-group-1");
//   group.setAttribute("data-ev-sublocation", "!checkbox_group");
//   group.role = "group";
//   group.style.setProperty("--checkbox-group-gap", "0");
//   stampScopedAttr(group);

//   const groupLabel = document.createElement("div");
//   groupLabel.id = "checkbox-group-1";

//   const label = document.createElement("label");
//   addClasses(label, ["py-2x", "air3-checkbox-label"]);
//   label.setAttribute("data-test", "checkbox-label");
//   label.id = "checkbox-terms";
//   stampScopedAttr(label);

//   const input = document.createElement("input");
//   input.setAttribute("aria-describedby", "checkbox-terms-validation-messages");
//   input.setAttribute("aria-required", "true");
//   addClasses(input, ["air3-checkbox-input", "sr-only"]);
//   input.name = "";
//   input.type = "checkbox";
//   input.value = "true";

//   const fakeInput = document.createElement("span");
//   fakeInput.className = "air3-checkbox-fake-input";
//   fakeInput.setAttribute("data-test", "checkbox-input");

//   const iconWrapper = document.createElement("div");
//   addClasses(iconWrapper, ["air3-icon", "md"]);
//   iconWrapper.setAttribute("data-test", "checkbox-icon");

//   const checkboxIcon = document.createElement("img");
//   checkboxIcon.className = "";
//   checkboxIcon.src = "images/checkbox-icon.svg";
//   checkboxIcon.alt = "Checkbox check mark";

//   iconWrapper.appendChild(checkboxIcon);
//   fakeInput.appendChild(iconWrapper);

//   const text = document.createElement("span");
//   stampScopedAttr(text);
//   text.append(
//     document.createTextNode("Yes, I understand and agree to the "),
//     renderLegalLink("StarGPS Terms of Service"),
//     document.createTextNode(", including the "),
//     renderLegalLink("User Agreement"),
//     document.createTextNode(" and "),
//     renderLegalLink("Privacy Policy"),
//     document.createTextNode("."),
//   );

//   label.append(input, fakeInput, text);
//   group.append(groupLabel, label);
//   return group;
// }

// function renderLegalLink(label) {
//   const link = document.createElement("a");
//   link.className = "up-n-link";
//   stampScopedAttr(link);
//   link.href = "https://www.example.com/legal";
//   link.target = "_blank";
//   link.textContent = label;
//   return link;
// }

function renderSubmitButton() {
  const wrapper = document.createElement("div");
  addClasses(wrapper, ["text-center", "mt-6x", "mt-md-10x"]);
  stampScopedAttr(wrapper);

  const button = document.createElement("button");
  addClasses(button, ["air3-btn", "air3-btn-primary", "air3-btn-block-sm"]);
  button.setAttribute(
    "data-ev-click-data",
    '{"email":null,"accountType":"client","isSSORegistrant":false,"ssoProvider":null}',
  );
  button.setAttribute("data-ev-label", "create_my_account");
  stampScopedAttr(button);
  button.id = "button-submit-form";
  button.type = "submit";

  const spinnerWrapper = document.createElement("div");
  addClasses(spinnerWrapper, ["air3-icon", "sm"]);
  stampScopedAttr(spinnerWrapper);
  spinnerWrapper.style.display = "none";

  const spinner = document.createElement("img");
  spinner.className = "spinner";
  spinner.src = "images/spinner.svg";
  spinner.alt = "Spinner";
  spinnerWrapper.appendChild(spinner);

  const srStatus = document.createElement("span");
  srStatus.setAttribute("aria-atomic", "true");
  srStatus.setAttribute("aria-live", "polite");
  srStatus.className = "sr-only";
  stampScopedAttr(srStatus);
  srStatus.role = "status";
  srStatus.textContent = "Create my account";

  const visibleLabel = document.createElement("span");
  visibleLabel.setAttribute("aria-hidden", "true");
  stampScopedAttr(visibleLabel);
  visibleLabel.textContent = "Create my account";

  button.append(spinnerWrapper, srStatus, visibleLabel);
  wrapper.appendChild(button);
  return wrapper;
}

// function renderSignupTypeHatch() {
//   const wrapper = document.createElement("div");
//   addClasses(wrapper, ["text-center", "text-body", "mt-4x", "mb-6x"]);
//   stampScopedAttr(wrapper);

//   const outer = document.createElement("div");
//   stampScopedAttr(outer);

//   const inner = document.createElement("div");

//   const mobileHatch = document.createElement("div");
//   mobileHatch.className = "d-lg-none";
//   mobileHatch.setAttribute("data-qa", "signup-type-button-mobile-form-hatch");

//   const mobileInner = document.createElement("div");
//   const mobileText = document.createElement("span");
//   mobileText.className = "text-body";
//   mobileText.appendChild(document.createTextNode("Looking for work? "));

//   const applyButton = document.createElement("button");
//   addClasses(applyButton, [
//     "air3-btn",
//     "air3-btn-link",
//     "mb-0",
//     "px-2x",
//     "py-0",
//   ]);
//   applyButton.type = "button";
//   applyButton.textContent = "Apply as talent";

//   mobileText.appendChild(applyButton);
//   mobileInner.appendChild(mobileText);
//   mobileHatch.appendChild(mobileInner);

//   const desktopHatch = document.createElement("div");
//   addClasses(desktopHatch, ["d-none", "d-lg-block"]);
//   desktopHatch.setAttribute("data-qa", "signup-type-button-pc-form-hatch");

//   const desktopText = document.createElement("span");
//   desktopText.className = "text-body";
//   desktopText.appendChild(document.createTextNode("Already have an account? "));

//   const loginLink = document.createElement("a");
//   loginLink.className = "up-n-link";
//   loginLink.href = "https://www.example.com/ab/account-security/login";
//   loginLink.textContent = "Log In";

//   desktopText.appendChild(loginLink);
//   desktopHatch.appendChild(desktopText);

//   inner.append(mobileHatch, desktopHatch);
//   outer.appendChild(inner);
//   wrapper.appendChild(outer);
//   return wrapper;
// }

setupForm();

// Helper Methods

function renderLabelElement(name, label) {
  const labelElement = document.createElement("label");
  labelElement.className = "mb-1x";
  labelElement.htmlFor = `${name}-input`;
  labelElement.textContent = label;
  stampScopedAttr(labelElement);
  return labelElement;
}

function renderInputGroup({ name, type, autocomplete, placeholder }) {
  const wrapper = document.createElement("div");
  wrapper.className = "air3-input-group";
  stampScopedAttr(wrapper);

  const input = document.createElement("input");
  input.className = "air3-input";
  input.id = `${name}-input`;
  input.name = name;
  input.type = type;
  if (autocomplete) input.autocomplete = autocomplete;
  if (placeholder) input.placeholder = placeholder;
  stampScopedAttr(input);
  wrapper.appendChild(input);

  const objects = { input, wrapper };
  return objects;
}

function stampScopedAttr(element) {
  // Matches Vue scoped CSS selectors like .page-container[data-v-27736af6]
  element.setAttribute("data-v-27736af6", "");
}

function addClasses(element, classes) {
  if (!classes) return;
  for (let i = 0; i < classes.length; i++) {
    element.classList.add(classes[i]);
  }
}
