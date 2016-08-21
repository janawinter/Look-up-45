var express = require('express')
// var development = require('../knexfile').development
// var knex = require('knex')(development)
var token =  'SruQyLPLfHFHGbtBrccWVtSDXydYiLlYEVnHSKsW'
var Discogs = require ('disconnect').Client
var Promise = require('promise');

module.exports = {
  get: get,
  post: post
}

function get (req, res) {
  res.render ('index')
}


function post (req, res) {
 var catalogueNumber = req.body.id
 var db = new Discogs({userToken: token}).database()
 db.search(catalogueNumber, function (err, releaseData) {
   if (err) console.log(err)
   if (releaseData) {
     var releases = releaseData.results
     var promises = []
     for (var ii = 0; ii < releases.length; ii++) {
       var getPrice = getAveragePrice(releases[ii].id)
       promises.push(getPrice)
       getPrice.then(updateObj.bind(null, releases, ii))

     }
     Promise.all(promises).then(function() {
       res.render ('index', {releaseData: releases})
     });
   }
 })
}

function updateObj(releases, ii, price) {
 releases[ii].price = price
}

function getAveragePrice (releaseId) {
 return new Promise(function(resolve, reject) {
   var marketplace = new Discogs({userToken: token}).marketplace()
   marketplace.getPriceSuggestions(releaseId, function (err, priceData) {
     if (err) console.log (err)
     var prices = 0
     var count = 0
     for (var key in priceData) {
       prices += priceData[key].value
       count++
     }
     if (prices>0) {
       resolve((prices / count).toFixed(2))
     }
     else {
      resolve('N/A')
    }
   })
 })
}
