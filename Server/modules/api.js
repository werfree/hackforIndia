// placeUrl = https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,formatted_phone_number&key=
policeUrl =
  "https://maps.googleapis.com/maps/api/place/search/json?location=22.6219578,88.4158157&rankby=distance&types=police&sensor=false&key=";
const fetch = require("node-fetch");
require("dotenv/config");

exports.policeAPI = (lat, long) => {
  fetch(policeUrl + process.env.apiKey)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};
