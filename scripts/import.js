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
