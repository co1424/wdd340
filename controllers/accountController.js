const accountModel = require("../models/account-model");
const utilities = require('../utilities');
const bcrypt = require("bcryptjs")


// DELIVER LOGIN VIEW
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav();
    res.render("clients/login", {
        title: 'Login',
        nav,
        errors: null,
        message: null
    })
}

async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("clients/register", {
        title: "Register",
        nav,
        errors: null,
        message: null,
    })
}

/* ****************************************
 *  Process registration request
 **************************************** */
async function registerClient(req, res) {
    let nav = await utilities.getNav()
    const {
        client_firstname,
        client_lastname,
        client_email,
        client_password
    } =
    req.body

    // Hash the password before storing
    let hashedPassword
    try {
        // pass regular password and cost (salt is generated automatically)
        hashedPassword = await bcrypt.hashSync(client_password, 10)
    } catch (error) {
        res.status(500).render("clients/register", {
            title: "Registration",
            nav,
            message: 'Sorry, there was an error processing the registration.',
            errors: null,
        })
    }


    const regResult = await accountModel.registerClient(
        client_firstname,
        client_lastname,
        client_email,
        hashedPassword // WE ARE USING THE hashedPassword variable instead of the client_password for security purposes.
    )
    console.log(regResult)
    if (regResult) {
        res.status(201).render("clients/login.ejs", {
            title: "Login",
            nav,
            message: `Congratulations, you\'re registered ${client_firstname}. Please log in.`,
            errors: null,
        })
    } else {
        const message = "Sorry, the registration failed."
        res.status(501).render("clients/register.ejs", {
            title: "Registration",
            nav,
            message,
            errors: null,
        })
    }
}


/* ****************************************
 *  Process registration request
 **************************************** */


module.exports = {
    buildLogin,
    buildRegister,
    registerClient
};