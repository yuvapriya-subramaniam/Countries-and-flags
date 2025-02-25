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
    countries = await response.json();
    return countries;
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
    //populate data for all the countries in a country card
    const countries_size = countries.length;
    console.log(countries_size);
    for (let i = 0; i < countries_size; i++) {
      let countryCard = document.createElement("div");
      countryCard.setAttribute("id", `country_${i}`);
      countryCard.setAttribute("class", "countriesContainer");
      const COUNTRY = countries[i];
      const CAPITAL = COUNTRY.capital && COUNTRY.capital.length > 0
          ? COUNTRY.capital.join(", ")
          : "No capital";
      const LATLNG = COUNTRY.latlng.join(", ");
      const TIMEZONES = COUNTRY.timezones ? COUNTRY.timezones.join(", ") : "No data";
      const LANGUAGES = "languages" in COUNTRY ? Object.values(COUNTRY.languages).join(", ") : "No data";
      const CURRENCIES = "currencies" in COUNTRY ? Object.values(COUNTRY.currencies).map(currency => {
        let symbol = "("+currency.symbol+")";
        return currency.name+symbol;
      }).join(", ") : "No data";
      //Country card data for dashboard - displayed for all countries
      let cardData = `<h3>${COUNTRY.name.common}</h3>
                      <div class='flagContainer'>
                        <img src=${COUNTRY.flags.svg} alt='Flag of ${COUNTRY.name.common}'>
                      </div>
                      <p class='details'><strong>Capital:</strong> <span class='capital'>${CAPITAL}</span></p>
                      <p class='details'><strong>Country Code:</strong> ${COUNTRY.cca3}</p> 
                      <p class='details'><strong>Latitude, Longitude:</strong> ${LATLNG}</p>
                      <p class='details'><strong>Region:</strong> ${COUNTRY.region}</p>`;
      countryCard.innerHTML = cardData;
      //countryDetails div to show details of a country - initially hidden only display details when a country is clicked
      let countryDetails = document.createElement("div");
      Object.assign(countryDetails, {
        id: "countryDetails",
        className: "countryDetails_hide",
      });

      const back_btn = document.createElement("button");
      back_btn.setAttribute("id", "back");
      back_btn.textContent = "Back";
      back_btn.addEventListener("click", () => {
        countryDetails.classList.toggle("countryDetails_hide");
        body.classList.toggle("body_hide");
      });
      
      //event listener to display a country's details when clicked
      countryCard.addEventListener("click", () => {
        countryDetails.classList.toggle("countryDetails_hide");
        
        let details = `<div id="country_data_${i}" class="country_modal_container">
                          <div id="flag_data" class="country_modal_flex1"><img class="country_modal_flag" src='${COUNTRY.flags.svg}'></div>                
                          <div id="country_info_${i}" class="country_modal_flex2">
                            <h2 class="country_title">${COUNTRY.name.common}</h2>
                            <div class="country_modal_info">
                               <div class="country_modal_items">
                              <p><strong>Official Name:</strong> ${COUNTRY.name.official}</p>
                              <p><strong>Population:</strong> ${COUNTRY.population}</p>
                              <p><strong>Region:</strong> ${COUNTRY.region}</p>
                              <p><strong>Sub-region:</strong> ${COUNTRY.subregion}</p>
                            </div>
                            <div class="country_modal_items">
                              <p><strong>Capital:</strong> ${CAPITAL}</p>
                              <p><strong>Languages:</strong> ${LANGUAGES}</p>
                              <p><strong>Time zone:</strong> ${TIMEZONES}</p>
                              <p><strong>Currencies:</strong> ${CURRENCIES}</p>
                            </div>
                            </div>
                          </div>
                       </div>`;
        countryDetails.innerHTML = details;
        countryDetails.prepend(back_btn);
        body.classList.toggle("body_hide"); //hide scrollbar while showing countryDetails
      });
      main.append(countryDetails, countryCard);
    }
  }
});

//Top button to go to the top of the page
const SCROLL_TOP = document.createElement("button");
SCROLL_TOP.setAttribute("id", "scrollTop");
SCROLL_TOP.textContent = "Top";
SCROLL_TOP.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

body.append(SCROLL_TOP, main);
