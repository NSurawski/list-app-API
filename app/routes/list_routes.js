const express = require('express')
const passport = require('passport')

// pull in Mongoose model
const List = require('../models/list_item')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX user list
// GET /lists/user
router.get('/lists', requireToken, (req, res, next) => {
  // console.log('user is ', req.user)
  List.find({ owner: req.user._id })
    .populate('owner', '_id email')
    .then(lists => lists.map(list => list.toObject()))
    .then(lists => {
      res.status(200).json({ lists: lists })
    })
    .catch(next)
})

// CREATE
// POST /lists
router.post('/lists', requireToken, (req, res, next) => {
  // set owner of new list to be current user
  req.body.list.owner = req.user.id

  List.create(req.body.list)
    .then(list => {
      res.status(201).json({ list: list.toObject() })
    })
    .catch(next)
})

// DESTROY
// DELETE /lists/5a7db6c74d55bc51bdf39793
router.delete('/lists/:id', requireToken, (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    .then(list => {
      requireOwnership(req, list)
      list.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
