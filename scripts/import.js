//Sheets link: https://docs.google.com/spreadsheets/d/1RTFagbAj78gfLTkC2raXlmKj2a2e9seZ2sVuDEby12w/edit?usp=sharing

const sheetId = "1RTFagbAj78gfLTkC2raXlmKj2a2e9seZ2sVuDEby12w";
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&sheet=${sheetName}`;

function loadFoodOptions() {
  $.ajax({
    type: "GET",
    url: sheetURL,
    dataType: "text",
    success: function (response) {
      const parsedResponse = Papa.parse(response, {
        header: true,
        skipEmptyLines: true,
      });

      foodOptions = parsedResponse.data;

      appendLocationOptions(foodOptions);
      enableButtons();

      loadingScreen.fadeOut(300, function () {
        foodRandomiserScreen.fadeIn(300);
      });
    },
    error: function () {
      loadingScreen.html(`<p class="error-message">Failed to load data. Please check if internet connection is available.</p>`);
    },
  });
}

function enableButtons() {
  document.getElementById("choose-btn").disabled = false;
  document.getElementById("view-btn").disabled = false;
  document.querySelectorAll(".option-btn").forEach((button) => {
    button.disabled = false;
  });
}

function appendLocationOptions(foodOptions) {
  const uniqueLocations = [
    ...new Set(foodOptions.map((food) => food.location)),
  ];

  uniqueLocations.forEach((location) => {
    const locationName = formatString(location);
    const isSelected = selectedLocations.includes(location);

    const locationOptionButton = `
      <button
        class="option-btn${isSelected ? " selected" : ""}" 
        disabled
        data-option="${location}"
        data-category="location"
      >
        ${locationName}
      </button>`;

    locationOptionBox.append(locationOptionButton);
  });
}
