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

app.get("/weather", (req, res) => {
  res.render("error", {
    name: "Stephen Kettley",
    mainError: "No City",
    errorDesc:
      "Please enter the name of a city as an additional route! e.g. weather/tokyo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Stephen Kettley",
    desc: "This is a weather app built using Node.js, Express.js and Handlebars.js",
    title: "About The Project",
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
  res.render("error", {
    mainError: "404 - Not Found",
    errorDesc: "The page you are looking for does not exist!",
    name: "Stephen Kettley",
  });
});

app.listen(port, () => console.log(`server is running on port ${port}...`));
