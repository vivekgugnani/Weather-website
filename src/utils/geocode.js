const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiamFzb24xMjM0IiwiYSI6ImNrajJmcHNqZjU2OWwyeXFqeWR4MTJpaHIifQ.MeGQquRZXNU5WV6i5Yyt1Q&limit=1";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find city, Try another location", undefined);
    } else {
      
      const lat = body.features[0].center[1];
      const lon = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        lat: lat,
        lon: lon,
        location: location,
      });
    }
  });
};

module.exports = geocode;
