const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.buildNav = function (data) {
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}
/* ************************
 * Builds the navigation bar
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    nav = Util.buildNav(data)
    return nav
}

/* ************************
 * Builds Detailed View
 ************************** */
Util.getDetailedView = async function (inv_id) {
    let data = await invModel.getVehicleByInventoryId(inv_id);
    let detailedView = Util.buildDetailedView(data)
    return detailedView
}

Util.buildDetailedView = async function (data) {
    let vehicle = data[0]
    let view = `
    <h1 class="h1-detailed-view">${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h1>
    <div class="vehicle-view">
        
        <hr>
        <img class="car-photo" src="${vehicle.inv_image}" alt="vehicle-photo"></img> 
        

        <div class="car-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model} Details</h2>

                <p class="car-price">Price: $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>
                <p class="car-description">Description: ${vehicle.inv_description}</p>
                <p>Color: ${vehicle.inv_color}</p>
                <p>Miles: ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)}</p>
                             
        </div>
                 
        </div>
    `
    return view
}

/* ************************
 * Builds Detailed View
 ************************** */

Util.AddNewClassification = async function () {
    let data = await invModel.getVehicleByInventoryId(inv_id);
    let detailedView = Util.buildDetailedView(data)
    return detailedView

}


/* ************************
 * Builds Dropdown menu
 ************************** */
Util.buildDropdown = function (data) {
    let list = `<select name="classification_id" id="classification_id">`

    data.rows.forEach((row) => {
        list += `<option value="${row.classification_id}">${row.classification_name}</option>`


    })
    list += "</select>"
    return list
}


Util.getDropdown = async function (req, res, next) {
    let data = await invModel.getClassifications()
    dropdown = Util.buildDropdown(data)
    return dropdown
}



module.exports = Util