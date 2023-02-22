// Needed Resources 
const express = require("express");
const router = new express.Router();
const util = require("../utilities");
const accController = require("../controllers/accountController.js");

// "GET" route for the path that will be sent when the "My Account" link is clicked.
router.get("/login", accController.buildLogin);

// Route to deliver registration view:
router.get("/registration", accController.buildRegister);

// POST route for registration view:
router.post('/register', accController.registerClient);




module.exports = router;