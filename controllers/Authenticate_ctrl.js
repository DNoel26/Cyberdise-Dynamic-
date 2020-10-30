const express = require("express");
const router = express.Router();

const {customer_login_form} = require("../middleware/Validate_mw.js");

//*****AUTHENTICATION CONTROLS

router.post("/auth/login",customer_login_form,function(req,res){

    /*console.log(req.login_customer.email,req.login_customer.username,req.login_customer.username_email);

    console.log("SUCCESSFULLY LOGGED IN");*/

    res.redirect("/products/all-products"); 
});

module.exports = router;