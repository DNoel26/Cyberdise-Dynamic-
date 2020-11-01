const express = require("express");
const router = express.Router();

const send_email = require("../middleware/Nodemailer_mw.js");
const {customer_login_form} = require("../middleware/Validate_mw.js");

//*****AUTHENTICATION CONTROLS

router.post("/auth/login",customer_login_form,function(req,res){

    send_email
    .catch(console.error);

    console.log(req.is_header_login);
    //console.log(req.login_customer.email,req.login_customer.username,req.login_customer.username_email);
    if(req.is_header_login)
    {
        console.log("SUCCESSFULLY LOGGED IN FROM HEADER LOGIN");
        
        

        //res.redirect("/products/all-products");
        /*let login_error = 
        {
            username: "You must enter an email or username as well",
            password: "You must enter a password"
        };
        let login_error_str = JSON.stringify(login_error); //can use res.json
        res.set('Content-Type', 'application/json');
        res.send(login_error_str);*/
    }
    
    else
    {
        console.log("SUCCESSFULLY LOGGED IN FROM SIGNUP/LOGIN PAGE");

        res.redirect("/products/all-products"); 
    };
});

/*router.post("/auth/fast-login",customer_login_form,function(req,res){//

    login_error = 
    {
        username: "You must enter an email or username as well",
        password: "You must enter a password"
    };

    login_error_str = JSON.stringify(login_error); //can use res.json

    res.set('Content-Type', 'application/json');
    res.send(login_error_str);

    //res.redirect("/products/all-products"); 
});*/

module.exports = router;