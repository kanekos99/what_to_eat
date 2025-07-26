let foodOptions = [];
let filteredFoodOptions = [];
const selectedFoodName = document.getElementById("food-name");
const selectedFoodLocation = document.getElementById("food-location");
const selectedFoodDate = document.getElementById("last-ate-date");

const selectedPrices = ["low", "mid", "high"];
const selectedLocations = ["pasir_ris", "tampines"];

const app = {
  init: function () {
    loadFoodOptions();
  },
};

app.init();

function loadFoodOptions() {
  Papa.parse("./assets/food_options.csv", {
    header: true,
    download: true,
    step: function (row) {
      foodOptions.push(row.data);
      console.log("Row:", row.data);
    },
    complete: function () {
      console.log(foodOptions);
      enableButtons();
    },
  });
}

function enableButtons() {
  document.getElementById("choose-btn").disabled = false;
  document.querySelectorAll(".option-btn").forEach((button) => {
    button.disabled = false;
  });
}

function getFoodChoice() {
  const filteredFoodOptions = filterFoodOptions();
  console.log(filteredFoodOptions)
  if(filteredFoodOptions.length > 0) {
    const foodChoice = filteredFoodOptions[Math.floor(Math.random() * filteredFoodOptions.length)];
    displayFoodChoice(foodChoice);
    console.log(foodChoice);
  } else {
    console.log("HUHHHHHH");
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

function formatString(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function addOrRemoveFromArray(option, array) {
  array.includes(option)
  ? array.splice(array.indexOf(option), 1)
  : array.push(option);
}

function filterFoodOptions() {
 return foodOptions.filter(
    item => selectedPrices.includes(item.price) && selectedLocations.includes(item.location)
  );
}

/*------------------------options selection function---------------------------*/
document.querySelectorAll(".option-btn").forEach((button) => {
  button.classList.add("selected");
  button.addEventListener("click", (e) => {
    button.classList.toggle("selected");
    const dataOption = e.currentTarget.dataset.option;
    const dataCategory = e.currentTarget.dataset.category;
    switch (dataCategory) {
      case "price":
        addOrRemoveFromArray(dataOption, selectedPrices);
        break;
      case "location":
        addOrRemoveFromArray(dataOption, selectedLocations);
        break;
    }
  });
});
