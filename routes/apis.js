var express = require('express');
var router = express.Router();
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;

router.get('/countries', function(req, res, next) {
  try {
    res.json(Country.getAllCountries()) 
  } catch (error) {
    res.json([])
  }
});

router.get('/countries/:code', function(req, res, next) {
  try {
    res.json(Country.getCountryByCode(req.params.code))
  } catch (error) {
    res.json([])
  }
});

router.get('/countries/:code/states', function(req, res, next) {
  try {
    res.json(State.getStatesOfCountry(req.params.code))
  } catch (error) {
    res.json([])
  }
});

router.get('/countries/:code/cities', function(req, res, next) {
  try {
    res.json(City.getCitiesOfCountry(req.params.code))
  } catch (error) {
    res.json([])
  }
});

router.get('/countries/:countryCode/states/:stateCode/cities', function(req, res, next) {
  try {
    res.json(City.getCitiesOfState(req.params.countryCode, req.params.stateCode))
  } catch (error) {
    res.json([])
  }
});



module.exports = router;
