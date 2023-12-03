const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const authSecret = "MyNameIsEndToEndYouTubeChannel$#";

const bcrypt = require("bcryptjs");

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("password", "Incorrect Password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ error: "Try Enter Correct Credentials" });
      }
      // bcrypt compare password and using jwt

      const pwdCompapre = bcrypt.compare(req.body.password, userData.password);
      //   if (req.body.password !== userData.password) {
      if (!pwdCompapre) {
        return res.status(400).json({ error: "Try Enter Correct Credentials" });
      }

      // Gettting data from userData for jwtAuth payload
      const data = {
        user: {
          id: userData.id,
        },
      };

      // sign to create 32 bit authToken

      const authToken = jwt.sign(data, authSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
