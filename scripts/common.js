let foodOptions = [];
let filteredFoodOptions = [];
const selectedFoodName = document.getElementById("food-name");
const selectedFoodLocation = document.getElementById("food-location");
const selectedFoodDate = document.getElementById("last-ate-date");

const locationOptionBoxName = "#location-options";
const locationOptionBox = $(locationOptionBoxName);

const selectedPrices = ["low", "mid", "high"];
const selectedLocations = [
  "pasir_ris",
  "tampines",
  "simei",
  "punggol",
  "changi",
];

function formatString(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
