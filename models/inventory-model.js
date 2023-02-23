const pool = require("../database/index.js")


/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

// 

async function getVehiclesByClassificationId(classificationId) {
    try {
        const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1",
            [classificationId])

        return data.rows
    } catch (error) {
        console.log('getclassificationsbyid error' + error)
    }
}

async function getVehicleByInventoryId(inv_id) {
    try {
        const data = await pool.query("SELECT * FROM public.inventory WHERE inv_id = $1", [inv_id])

        return data.rows

    } catch (error) {
        console.log('getVehicleByInventoryId' + error)

    }
}


/* ***************************
 *  Create new classification
 * ************************** */

async function AddNewClassification(
    classification_name
) {
    try {
        const sql =
            "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"
        return await pool.query(sql, [classification_name]);
    } catch (error) {
        return error.message
    }
}

/* ***************************
 *  Add new vehicle to inventory
 * ************************** */
async function AddNewVehicle(

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
) {
    try {
        const sql =
            "INSERT INTO public.inventory (classification_id, inv_make, inv_model,inv_year, inv_description, inv_image,inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        return await pool.query(sql,
            [classification_id,
                inv_make,
                inv_model,
                inv_year,
                inv_description,
                inv_image,
                inv_thumbnail,
                inv_price,
                inv_miles,
                inv_color

            ]
        );
    } catch (error) {
        return error.message
    }
}


module.exports = {
    getClassifications,
    getVehiclesByClassificationId,
    getVehicleByInventoryId,
    AddNewClassification,
    AddNewVehicle
};