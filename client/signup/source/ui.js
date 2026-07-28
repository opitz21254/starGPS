import { countries } from "./domain.js";

const setupForm = () => {
    // Create Name Row
    const nameElement = document.createElement("div");
    nameElement.className = "air3-grid-container name-inputs col-gap-4x";
    stampScopedAttr(nameElement);

    const firstName = renderTextField({
        name: "first-name",
        label: "First name",
        autocomplete: "given-name",
        placeholder: "Jon",
        wrapperClasses: ["span-6", "mt-3x"],
    });
    const lastName = renderTextField({
        name: "last-name",
        label: "Last name",
        autocomplete: "family-name",
        placeholder: "Doe",
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
    const passwordElement = renderPasswordField({
        name: "password",
        label: "Password",
        type: "password",
        autocomplete: "password",
        placeholder: "",
        wrapperClasses: ["mt-3x", "mt-md-6x"],
    });

    // Create Country Row
    const countryElement = renderCountryField({
        name: "country",
        label: "Country",
        autocomplete: "country",
        placeholder: "",
        wrapperClasses: ["mt-3x", "mt-md-6x", "mb-3x"],
    });

    // Create User Agreement Acknowledgement

    // Create "Create my account" button

    // Create "Apply as a Client" link

    const form = document.getElementById("signupForm-redesigned");
    form.replaceChildren(
        nameElement,
        emailElement,
        passwordElement,
        countryElement,
    );
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
    stampScopedAttr(wrapper);

    const labelElement = renderLabelElement(name, label);

    const inputWrapper = renderInputGroup({
        name,
        type,
        autocomplete,
        placeholder,
    });

    wrapper.append(labelElement, inputWrapper);
    return wrapper;
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

    const labelElementPass = renderLabelElement(name, label);
    const input = renderInputGroup({ name, type, autocomplete, placeholder });

    input.className = "air3-input-group is-appended";

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

    input.appendChild(wrapperEyeIcon);
    passInputWrapper.appendChild(input);

    const children = [labelElementPass, passInputWrapper];
    wrapper.replaceChildren(...children);

    return wrapper;
}

function renderCountryField({
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
    labelElement.removeAttribute("for");
    labelElement.id = "select-a-country";

    const contInputGroup = document.createElement("div");
    stampScopedAttr(contInputGroup);
    addClasses(contInputGroup, [
        "d-block",
        "country-dropdown",
        "air3-dropdown",
        "is-min-width",
        "is-desktop",
    ]);
    contInputGroup.id = "country-dropdown";
    contInputGroup.setAttribute("data-ev-sublocation", "!dropdown");
    contInputGroup.setAttribute("theme", "air-3-0");

    const dropdownToggle = document.createElement("div");
    addClasses(dropdownToggle, ["air3-dropdown-toggle", "is-selected"]);
    dropdownToggle.setAttribute("aria-controls", "dropdown-menu");
    dropdownToggle.setAttribute(
        "aria-describedby",
        "country-validation-messages",
    );
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownToggle.setAttribute("aria-labelledby", "select-a-country");
    dropdownToggle.setAttribute("aria-required", "true");
    dropdownToggle.setAttribute("data-ev-label", "dropdown_toggle");
    dropdownToggle.setAttribute("data-test", "dropdown-toggle");
    dropdownToggle.role = "combobox";
    dropdownToggle.tabIndex = 0;

    const toggleTitle = document.createElement("div");
    toggleTitle.className = "air3-dropdown-toggle-title";

    const selectedCountry = countries.find((c) => c.name === "United States");
    const toggleLabel = document.createElement("span");
    addClasses(toggleLabel, ["air3-dropdown-toggle-label", "ellipsis"]);
    toggleLabel.textContent = selectedCountry
        ? selectedCountry.name
        : "United States";

    const iconWrapper = document.createElement("div");
    addClasses(iconWrapper, ["air3-dropdown-icon", "air3-icon", "md"]);

    const carrotIcon = document.createElement("img");
    carrotIcon.className = "";
    carrotIcon.src = "images/down-carrot.svg";
    carrotIcon.alt = "Downwards Pointing Carrot";

    iconWrapper.appendChild(carrotIcon);
    toggleTitle.append(toggleLabel, iconWrapper);
    dropdownToggle.appendChild(toggleTitle);
    contInputGroup.appendChild(dropdownToggle);

    wrapper.append(labelElement, contInputGroup);
    return wrapper;
}

//Helper Methods

function renderIconButton({ label, role, type, sourcePath }) {
    return buttonElement;
}


setupForm();

function renderLabelElement(name, label) {
    const labelElement = document.createElement("label");
    labelElement.className = "mb-1x";
    labelElement.htmlFor = `${name}-input`;
    labelElement.textContent = label;
    stampScopedAttr(labelElement);
    return labelElement;
}
function renderInputGroup({ name, type, autocomplete, placeholder }) {
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "air3-input-group";
    stampScopedAttr(inputWrapper);

    const input = document.createElement("input");
    input.className = "air3-input";
    input.id = `${name}-input`;
    input.name = name;
    input.type = type;
    if (autocomplete) input.autocomplete = autocomplete;
    if (placeholder) input.placeholder = placeholder;
    stampScopedAttr(input);
    inputWrapper.appendChild(input);

    return inputWrapper;
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
