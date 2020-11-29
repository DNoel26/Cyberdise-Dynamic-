const express = require("express");
const router = express.Router();
const {user_login_form} = require("../middleware/Validate_mw.js");
const {send_nodemail_on_login} = require("../middleware/Nodemailer_mw.js");
const {telesign_sms} = require("../middleware/Telesign_api_mw.js");
const ip_middleware = require("../middleware/Request_ip_mw.js");
const User_model = require("../models/MYSQL_models/User_mdl.js");
const General_model = require("../models/MYSQL_models/General_mdl.js");
const is_auth = require("../middleware/Authenticate_mw.js");
const {is_already_logged_in} = require("../middleware/Authorize_mw.js");
const { default: fetch, Body } = require("node-fetch");

//*****AUTHENTICATION CONTROLS

router.post("/login",is_already_logged_in,user_login_form,/*send_nodemail_on_login,*/ip_middleware,function(req,res){

    req.session.user_info = req.selected_user;
    req.session.user_info.logged_in = 1;
    req.session.user_info.last_login_IP = req.clientIp;
    req.flash("message","Logged In Successfully!");
    
    console.log("SESSION USER ON LOGIN",req.session.user_info);

    General_model.mysql_current_timestamp()
    .then((curr_time)=>{

        const curr_time_to_string = JSON.stringify(curr_time[0][0]['CURRENT_TIMESTAMP()']);
        console.log("CURRENT TIMESTAMP TO STRING",curr_time_to_string);
        const mysql_curr_time = curr_time_to_string.substring(1,20);
        req.session.user_info.last_login_date = mysql_curr_time; //formatted to work with MySQL
        console.log("CLIENT IP",req.clientIp)
        
        User_model.update_user_on_login(req.session.user_info)
        .then(()=>console.log("Successful update on user login"))
        .catch(err=>console.log(`Failed to update user info on login ${err}`));
    })
    .catch(err=>console.log(`Error in Authenticate_ctrl.js: router.post /login: ${err}`));
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

        res.status(200).json({

            errors: req.errors,
            message: req.flash("message"), 
        });
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
        };
    }
});

router.get("/logout",is_auth,function(req,res){//

    console.log("USER INFO ON LOGOUT ROUTE - BEFORE SESSION DESTROY", req.session.user_info);

    req.session.user_info.logged_in = 0;
    User_model.update_user_on_logout(req.session.user_info)
    .then(()=>console.log("Successful update on user logout"))
    .catch(err=>console.log(`Failed to update user info on logout ${err}`));
    
    req.session.destroy();

    res.redirect("/"); 
});

router.get("/payments",function(req,res){

    res.send("PAYMENT MADE!");

    /*fetch("http://localhost:3000/employee/edit-stock/restock/data")
    .then(resp=>resp.text())
    .then(data=>{console.log(data.body);res.send(data)})
    .catch(err=>{console.log(err);res.send("HI")});*/
})

module.exports = router;