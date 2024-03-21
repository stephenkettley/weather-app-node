const request = require("request");

const getTemperature = (place, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=a4195b02bb574f7cb2e112108241603&q=${place}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = getTemperature;
