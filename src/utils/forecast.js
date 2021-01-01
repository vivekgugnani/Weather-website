const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=3d044a250241b395a843403572a0e966&units=metric";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //console.log(error)
      callback("Unable to connect to weather service!", undefined);
    } else if (body.message) {
      callback("Unable to find weather location", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        "There is currently " +
          data.temp +
          " degrees out, and there are " +
          data.clouds +
          "% chances of rain"
      );
    }
  });
};
module.exports = forecast;
