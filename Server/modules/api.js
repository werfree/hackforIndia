placeUrl =
  "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,formatted_phone_number&key=";
policeUrl =
  "https://maps.googleapis.com/maps/api/place/search/json?location=22.6219578,88.4158157&rankby=distance&types=police&sensor=false&key=";
const fetch = require("node-fetch");
require("dotenv/config");

var url =
  "https://maps.googleapis.com/maps/api/place/search/json?location=22.6219578,88.4158157&rankby=distance&types=police&sensor=false&key=AIzaSyDHoHNJe_eRCz1AdhY0UgUprD-Bkc08V0Y";

sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

idPolice = (json, callback) => {
  var id = {};
  var result = json.results;
  console.log(result.length);
  for (var i = 0; i < result.length; i++) {
    id.push(result[i].place_id);
    console.log(result[i].place_id);
  }
  callback(id);
};

noPolice = async id => {
  var a = [];
  var check = 0;
  var i = 0;
  var bool = false;
  while (i < 3) {
    if (bool) await sleep(2000);
    fetch(
      "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
        id[i] +
        "&fields=name,formatted_phone_number&key=" +
        process.env.myapiKey
    )
      .then(res => res.json())
      .then(json => {
        //var nam = json.result.name;
        //var phn = json.result.formatted_phone_number;
        //a.push({ phn });
        if (json.status == "OK") {
          bool = false;
          i++;
          var name = json.result.name;
          console.log(name);
          check = 0;
        } else {
          console.log(json.status);
          bool = true;
        }
        //console.log(json.result.name);
      });
  }
  //console.log(a);
};

exports.policeAPI = (lat, long) => {
  fetch(process.env.policeUrl)
    .then(res => res.json())
    .then(json => {
      console.log(json.status);
      if (json.status == "OK") {
        idPolice(json, id => {
          noPolice(id);
        });
      } else {
        console.log(100);
      }
    })
    .catch(err => console.log(err));
};
