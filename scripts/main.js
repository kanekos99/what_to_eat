const app = {
  init: function () {
    foodChoiceBox.hide();
    loadFoodOptions();
  },
};

app.init();

function fadeInOrOutFoodChoice() {
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
    selectedFoodName.innerHTML = "No options are available!";
    selectedFoodLocation.innerHTML = "";
    selectedFoodDate.innerHTML = "";
  }
}

function displayFoodChoice(foodChoice) {
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
  }
});
