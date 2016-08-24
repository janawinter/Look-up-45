var development = require('../knexfile').development
var knex = require('knex')(development)
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

// router.use(bodyParser.json())
module.exports = {
  post: post,
  get: get
}

function post (req, res) {
  //console.log(req)
  knex('collection')
  .insert({
    artist:req.body.artist,
    year:req.body.year,
    catno:req.body.catno,
    price:req.body.price,
    releaseId:req.body.releaseId
  })
  .then(function () {
    res.status(204).send('updated collection')
  })
  .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}


function get (req, res) {
  knex('collection')
    .select()
    .then(function (collection) {
      res.render('collection', { collection: collection })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })

}
