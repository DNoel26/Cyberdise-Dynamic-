const express = require("express");
const router = express.Router();
const {user_login_form} = require("../middleware/Validate_mw.js");
const {send_nodemail_on_login} = require("../middleware/Nodemailer_mw.js");
const {telesign_sms} = require("../middleware/Telesign_api_mw.js");

//*****AUTHENTICATION CONTROLS

router.post("/login",user_login_form,send_nodemail_on_login,function(req,res){

    req.session.user_info = req.selected_user;
    //console.log("REQ IS HEADER LOGIN AUTH LOGIN",req.is_header_login,"RES LOCALS LOGGED IN STATUS",logged_in);
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

        if(req.session.user_info.role === "employee")
        {
            res.redirect("/employee/my-account");
        }

        else if(req.session.user_info.role === "customer")
        {
            res.redirect("/products/all-products"); 
        }

        req.flash("message","Logged In Successfully!");
        //req.session.destroy();
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