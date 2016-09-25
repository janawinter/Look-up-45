var express = require('express')
var Discogs = require ('disconnect').Client
var Promise = require('promise');
var token =  'SruQyLPLfHFHGbtBrccWVtSDXydYiLlYEVnHSKsW'

module.exports = {
  get: get,
  post: post
}

function get (req, res) {
  res.render ('index')
}

//function call using the API
function post (req, res) {
  var catalogueNumber = req.body.id
  var db = new Discogs({userToken: token}).database()
  db.search(catalogueNumber, function (err, releaseData) {
    if (err) console.log(err)
    if (releaseData) {
      //what comes back from discogs
      var releases = releaseData.results
      var promises = []
      for (var ii = 0; ii < releases.length; ii++) {
        //for every loop-get 'getAveragePrice' promise
        var getPrice = getAveragePrice(releases[ii].id)
        //push to promises array
        promises.push(getPrice)
        //when promise is resolved, add price to this release object
        getPrice.then(updateObj.bind(null, releases, ii))
      }
      //when all promises in promises array have been resolved - render page with results
      Promise.all(promises).then(function() {
        res.render ('index', {releaseData: releases})
      });
    }
  })
}
//add the price to the release- cant do this directly in the promise.then
function updateObj(releases, ii, price) {
  releases[ii].price = price
}

function getAveragePrice (releaseId) {
  //returns a promise
  return new Promise(function(resolve, reject) {
    //use the discogs marketplace
    var marketplace = new Discogs({userToken: token}).marketplace()
    //getting price suggestions for release ID (condition)
    marketplace.getPriceSuggestions(releaseId, function (err, priceData) {
      if (err) console.log (err)
      var prices = 0
      var count = 0
      for (var key in priceData) {
        //adding price for each condition
        prices += priceData[key].value
        //increment for each record condition price
        count++
      }
      if (prices>0) {
        //math for average price
        resolve((prices / count).toFixed(2))
      }
      else {
        resolve('N/A')
      }
    })
  })
}
