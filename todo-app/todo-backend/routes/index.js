const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});
router.get('/statistics', async (req, res) => {
  let added_todos_counter = await redis.getAsync('added_todos_counter')
  if (!added_todos_counter) {
    added_todos_counter = 0
  } else {
    added_todos_counter = Number(added_todos_counter)
  }
  res.send({
    added_todos: added_todos_counter
  });
});

module.exports = router;
