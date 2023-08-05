import "../styles/main.css";
import { Weather } from "./weather.js";
import { format } from "date-fns";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import cloudy from "../assets/cloudy.jpg";
import fog from "../assets/fog.jpg";
import rain from "../assets/rain.jpg";
import snow from "../assets/snow.jpg";
import sunny from "../assets/sunny.jpg";
import wind from "../assets/wind.jpg";

class Display {
  // Local data storage to prevent unnecessary API calls on same data.
  static data = {};

  static getData() {
    return this.data;
  }

  static setData(data) {
    this.data = data;
  }

  // Accesses Weather module to get data with the provided location.
  static async getWeatherData(location) {
    return await Weather.getData(location);
  }

  // Emulates a fade animation through the manipulation of the opacity property.
  static async fadeBackground(background) {
    try {
      return new Promise(function (resolve, reject) {
        const decrement = 0.01;
        const opacityInterval = setInterval(changeOpacity, 10);

        // Change opacity by decrement every interval until 0.
        function changeOpacity() {
          background.style.opacity -= decrement;
          if (background.style.opacity <= 0) {
            clearInterval(opacityInterval);
            resolve();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Applies background styling to the passed in background.
  static applyBackgroundStyling(background) {
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
    background.style.backgroundRepeat = "repeat";
  }

  // Updates the background depending on the condition provided.
  static updateBackground(condition) {
    condition = condition.toLowerCase();
    const conditionBackground = document.getElementById("condition-background");
    const conditionBackgroundTemp = document.getElementById(
      "condition-background-temp"
    );

    // If is condition, if background already of that condition return, otherwise change to that background with the fade animation.
    if (condition.includes("cloudy") || condition.includes("overcast")) {
      if (conditionBackground.style.background == cloudy) {
        return;
      }
      conditionBackgroundTemp.style.background = `url(${cloudy})`;
      this.applyBackgroundStyling(conditionBackgroundTemp);
      this.fadeBackground(conditionBackground).then(() => {
        conditionBackground.style.background = `url(${cloudy})`;
        conditionBackground.style.opacity = 1;
        this.applyBackgroundStyling(conditionBackground);
      });
    } else if (condition.includes("clear") || condition.includes("sunny")) {
      if (conditionBackground.style.background == sunny) {
        return;
      }
      conditionBackgroundTemp.style.background = `url(${sunny})`;
      this.applyBackgroundStyling(conditionBackgroundTemp);
      this.fadeBackground(conditionBackground).then(() => {
        conditionBackground.style.background = `url(${sunny})`;
        conditionBackground.style.opacity = 1;
        this.applyBackgroundStyling(conditionBackground);
      });
    } else if (condition.includes("mist") || condition.includes("fog")) {
      if (conditionBackground.style.background == fog) {
        return;
      }
      conditionBackgroundTemp.style.background = `url(${fog})`;
      this.applyBackgroundStyling(conditionBackgroundTemp);
      this.fadeBackground(conditionBackground).then(() => {
        conditionBackground.style.background = `url(${fog})`;
        conditionBackground.style.opacity = 1;
        this.applyBackgroundStyling(conditionBackground);
      });
    } else if (condition.includes("rain")) {
      if (conditionBackground.style.background == rain) {
        return;
      }
      conditionBackgroundTemp.style.background = `url(${rain})`;
      this.applyBackgroundStyling(conditionBackgroundTemp);
      this.fadeBackground(conditionBackground).then(() => {
        conditionBackground.style.background = `url(${rain})`;
        conditionBackground.style.opacity = 1;
        this.applyBackgroundStyling(conditionBackground);
      });
    } else if (condition.includes("snow")) {
      if (conditionBackground.style.background == snow) {
        return;
      }
      conditionBackgroundTemp.style.background = `url(${snow})`;
      this.applyBackgroundStyling(conditionBackgroundTemp);
      this.fadeBackground(conditionBackground).then(() => {
        conditionBackground.style.background = `url(${snow})`;
        conditionBackground.style.opacity = 1;
        this.applyBackgroundStyling(conditionBackground);
      });
    } else if (condition.includes("wind")) {
      if (conditionBackground.style.background == wind) {
        return;
      }
      conditionBackgroundTemp.style.background = `url(${wind})`;
      this.applyBackgroundStyling(conditionBackgroundTemp);
      this.fadeBackground(conditionBackground).then(() => {
        conditionBackground.style.background = `url(${wind})`;
        conditionBackground.style.opacity = 1;
        this.applyBackgroundStyling(conditionBackground);
      });
    }
  }

  // Updates the hourly forecast with the provided data.
  static updateForecastHourly(data) {
    const forecastHours = Array.from(
      document.getElementsByClassName("forecast-hour")
    );
    const forecastHourTemperatures = Array.from(
      document.getElementsByClassName("forecast-hour-temperature")
    );
    const forecastHourConditions = Array.from(
      document.getElementsByClassName("forecast-hour-condition")
    );
    const forecastHourImages = Array.from(
      document.getElementsByClassName("forecast-hour-image")
    );

    // loops through each hour for each statistic and assigns the data.
    forecastHours.forEach((hour, index) => {
      hour.textContent = format(
        new Date(data.forecast.forecastday[0].hour[index].time),
        "p"
      );
    });

    // Checks which temperature display is selected and uses ternary operator to apply the correct temperature.
    forecastHourTemperatures.forEach((hourTemp, index) => {
      Weather.getTempDisplay() == "celsius"
        ? (hourTemp.textContent =
            data.forecast.forecastday[0].hour[index].temp_c + "°C")
        : (hourTemp.textContent =
            data.forecast.forecastday[0].hour[index].temp_f + "°F");
    });

    forecastHourConditions.forEach((hourCondition, index) => {
      hourCondition.textContent =
        data.forecast.forecastday[0].hour[index].condition.text;
    });

    forecastHourImages.forEach((hourImage, index) => {
      hourImage.src =
        "https:" + data.forecast.forecastday[0].hour[index].condition.icon;
    });
  }

  // Updates the daily forecast with the provided data.
  static updateForecastDaily(data) {
    const forecastDayOneDay = document.getElementById("forecast-day-one-day");
    const forecastDayOneTemperatureHigh = document.getElementById(
      "forecast-day-one-temperature-high"
    );
    const forecastDayOneTemperatureLow = document.getElementById(
      "forecast-day-one-temperature-low"
    );
    const forecastDayOneCondition = document.getElementById(
      "forecast-day-one-condition"
    );
    const forecastDayOneImage = document.getElementById(
      "forecast-day-one-image"
    );

    const forecastDayTwoDay = document.getElementById("forecast-day-two-day");
    const forecastDayTwoTemperatureHigh = document.getElementById(
      "forecast-day-two-temperature-high"
    );
    const forecastDayTwoTemperatureLow = document.getElementById(
      "forecast-day-two-temperature-low"
    );
    const forecastDayTwoCondition = document.getElementById(
      "forecast-day-two-condition"
    );
    const forecastDayTwoImage = document.getElementById(
      "forecast-day-two-image"
    );

    const forecastDayThreeDay = document.getElementById(
      "forecast-day-three-day"
    );
    const forecastDayThreeTemperatureHigh = document.getElementById(
      "forecast-day-three-temperature-high"
    );
    const forecastDayThreeTemperatureLow = document.getElementById(
      "forecast-day-three-temperature-low"
    );
    const forecastDayThreeCondition = document.getElementById(
      "forecast-day-three-condition"
    );
    const forecastDayThreeImage = document.getElementById(
      "forecast-day-three-image"
    );

    // Formats the date provided into the needed format. See date-fns format.
    forecastDayOneDay.textContent = format(
      new Date(data.forecast.forecastday[0].date),
      "cccc"
    );
    // Checks which temperature display is currently selected and uses the ternary operator to assign the correct tempertaure.
    Weather.getTempDisplay() == "celsius"
      ? (forecastDayOneTemperatureHigh.textContent =
          data.forecast.forecastday[0].day.maxtemp_c + "°C")
      : (forecastDayOneTemperatureHigh.textContent =
          data.forecast.forecastday[0].day.maxtemp_f + "°F");
    Weather.getTempDisplay() == "celsius"
      ? (forecastDayOneTemperatureLow.textContent =
          data.forecast.forecastday[0].day.mintemp_c + "°C")
      : (forecastDayOneTemperatureLow.textContent =
          data.forecast.forecastday[0].day.mintemp_f + "°F");
    forecastDayOneCondition.textContent =
      data.forecast.forecastday[0].day.condition.text;
    forecastDayOneImage.src =
      "https:" + data.forecast.forecastday[0].day.condition.icon;

    forecastDayTwoDay.textContent = format(
      new Date(data.forecast.forecastday[1].date),
      "cccc"
    );
    Weather.getTempDisplay() == "celsius"
      ? (forecastDayTwoTemperatureHigh.textContent =
          data.forecast.forecastday[1].day.maxtemp_c + "°C")
      : (forecastDayTwoTemperatureHigh.textContent =
          data.forecast.forecastday[1].day.maxtemp_f + "°F");
    Weather.getTempDisplay() == "celsius"
      ? (forecastDayTwoTemperatureLow.textContent =
          data.forecast.forecastday[1].day.mintemp_c + "°C")
      : (forecastDayTwoTemperatureLow.textContent =
          data.forecast.forecastday[1].day.mintemp_f + "°F");
    forecastDayTwoCondition.textContent =
      data.forecast.forecastday[1].day.condition.text;
    forecastDayTwoImage.src =
      "https:" + data.forecast.forecastday[1].day.condition.icon;

    forecastDayThreeDay.textContent = format(
      new Date(data.forecast.forecastday[2].date),
      "cccc"
    );
    Weather.getTempDisplay() == "celsius"
      ? (forecastDayThreeTemperatureHigh.textContent =
          data.forecast.forecastday[2].day.maxtemp_c + "°C")
      : (forecastDayThreeTemperatureHigh.textContent =
          data.forecast.forecastday[0].day.maxtemp_f + "°F");
    Weather.getTempDisplay() == "celsius"
      ? (forecastDayThreeTemperatureLow.textContent =
          data.forecast.forecastday[2].day.mintemp_c + "°C")
      : (forecastDayThreeTemperatureLow.textContent =
          data.forecast.forecastday[0].day.mintemp_f + "°F");
    forecastDayThreeCondition.textContent =
      data.forecast.forecastday[2].day.condition.text;
    forecastDayThreeImage.src =
      "https:" + data.forecast.forecastday[2].day.condition.icon;
  }

  // Updates the statistics provided by the data.
  static updateStatistics(data) {
    const locationFeelsLike = document.getElementById("location-feels-like");
    const locationHumidity = document.getElementById("location-humidity");
    const locationChanceRain = document.getElementById("location-chance-rain");
    const locationWindSpeed = document.getElementById("location-wind-speed");

    // Checks which temperature display is currently selected and uses the ternary operator to assign the correct tempertaure.
    Weather.getTempDisplay() == "celsius"
      ? (locationFeelsLike.textContent = data.current.feelslike_c + "°C")
      : (locationFeelsLike.textContent = data.current.feelslike_f + "°F");
    locationHumidity.textContent = data.current.humidity + "%";
    locationChanceRain.textContent =
      data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
    locationWindSpeed.textContent = data.current.wind_kph + "km/h";
  }

  // Updates the summary with the data provided.
  static updateSummary(data) {
    const locationTitle = document.getElementById("location-title");
    const locationRegion = document.getElementById("location-region");
    const locationCondition = document.getElementById("location-condition");
    const locationTemperature = document.getElementById("location-temperature");
    const locationDate = document.getElementById("location-date");
    const locationTime = document.getElementById("location-time");
    const dayNightIcon = document.getElementById("day-night-icon");
    const locationImage = document.getElementById("location-image");

    locationTitle.textContent = data.location.name;
    data.location.region == ""
      ? (locationRegion.textContent = "Undefined")
      : (locationRegion.textContent = data.location.region);
    locationCondition.textContent = data.current.condition.text;
    Weather.getTempDisplay() == "celsius"
      ? (locationTemperature.textContent = data.current.temp_c + "°C")
      : (locationTemperature.textContent = data.current.temp_f + "°F");
    locationDate.textContent = format(
      new Date(data.location.localtime),
      "PPPP"
    );
    locationTime.textContent = format(new Date(data.location.localtime), "p");
    if (data.current.is_day == 1) {
      dayNightIcon.classList.add("fa-sun");
      dayNightIcon.classList.remove("fa-moon");
    } else {
      dayNightIcon.classList.add("fa-moon");
      dayNightIcon.classList.remove("fa-sun");
    }
    locationImage.src = "https:" + data.current.condition.icon;
  }

  // Middle function with several callbacks for updating the location.
  static updateLocation(data) {
    this.updateSummary(data);
    this.updateStatistics(data);
    this.updateForecastDaily(data);
    this.updateForecastHourly(data);
    this.updateBackground(data.current.condition.text);
  }

  // Initialises the event listeners in the application.
  static initEventListeners() {
    const searchInput = document.getElementById("search-item");
    const searchForm = document.getElementById("search-form");
    const searchError = document.getElementById("search-error");
    const btnSwitchTemp = document.getElementById("btn-switch-temp");
    const btnSwitchDaily = document.getElementById("btn-switch-daily");
    const btnSwitchHourly = document.getElementById("btn-switch-hourly");
    const forecastDailyContainer = document.getElementById(
      "forecast-daily-container"
    );
    const forecastHourlyContainer = document.getElementById(
      "forecast-hourly-container"
    );
    const forecastHourlyThirdOne = document.getElementById(
      "forecast-hourly-third-one"
    );
    const forecastHourlyThirdTwo = document.getElementById(
      "forecast-hourly-third-two"
    );
    const forecastHourlyThirdThree = document.getElementById(
      "forecast-hourly-third-three"
    );
    const thirdCircles = Array.from(
      document.getElementsByClassName("third-circle")
    );

    // Search Input Validation.
    searchInput.addEventListener("input", () => {
      if (searchInput.validity.tooShort) {
        searchError.textContent = "Location needs to be at least 3 characters";
        searchError.classList.add("active");
        searchForm.style.borderBottom = "1px solid var(--error-color)";
      } else if (searchInput.validity.valueMissing) {
        searchError.textContent = "Location is required";
        searchError.classList.add("active");
        searchForm.style.borderBottom = "1px solid var(--error-color)";
      } else if (searchInput.checkValidity()) {
        searchInput.textContent = "";
        searchError.classList.remove("active");
        searchForm.style.borderBottom = "1px solid var(--valid-color)";
      }
    });

    // Search Form Validation.
    searchForm.addEventListener("submit", (e) => {
      if (searchInput.validity.tooShort) {
        searchError.textContent = "Location needs to be at least 3 characters";
        searchError.classList.add("active");
        searchForm.style.borderBottom = "1px solid var(--error-color)";
      } else if (searchInput.validity.valueMissing) {
        searchError.textContent = "Location is required";
        searchError.classList.add("active");
        searchForm.style.borderBottom = "1px solid var(--error-color)";
      }

      // If form is valid get data, save locally and update location.
      if (searchForm.checkValidity()) {
        e.preventDefault();
        this.getWeatherData(searchInput.value).then((data) => {
          if (data.error) {
            searchError.textContent = "No matching location found";
            searchError.classList.add("active");
            searchForm.style.borderBottom = "1px solid var(--error-color)";
            return;
          }
          this.setData(data);
          this.updateLocation(data);
        });
        searchError.classList.remove("active");
        searchError.textContent = "";
        searchInput.value = "";
        searchForm.style.borderBottom = "1px solid var(--color-main)";
      } else {
        e.preventDefault();
      }
    });

    // Use local data to switch the temperature display values.
    btnSwitchTemp.addEventListener("click", () => {
      Weather.getTempDisplay() == "celsius"
        ? Weather.setTempDisplay("fahrenheit")
        : Weather.setTempDisplay("celsius");
      this.updateLocation(this.getData());
    });

    // Show the daily forecast and hide the hourly.
    btnSwitchDaily.addEventListener("click", (e) => {
      e.target.classList.add("active");
      e.target.parentNode.children[1].classList.remove("active");
      forecastDailyContainer.style.display = "flex";
      forecastHourlyContainer.style.display = "none";
    });

    // Show the hourly forecast and hide the daily.
    btnSwitchHourly.addEventListener("click", (e) => {
      e.target.classList.add("active");
      e.target.parentNode.children[0].classList.remove("active");
      forecastDailyContainer.style.display = "none";
      forecastHourlyContainer.style.display = "flex";
      forecastHourlyThirdTwo.style.display = "none";
      forecastHourlyThirdThree.style.display = "none";
    });

    // When a circle is pressed, check which circle was pressed, set as active and the rest as inactive and switch to the corresponding hourly third.
    thirdCircles.forEach((circle) => {
      circle.addEventListener("click", (e) => {
        thirdCircles.forEach((circle, index) => {
          circle.children[0].classList.remove("fa-solid");
          circle.children[0].classList.add("fa-regular");

          if (e.target.parentNode == circle) {
            if (index == 0) {
              forecastHourlyThirdOne.style.display = "flex";
              forecastHourlyThirdTwo.style.display = "none";
              forecastHourlyThirdThree.style.display = "none";
            } else if (index == 1) {
              forecastHourlyThirdOne.style.display = "none";
              forecastHourlyThirdTwo.style.display = "flex";
              forecastHourlyThirdThree.style.display = "none";
            } else if (index == 2) {
              forecastHourlyThirdOne.style.display = "none";
              forecastHourlyThirdTwo.style.display = "none";
              forecastHourlyThirdThree.style.display = "flex";
            }
          }
        });
        e.target.classList.remove("fa-regular");
        e.target.classList.add("fa-solid");
      });
    });
  }

  // Initialise app and set default location to Bedford.
  static initApp() {
    this.initEventListeners();
    this.getWeatherData("Bedford").then((data) => {
      this.setData(data);
      this.updateLocation(data);
    });
  }
}

Display.initApp();
