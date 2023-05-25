// Burger
const toggleBurger = document.querySelector(".nav_toggle");
const navItems = document.querySelectorAll(".nav_item");

toggleBurger.addEventListener("click", () => {
  navItems.forEach((element, index) => {
    setTimeout(() => {
      element.classList.toggle("active");
    }, index * 100);
  });
});

toggleBurger.addEventListener("blur", () => {
  navItems.forEach((element, index) => {
    setTimeout(() => {
      element.classList.remove("active");
    }, index * 100);
  });
});

// Blur
const serviceButtons = document.querySelectorAll(".service_btn");
const gardenButton = document.querySelectorAll(".service_btn")[0];
const gardenFigures = [
  document.querySelectorAll(".service_figure")[0],
  document.querySelectorAll(".service_figure")[4],
];
const lawnButton = document.querySelectorAll(".service_btn")[1];
const lawnFigures = document.querySelectorAll(".service_figure")[2];
const plantingButton = document.querySelectorAll(".service_btn")[2];
const plantingFigures = [
  document.querySelectorAll(".service_figure")[1],
  document.querySelectorAll(".service_figure")[3],
  document.querySelectorAll(".service_figure")[5],
];
const figcaptionHeadings = document.querySelectorAll(".figcaption_heading");
const figureBlur = document.querySelector(".figure_blur");

function checkGardenButton() {
  if (
    lawnButton.classList.contains("checked") &&
    plantingButton.classList.contains("checked")
  ) {
    plantingButton.classList.remove("checked");
    unblurGardenFigures();
    blurPlantingFigures();
    gardenButton.classList.add("checked");
  } else if (!gardenButton.classList.contains("checked")) {
    gardenButton.classList.add("checked");
    unblurGardenFigures();
  } else {
    gardenButton.classList.remove("checked");
    blurGardenFigures();
  }
}

function unblurGardenFigures() {
  gardenFigures.forEach((figure) => figure.classList.remove("figure_blur"));
}

function blurGardenFigures() {
  gardenFigures.forEach((figure) => figure.classList.add("figure_blur"));
}

function checkLawnButton() {
  if (
    gardenButton.classList.contains("checked") &&
    plantingButton.classList.contains("checked")
  ) {
    plantingButton.classList.remove("checked");
    unblurLawnFigures();
    blurPlantingFigures();
    lawnButton.classList.add("checked");
  } else if (!lawnButton.classList.contains("checked")) {
    lawnButton.classList.add("checked");
    unblurLawnFigures();
  } else {
    lawnButton.classList.remove("checked");
    blurLawnFigures();
  }
}

function unblurLawnFigures() {
  lawnFigures.classList.remove("figure_blur");
}

function blurLawnFigures() {
  lawnFigures.classList.add("figure_blur");
}

function checkPlantingButton() {
  if (
    gardenButton.classList.contains("checked") &&
    lawnButton.classList.contains("checked")
  ) {
    gardenButton.classList.remove("checked");
    unblurPlantingFigures();
    blurGardenFigures();
    plantingButton.classList.add("checked");
  } else if (!plantingButton.classList.contains("checked")) {
    plantingButton.classList.add("checked");
    unblurPlantingFigures();
  } else {
    plantingButton.classList.remove("checked");
    blurPlantingFigures();
  }
}

function unblurPlantingFigures() {
  plantingFigures.forEach((figure) => figure.classList.remove("figure_blur"));
}

function blurPlantingFigures() {
  plantingFigures.forEach((figure) => figure.classList.add("figure_blur"));
}

gardenButton.addEventListener("click", checkGardenButton);
lawnButton.addEventListener("click", checkLawnButton);
plantingButton.addEventListener("click", checkPlantingButton);

window.onload = function () {
  pricesDropdownHandler();
  contactUsDropdownHandler();
  chooseCity();
};

//  Prices

