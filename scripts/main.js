const app = {
  init: function () {
    foodChoiceBox.hide();
    multiChoiceBox.hide();
    loadFoodOptions();
  },
};

app.init();

function fadeInOrOutFoodChoice() {
  showSingleFoodChoiceContainer();
  if (clickedChooseForMeButton) {
    foodChoiceBox.fadeOut(300, function () {
      getFoodChoice();
      foodChoiceBox.fadeIn(300);
    });
  } else {
    foodImage.fadeOut(300, function () {
      getFoodChoice();
      clickedChooseForMeButton = true;
      foodChoiceBox.fadeIn(300);
    });
  }
}

function getFoodChoice() {
  const filteredFoodOptions = filterFoodOptions();
  if (filteredFoodOptions.length > 0) {
    const foodChoice =
      filteredFoodOptions[
        Math.floor(Math.random() * filteredFoodOptions.length)
      ];
    displayFoodChoice(foodChoice);
  } else {
    selectedFoodName.innerHTML = "";
    selectedFoodLocation.innerHTML = "No choices are available";
    selectedFoodDate.innerHTML = "";
    foodIcon.src = "./assets/error_icon.png";
  }
}

function displayFoodChoice(foodChoice) {
  foodIcon.src = "./assets/food_icon.svg";
  selectedFoodName.innerHTML = foodChoice.display_name;
  selectedFoodLocation.innerHTML = formatString(foodChoice.mall);
  selectedFoodDate.innerHTML =
    "Last ate on: " +
    (foodChoice.last_ate === "" ? "No record" : foodChoice.last_ate);
}

function addOrRemoveFromArray(option, array) {
  array.includes(option)
    ? array.splice(array.indexOf(option), 1)
    : array.push(option);
}

function filterFoodOptions() {
  return foodOptions.filter(
    (item) =>
      selectedPrices.includes(item.price) &&
      selectedLocations.includes(item.location)
  );
}

function viewAllFoodChoices() {
  console.log(foodOptions);
  hideSingleFoodChoiceContainer();
  const filteredFoodChoices = filterFoodOptions();
  populateAllFoodOptions(filteredFoodChoices);
  console.log(filteredFoodChoices);
}

function populateAllFoodOptions(filteredFoodChoices) {
  multiFoodChoicesHolder.empty();
  if (filteredFoodChoices.length > 0) {
    filteredFoodChoices.forEach((choice) => {
      const locationName = formatString(choice.mall);
      const lastAteDate =
        "Last ate on: " +
        (choice.last_ate === "" ? "No record" : choice.last_ate);
      const choiceName = formatString(choice.display_name);

      const choiceUnitBox = `
      <div
        class="food-unit-box shadow">
        <p class="food-name-small">${choiceName}</p>
        <p class="food-location-small">${locationName}</p>
        <p class="last-date-small">${lastAteDate}</p>
      </div>  
    `;

      multiFoodChoicesHolder.append(choiceUnitBox);
    });
  } else {
    const choiceUnitBox = `
      <div
        class="food-unit-box shadow">
        <p class="food-name-small">No choices are available</p>
      </div>  
    `;
    multiFoodChoicesHolder.append(choiceUnitBox);
  }
}

function hideSingleFoodChoiceContainer() {
  viewAllChoicesPage = true;
  chooseBtn.removeClass("selected");
  viewBtn.addClass("selected");
  singleChoiceBox.fadeOut(300, function () {
    multiChoiceBox.fadeIn(300);
  });
}

function showSingleFoodChoiceContainer() {
  viewAllChoicesPage = false;
  viewBtn.removeClass("selected");
  chooseBtn.addClass("selected");
  multiChoiceBox.fadeOut(300, function () {
    singleChoiceBox.fadeIn(300);
  });
}

/*------------------------options selection function---------------------------*/
document.addEventListener("click", function (e) {
  if (e.target.matches(".option-btn")) {
    const button = e.target;
    button.classList.toggle("selected");
    const dataOption = button.dataset.option;
    const dataCategory = button.dataset.category;

    switch (dataCategory) {
      case "price":
        addOrRemoveFromArray(dataOption, selectedPrices);
        break;
      case "location":
        addOrRemoveFromArray(dataOption, selectedLocations);
        break;
    }
    if (viewAllChoicesPage) {
      viewAllFoodChoices();
    }
  }
});
