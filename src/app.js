const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getTemperature = require("./utils/forecast");
const app = express();
const port = 3000;

// define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs"); // which view engine we are using
app.set("views", viewsPath); // where the view templates are found
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicDirectory));

// routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Stephen",
  });
});

app.get("/weather/:city", (req, res) => {
  const cityName =
    req.params.city.charAt(0).toUpperCase() + req.params.city.slice(1);
  getTemperature(cityName, (error, { current }) => {
    if (error) {
      res.send(error);
    } else {
      res.render("weather", {
        city: cityName,
        forecastOverall: `${current.condition.text}`,
        forecastDetails: `It is currently ${current.temp_c} degrees Celsius and the wind is blowing at ${current.gust_kph}kph`,
        title: "Daily Weather Report",
        name: "Stephen Kettley",
      });
    }
  });
});

app.use((req, res) => {
  res.send("404 Not Found");
});

app.listen(port, () => console.log(`server is running on port ${port}...`));
