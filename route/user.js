// Importing modules
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// Importing User Schema
const User = require("../model/user");

// User login api
router.post("/login", jsonParser, async (req, res) => {
  // Find user with requested email
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user === null) {
    return res.status(400).send({
      message: "User not found.",
    });
  } else {
    if (user.validPassword(req.body.password)) {
      return res.status(201).send({
        message: "User Logged In",
      });
    } else {
      return res.status(400).send({
        message: "Wrong Password",
      });
    }
  }
});

// User signup api
router.post("/signup", jsonParser, async (req, res, next) => {
  console.log(req.body);
  // Creating empty user object
  let newUser = new User();

  // Initialize newUser object with request data
  (newUser.name = req.body.name),
    (newUser.email = req.body.email),
    (newUser.password = req.body.password);

  // Call setPassword function to hash password
  newUser.setPassword(req.body.password);

  let data = await newUser.save();
  if (data) {
    return res.status(201).send({
      message: "User added successfully.",
    });
  } else {
    return res.status(400).send({
      message: "Failed to add user.",
    });
  }
});

// Export module to allow it to be imported in other files
module.exports = router;
