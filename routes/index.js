var express = require('express')
// var development = require('../knexfile').development
// var knex = require('knex')(development)
var token =  'SruQyLPLfHFHGbtBrccWVtSDXydYiLlYEVnHSKsW'
var Discogs = require ('disconnect').Client

module.exports = {
  get: get,
  post: post,
  getRelease:getRelease
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
  var id = req.body.id
  var db = new Discogs({userToken:token}).database()
  db.search(id, function (err, releaseData) {
    console.log(err)
    console.log (releaseData.results[0].format)
    if (releaseData) {
      res.render('index', {releaseData:releaseData.results})
    }
  })
}

  function getRelease (req, res) {
    var id = req.params.id
    var marketplace = new Discogs({userToken:token}).marketplace()
    marketplace.getPriceSuggestions (id, function (err, priceData) {
      console.log (err)
      // console.log(priceData)
      var prices= 0
      var count= 0
      for (var key in priceData) {
        prices += priceData[key].value
        // console.log (priceData[key].value)
        count ++
      }
      var averagePrice= (prices / count).toFixed(2)
      // {Math.round(this.getCelsius(this.props.temp), -1)}
      console.log (averagePrice)
    })

  }
