const cityCoords = {
    "bangalore": { lat: 12.97, lon: 77.59 },
    "delhi": { lat: 28.61, lon: 77.20 },
    "mumbai": { lat: 19.07, lon: 72.87 },
    "london": { lat: 51.51, lon: -0.13 },
    "new york": { lat: 40.71, lon: -74.01 }
  };
  $(document).ready(function () {
    $("#fetchBtn").on("click", function () {
      let city = $("#cityinput").val().toLowerCase();
      if (!cityCoords[city]) {
        $("#weather").html("City not in the list!");
        return;
      }
      let coords = cityCoords[city];
      let url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
      $.getJSON(url)
        .done(function (data) {
          if (data.current_weather) {
            $("#weather").html(`
              <h3>Weather in ${city}</h3>
              <p>Temp: ${data.current_weather.temperature}°C</p>
              <p>Wind: ${data.current_weather.windspeed} km/h</p>
              <p>Time: ${data.current_weather.time}</p>
            `);
          } else {
            $("#weather").html("No data available.");
          }
        })
        .fail(function () {
          $("#weather").html("Error fetching data");
        });
    });
  });
  