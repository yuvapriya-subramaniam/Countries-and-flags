const URL =
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,cca3,latlng,region,subregion,currencies,population,languages,timezones";

const body = document.querySelector("body");

let header_title = document.createElement("h1");
header_title.setAttribute("class", "header_flex1");
header_title.innerText = "World Countries";

let themeDiv = document.createElement("div");
themeDiv.setAttribute("id", "toggleTheme_div");

let toggleCheck = document.createElement("input");
toggleCheck.setAttribute("type", "checkbox");
toggleCheck.setAttribute("id", "toggle");

themeDiv.innerHTML =
  '<label for="toggle"><i class="fa-regular fa-moon"></i>Toggle mode</label>';

themeDiv.append(toggleCheck);

let header = document.createElement("header");
header.setAttribute("id", "header");
header.setAttribute("class", "headerContainer");
header.append(header_title, themeDiv);

body.append(header);

/* function fetchAllCountries() {
  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.error("Error fetching data:", error));
}
 fetchAllCountries().then(response => console.log(response)); */

async function fetchAllCountries() {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(
        `HTTP error. Response status is ${response.status} and response message is ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error occured in data fetch: ${error.message}`);
    return null;
  }
}

let main = document.createElement("main");
main.setAttribute("id", "main");
main.setAttribute("class", "mainContainer");

fetchAllCountries().then((countries) => {
  if (countries) {
    const countries_size = countries.length;
    console.log(countries_size);
    for (let i = 0; i < countries_size; i++) {
      let countryCard = document.createElement("div");
      countryCard.setAttribute("id", `country_${i}`);
      countryCard.setAttribute("class", "countryContainer");
      let cardData = `<h3>${countries[i].name.common}</h3>
      <div class='flagContainer'><img src=${countries[i].flags.png} alt=''></div>
      <p class='details'><strong>Capital:</strong> ${
        countries[i].capital && countries[i].capital.length > 0
          ? countries[i].capital.join(", ")
          : "No capital"
      }</p>
      <p class='details'><strong>Country Code:</strong> ${countries[i].cca3}</p> 
      <p class='details'><strong>Latitude, Longitude:</strong> ${countries[i].latlng.join(", ")}</p>
      <p class='details'><strong>Region:</strong> ${countries[i].region}</p>`;
      countryCard.innerHTML = cardData;
      main.append(countryCard);
    }
    // for(countries )
  }
});

body.append(main);
