"use strict";

const bcrypt = require("bcrypt");

module.exports = (knex) => {

  /**
  * Insert user into database
  */
  function insertUserInDatabase(user, callback) {
    bcrypt.hash(user.password, 10, (err, hash) => {

      console.log(hash);
      knex('users').insert({
        name: user.name,
        email: user.email,
        password: hash
      })
      .then(function (result) {
        if (result.rowCount) {
          return callback({success: true, message: 'User Created!'})
        }
      }).catch((err) => {
        callback({success: false, message: 'Something went wrong, try again'})
        console.log(err)
      });
    });
  }

  /**
  * Check if an email already exists
  */
  function userExists(user, callback) {
      knex
      .select("email")
      .from("users")
      .where('email', user.email)
      .then((result) => {

        if (result.length !== 0) {
          return callback({success: false, message: 'Email already exists'})
        } else {
          insertUserInDatabase(user, callback)
        }
      });
  }

  /**
  * Creating a new user into database
  */
  function createUser(user, callback) {
    if (user.password !== user.password_confirm) {
      return callback({success: false, message: 'Passwords does not matches'})
    }

    userExists(user, callback);
  }

  /**
  * Search for a specific user by email
  */
  function findOne(email, callback) {
      knex
      .select("*")
      .from("users")
      .where('email', email)
      .then((user) => {
        if (user.length !== 0) {
          return callback(null, user[0]);
        }

        return callback(null, null);
      })
      .catch((err) => callback(err, null));
  }

  /**
  * Find user by id
  */
  function findById(id, callback) {
      knex
      .select("*")
      .from("users")
      .where('id', id)
      .then((user) => {
        if (user.length !== 0) {
          return callback(null, user[0]);
        }
        return callback(null, null);

      })
      .catch((err) => callback(err, null));
  }


  return {
    createUser,
    findOne,
    findById
  };
};