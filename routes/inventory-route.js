// Needed Resources 
const express = require("express");
const router = new express.Router();

const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassification);
// CURRENTLY WORKING ON THIS LINE:
router.get("/detail/:inv_id", invController.buildVehicle);

// Route to Management View
router.get("/management-view", invController.buildManagement);


// Route to get to new classification form:
router.get("/newClassificationForm.ejs", invController.buildNewClassification);

// Route to get view
router.post("/AddNewClassification", invController.AddNewClassification);



// Route to get to new vehicle form:
router.get("/newVehicleForm.ejs", invController.buildNewVehicle);

// ADD NEW VEHICLE TO INVENTORY
router.post("/new-vehicle", invController.AddNewVehicle);


module.exports = router;