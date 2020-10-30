const express = require("express");
const router = express.Router();

const db = require("../config/MySQL_DAO.js");
const User_model = require("../models/MYSQL_models/User_mdl.js");
const User = require("../models/POJO/User.js");
const Customer = require("../models/POJO/Customer.js");
const Employee = require("../models/POJO/Employee.js");

const {customer_register_form,customer_login_form} = require("../middleware/Validate_mw.js");

//*****HOME CONTROLS

router.get("/",function(req,res){

    res.render("general/home",{

        title: "Homepage: See bestsellers and available deals today",
        html_id: "home_page_html",
        body_id: "home_page_body",
        main_id: "home_page_main",
        main_class: ["scroll_snap_start_pos "],
        home: true,
        home_active_link: "active_link",
        best_sellers: ["Electronics","Food"],
        trial: "<h1>LETS GO</h1>"
    });
    
    //res.send("HOME 2");
});

//*****SIGNUP AND LOGIN CONTROLS

router.get("/signup",function(req,res){

    res.render("general/signup",{

        title: "Signup now to create your account or login to your existing account",
        html_id: "signup_page_html",
        body_id: "signup_page_body",
        main_id: "signup_page_main",
    });
});

router.post("/signup/create-account",customer_register_form,function(req,res){

    const catch_rollback = function(){

        User_model.mysql_rollback()
        .then(()=>{

            res.redirect("/signup");     
        })
        .catch(err=>{console.log(`Error in catch rollback function: ${err}`)}); 
    };
    
    User_model.create_trigger_test()
    .then(()=>{return User_model.create_user(req.created_customer)}) //FIRST THEN
    .then(()=>{
        
        console.log(req.created_customer);
        const time_stamp = "2020-10-24T08:28:53";

        return User_model.mysql_current_timestamp()
    }) //SECOND THEN
    .then((curr_time)=>{

        console.log(curr_time);
        console.log(curr_time[0][0]['CURRENT_TIMESTAMP()']);

        const curr_time_to_string = JSON.stringify(curr_time[0][0]['CURRENT_TIMESTAMP()']);
        console.log(curr_time_to_string);
        const mysql_curr_time = curr_time_to_string.substring(1,20);
        console.log(mysql_curr_time);

        return User_model.mysql_last_insert_id()    
    })//THIRD THEN
    .then((last_ins_id)=>{
        
        console.log(last_ins_id);
        console.log(last_ins_id[0][0]['LAST_INSERT_ID()']);

        return User_model.mysql_commit()
    }) //FOURTH THEN        
    .then((sss)=>{ //FIFTH THEN

        console.log(sss);
        res.redirect("/"); 
    })       
    .catch((err)=>{

        console.log(`Error on Testing Controller, Customer Signup (on POST): First catch: ${err}`);
        catch_rollback();
    });
});

module.exports = router;