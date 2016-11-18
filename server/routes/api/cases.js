"use strict";

const express = require('express');
const router  = express.Router();

module.exports = () => {

  const user_id = 1;

  // --------------------------------------------------------------------------
  // Get all cases

  router.get("/", (req, res) => {
    res.json('hello there');
  });

  return router;
}