const pricesDropdownHandler = () => {
  document
    .querySelector(".prices__dropdowns")
    .addEventListener("click", (e) => {
      let clickedDropdown;
      if (e.target.classList.contains("dropdowns__dropdown")) {
        clickedDropdown = e.target;
        if (clickedDropdown.classList.contains("dropdowns__dropdown_opened")) {
          closePricesDropdown();
        } else {
          closePricesDropdown();
          openClickedPricesDropdown(clickedDropdown);
        }
      }
      if (
        e.target.classList.contains("prices_btn_text") ||
        e.target.classList.contains("dropdown__arrow")
      ) {
        clickedDropdown = e.target.parentElement;
        if (clickedDropdown.classList.contains("dropdowns__dropdown_opened")) {
          closePricesDropdown();
        } else {
          closePricesDropdown();
          openClickedPricesDropdown(clickedDropdown);
        }
      }
    });
};

const openClickedPricesDropdown = (clickedDropdown) => {
  clickedDropdown.classList.add("dropdowns__dropdown_opened");
  addPricesDropdownContent(clickedDropdown);
};

const closePricesDropdown = () => {
  let dropdowns = document.querySelectorAll(".dropdowns__dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("dropdowns__dropdown_opened");
    removePricesDropdownContent(dropdown);
  });
};

const addPricesDropdownContent = (clickedDropdown) => {
  const dropdownContent = [...clickedDropdown.children];
  dropdownContent.forEach((child) => {
    if (child.classList.contains("dropdown__arrow")) {
      child.classList.add("dropdown__arrow_rotate");
    } else if (child.classList.contains("dropdown__divider")) {
      child.classList.add("dropdown__divider_animation");
    } else if (
      child.classList.contains("dropdown__subscription-info") ||
      child.classList.contains("dropdown__subscription-price") ||
      child.classList.contains("dropdown__subscription-cta")
    ) {
      child.classList.add("visible");
    }
  });
};

const removePricesDropdownContent = (dropdown) => {
  const dropdownContent = [...dropdown.children];
  console.log(dropdownContent);
  dropdownContent.forEach((e) => {
    e.classList.remove(`${e.classList[1]}`);
  });
};

//  Contact Us

const contactUsDropdownOptions = [
  ...document.querySelector(".dropdown__list").children,
];

const contactUsDropdownHandler = () => {
  document
    .querySelector(".contact_us__dropdown")
    .addEventListener("click", (e) => {
      const dropdown = document.querySelector(".contact_us__dropdown");
      if (
        e.target.classList.contains("contact_us__dropdown") ||
        e.target.classList.contains("dropdown__placeholder") ||
        e.target.classList.contains("dropdown__arrow")
      ) {
        if (dropdown.classList.contains("contact_us__dropdown_active")) {
          if (
            dropdown.firstElementChild.innerHTML !== "City" &&
            dropdown.lastElementChild.classList.contains(
              "dropdown__list_opened"
            )
          ) {
            closeContactUsDropdown();
          } else if (dropdown.firstElementChild.innerHTML !== "City") {
            openContactUsDropdown();
          } else {
            closeContactUsDropdown();
            dropdown.classList.remove("contact_us__dropdown_active");
          }
        } else if (dropdown.classList.contains("contact_us__dropdown")) {
          dropdown.classList.add("contact_us__dropdown_active");
          openContactUsDropdown();
        }
      }
    });
};

const closeContactUsDropdown = () => {
  const dropdown = document.querySelector(".contact_us__dropdown");
  contactUsDropdownOptions.forEach((el) =>
    el.classList.remove("dropdown__option_visible")
  );
  dropdown.children[2].classList.remove("dropdown__list_opened");
  dropdown.children[1].classList.remove("dropdown__arrow_rotate");
};

const openContactUsDropdown = () => {
  const dropdown = document.querySelector(".contact_us__dropdown");
  dropdown.children[1].classList.add("dropdown__arrow_rotate");
  dropdown.children[2].classList.add("dropdown__list_opened");
  contactUsDropdownOptions.forEach((el) => {
    setTimeout(() => {
      el.classList.add("dropdown__option_visible");
    }, 300);
  });
};

const chooseCity = () => {
  for (let option of contactUsDropdownOptions) {
    option.addEventListener("click", (e) => {
      console.log(e.target.innerHTML);
      let clickedCity = e.target.innerHTML;
      closeContactUsDropdown();
      let placeholder = document.querySelector(".dropdown__placeholder");
      placeholder.innerHTML = clickedCity;
    });
  }
};
