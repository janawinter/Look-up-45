var express = require('express')
// var development = require('../knexfile').development
// var knex = require('knex')(development)
var token =  'SruQyLPLfHFHGbtBrccWVtSDXydYiLlYEVnHSKsW'
var Discogs = require ('disconnect').Client
var Promise = require('promise');

module.exports = {
  get: get,
  post: post,
  //getAveragePrice: getAveragePrice
}


function get (req, res) {
  res.render ('index')
  // knex('users')
  //   .select()
  //   .then(function (users) {
  //     res.render('index', { users: users })
  //   })
  //   .catch(function (err) {
  //     res.status(500).send('DATABASE ERROR: ' + err.message)
  //   })
}


function post (req, res) {
  var catalogueNumber = req.body.id
  var db = new Discogs({userToken: token}).database()
  db.search(catalogueNumber, function (err, releaseData) {
    if (err) console.log(err)
    if (releaseData) {
      var releases = releaseData.results
      getAveragePrice(releases).then(function(result) {
        res.render('index', {releaseData: result})
      }, function(err) {
        console.log(err);
      });
    }
  })
}

function getAveragePrice (releases) {
  return new Promise(function (resolve, reject) {
    for (var ii = 0; ii < releases.length; ii++) {
      var marketplace = new Discogs({userToken: token}).marketplace()
      marketplace.getPriceSuggestions(releases[ii].id, function (err, priceData) {
        if (err) console.log (err)
        var prices = 0
        var count = 0
        for (var key in priceData) {
          prices += priceData[key].value
          count++
        }
        //releases[ii].price = (prices / count).toFixed(2)
      })
    }
    resolve(releases)
  });
}
