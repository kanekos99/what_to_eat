let foodOptions = [];
let filteredFoodOptions = [];
let viewAllChoicesPage = false;
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

const singleChoiceBoxName = "#single-choice-box";
const singleChoiceBox = $(singleChoiceBoxName);

const multiChoiceBoxName = "#multi-choice-box";
const multiChoiceBox = $(multiChoiceBoxName);

const chooseBtnName = "#choose-btn";
const chooseBtn = $(chooseBtnName);

const viewBtnName = "#view-btn";
const viewBtn = $(viewBtnName);

const multiFoodChoicesHolderName = "#food-choices-holder";
const multiFoodChoicesHolder = $(multiFoodChoicesHolderName);

const loadingScreenName = "#loading-screen";
const loadingScreen = $(loadingScreenName);

const foodRandomiserScreenName = "#food-randomiser";
const foodRandomiserScreen = $(foodRandomiserScreenName);

const selectedPrices = ["low", "mid"];
const selectedLocations = ["pasir_ris", "tampines"];

function formatString(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
