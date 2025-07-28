let foodOptions = [];
let filteredFoodOptions = [];
let clickedChooseForMeButton = false;
const selectedFoodName = document.getElementById("food-name");
const selectedFoodLocation = document.getElementById("food-location");
const selectedFoodDate = document.getElementById("last-ate-date");
const placeholderFoodImg = document.getElementById("food-placeholder")
const foodIcon = document.getElementById("food-icon")


const locationOptionBoxName = "#location-options";
const locationOptionBox = $(locationOptionBoxName);

const foodImageName = "#food-placeholder";
const foodImage = $(foodImageName);

const foodChoiceBoxName = "#food-choice";
const foodChoiceBox = $(foodChoiceBoxName);

const selectedPrices = ["low", "mid"];
const selectedLocations = ["pasir_ris", "tampines"];

function formatString(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
