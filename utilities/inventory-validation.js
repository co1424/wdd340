const utilities = require("./index")
const {
    body,
    validationResult
} = require("express-validator")
const validate = {}


/*  **********************************
 *  New Classification Data Validation Rules
 * ********************************* */
validate.newClassificationRules = () => {

    return [
        body("classification_name")
        .trim()
        .escape()
        .isLength({
            min: 1
        })
        .isAlpha()
        .withMessage("Please provide a valid Classification Name.")
    ]
}

/*  **********************************
 *  Add new vehicle Data Validation Rules
 * ********************************* */

validate.addNewVehicleRules = () => {
    return [
        // make is required and must be string
        body("inv_make")
        .trim()
        .escape()
        .isLength({
            min: 1
        })
        .isAlpha()
        .withMessage("Please provide the vehicle's make."), // on error this message is sent.

        // model is required and must be string integer or both
        body("inv_model")
        .trim()
        .escape()
        .isLength({
            min: 1
        })
        .isAlphanumeric()
        .withMessage("Please provide the vehicle's model."), // on error this message is sent.

        // year is required and must be a 4 digits integer 
        body("inv_year")
        .trim()
        .escape()
        .isInt()
        .withMessage("Year MUST BE numbers only")
        .isLength({
            min: 4
        })
        .withMessage("Year MUST BE 4 digits e.g. 2022")
        .isLength({
            max: 4
        })
        .withMessage("Year MUST be 4 digits e.g. 2022")
        .withMessage("Please provide the vehicle's year."), // on error this message is sent.

        // description is required and can contain string, integer, and symbols.
        body("inv_description")
        .trim()
        .isLength({
            max: 206
        })
        .withMessage("The description can't be longer than 4 lines.")
        .withMessage("Please provide the vehicle's description."), // on error this message is sent.

        // image is required and can contain string, integer, and symbols.
        body("inv_image")
        .trim()
        .isLength({
            min: 1
        })
        .withMessage("Please provide the vehicle's image."), // on error this message is sent.

        // thumbnail is required and can contain string, integer, and symbols.
        body("inv_thumbnail")
        .trim()
        .isLength({
            min: 1
        })
        .withMessage("Please provide the vehicle's thumbnail."), // on error this message is sent.

        // price is required and must be 1-7 digits.
        body("inv_price")
        .trim()
        .escape()
        .isDecimal()
        .isLength({
            min: 1
        })
        .isLength({
            max: 10
        })
        .withMessage("Price must be between 1 and 10 digits."), // on error this message is sent.

        // miles is required and must be a 1-6 digits integer.
        body("inv_miles")
        .trim()
        .escape()
        .isInt()
        .withMessage("Miles MUST be numbers only")
        .isLength({
            min: 1
        })
        .withMessage("Miles MUST be at least 1 digit e.g. 5799")
        .isLength({
            max: 6
        })
        .withMessage("Miles has to be at most 6 digits e.g. 234567")
        .withMessage("Please provide the vehicle's milage."), // on error this message is sent.

        // color is required and must be string
        body("inv_color")
        .trim()
        .escape()
        .isLength({
            min: 1
        })
        .isAlpha()
        .withMessage("Please provide the vehicle's color."), // on error this message is sent.


    ]
}


/*  **********************************
 *  Check New Classification data and return errors
 * ********************************* */
validate.checkNewClassificationNameData = async (req, res, next) => {
    const {
        classification_name
    } = req.body
    let = errors = []
    errors = validationResult(req)

    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("../views/inventory/newClassificationForm", {
            errors,
            message: null,
            nav,
            title: "Add new Classification",
            classification_name,
        })
        return
    }
    next()
}

/*  **********************************
 *  Check login data and return errors
 * ********************************* */

validate.checkAddNewVehicleData = async (req, res, next) => {
    const {
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
    } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let dropdownMenu = await utilities.buildDropdown(classification_id) //dynamic dropdown(stickiness)
        res.render("../views/inventory/newVehicleForm.ejs", {
            errors,
            message: null,
            title: "Add new vehicle",
            nav,
            dropdownMenu,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
        })
        return
    }
    next()

}


module.exports = validate;