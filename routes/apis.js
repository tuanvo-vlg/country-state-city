var express = require('express');
var router = express.Router();
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;
const fs = require('fs');
const path = require('path');

router.get('/countries', function (req, res, next) {
  try {
    res.json(Country.getAllCountries())
  } catch (error) {
    res.json([])
  }
});

router.get('/countries/:code', function (req, res, next) {
  try {
    res.json(Country.getCountryByCode(req.params.code))
  } catch (error) {
    res.json([])
  }
});

router.get('/countries/:code/states', function (req, res, next) {
  try {
    res.json(State.getStatesOfCountry(req.params.code))
  } catch (error) {
    res.json([])
  }
});

router.get('/countries/:code/cities', function (req, res, next) {
  try {
    res.json(City.getCitiesOfCountry(req.params.code))
  } catch (error) {
    res.json([])
  }
});

router.get('/countries/:countryCode/states/:stateCode/cities', function (req, res, next) {
  try {
    res.json(City.getCitiesOfState(req.params.countryCode, req.params.stateCode))
  } catch (error) {
    res.json([])
  }
});

router.get('/luckydraw/participants', function (req, res, next) {
  try {
    const filePath = __dirname + '/participants.json';
    console.log(__dirname)
    // Đọc nội dung của file JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      const jsonData = JSON.parse(data);
      return res.json(jsonData)

    });
  } catch (error) {
    res.json([])
  }
});

router.put('/luckydraw/participants', function (req, res, next) {
  try {
    const filePath = __dirname + '/participants.json';
    console.log(__dirname)
    // Đọc nội dung của file JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      // Chuyển đổi JSON thành đối tượng JavaScript
      const jsonData = JSON.parse(data);
      const winner = jsonData.find(participant => !participant.hasAppeared && participant.isWinners);

      jsonData.forEach(participant => {
        if (participant.id === winner.id) {
          participant.hasAppeared = true;
        }
      });

      // Chuyển đối tượng JavaScript thành chuỗi JSON
      const updatedJson = JSON.stringify(jsonData, null, 2);

      // Ghi nội dung mới vào file JSON
      fs.writeFile(filePath, updatedJson, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('File JSON đã được cập nhật thành công.');
          return res.json(winner)
        }
      });
    });
  } catch (error) {
    res.json([])
  }
});


module.exports = router;
