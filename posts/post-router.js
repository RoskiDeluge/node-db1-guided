const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

// /api/posts

router.get('/', (req, res) => {
  db('posts')
  // db.select().from('posts')
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving posts", err })
    })
});

router.get('/:id', (req, res) => {

  db.select()
    .from('posts')
    .where({ id: req.params.id })
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(400).json({ message: "error retrieving post" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "database error", err })
    })
});

router.post('/', (req, res) => {
  const postData = req.body;

  db('posts')
  .insert(postData)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({ message: "Error posting post", err })
  })
});

router.put('/:id', (req, res) => {
  const changes = req.body;

  db('posts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ updated: count })
      } else {
        res.status(404).json({ message: "Invalid ID" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating", err })
    })
});

router.delete('/:id', (req, res) => {
  db('posts')
  .where({ id: req.params.id })
  .del()
  .then(deleted => {
    res.status(200).json(deleted)
  })
  .catch(err => {
    res.status(500).json({ message: "post deleted", err })
  })
});

module.exports = router;