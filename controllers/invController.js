const invModel = require("../models/inventory-model");
// const accountModel = require("../models/management-model");
const utilities = require("../utilities");


const invCont = {};

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId;
    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav();
    const className = data[0].classification_name
    res.render("./inventory/classification-view", {
        title: className + " vehicles",
        nav: nav,
        message: null,
        data: data,
    })
}

invCont.buildVehicle = async function (req, res, next) {
    const inv_id = req.params.inv_id;
    let data = await utilities.getDetailedView(inv_id)
    let nav = await utilities.getNav()
    const carYear = data[0].inv_year
    const carModel = data[0].inv_model
    const carMake = data[0].inv_make
    console.log(this.buildVehicle)
    res.render("./inventory/vehicle-detail", {
        title: `${carMake} ${carModel} ${carYear}`,
        nav,
        data,
        message: null

    })

}

invCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav();
    let managementTitle = 'Vehicle Management';

    res.render("./inventory/management-view", {
        title: managementTitle,
        nav,
        message: null,

    })

}


invCont.buildNewClassification = async function (req, res, next) {
    let nav = await utilities.getNav();

    res.render('inventory/newClassificationForm', {
        title: 'Add New Classification View',
        nav,
        message: null,
    })
}


invCont.buildNewVehicle = async function (req, res, next) {
    let nav = await utilities.getNav();

    res.render('inventory/newVehicleForm', {
        title: 'Add New Vehicle',
        nav,
        message: null,
    })
}


/* ****************************************
 *  Add new classification:
 **************************************** */

invCont.AddNewClassification = async function (req, res, next) {
    let nav = await utilities.getNav();
    const {
        classification_name
    } =
    req.body

    const regResult = await invModel.AddNewClassification(
        classification_name
    )
    console.log(regResult)
    if (regResult) {
        res.status(201).render("./inventory/management-view.ejs", {
            title: "Add New Vehicle Classification",
            nav,
            message: `The ${classification_name} vehicle classification was successfully added.`,
            errors: null,
        })
    } else {
        const message = `Sorry, the vehicle classification was NOT added.`
        res.status(501).render("inventory/newClassificationForm.ejs", {
            title: "Failed to add new Vehicle Classification",
            nav,
            message,
            errors: null,

        })
    }
}

/* ****************************************
 *  Add new vehicle to inventory:
 **************************************** */

invCont.AddNewVehicle = async function (req, res, next) {
    let nav = await utilities.getNav();
    const {
        classification_name,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color
    } =

    req.body

    const regResult = await invModel.AddNewVehicle(
        classification_name,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color
    )
    console.log(regResult)

    if (regResult) {
        res.status(201).render("./inventory/management-view.ejs", {
            title: "Add New Vehicle Classification",
            nav,
            message: `The ${inv_make} ${inv_model} vehicle was successfully added.`,
            errors: null,
        })
    } else {
        const message = `Sorry, the vehicle classification was NOT added.`
        res.status(501).render("inventory/newClassificationForm.ejs", {
            title: "Failed to add new Vehicle Classification",
            nav,
            message,
            errors: null,

        })
    }
}


module.exports = invCont;

// AddNewClassification
// AddNewVehicle