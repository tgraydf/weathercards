const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

//Stores the API key as a constant so it does not get messed up - may need to be updated if key expires.
//Free OpenWeatherMap API keys allow 60 requests an hour or something.
const apiKey = "dc40fb7bea0ad58a29a583f1623ab027";

form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  //Ajax request to OpenWeatherMap API that user user input and API key to complete request using fetch.
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `icons/${
        weather[0]["icon"]
      }.svg`;
//This generates the 'cards' that will display in the browser once populated with JSON elements from OpenWeatherMap API.
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
//This displays an error if the city isn't found through OpenWeatherMap API.
    .catch(() => {
      msg.textContent = "👎 Sorry, couldn't find that city. Please try again! 🤔";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});
