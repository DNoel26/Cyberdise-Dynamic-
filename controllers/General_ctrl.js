const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const {signup_render_obj} = require("../config/Render_obj_mw.js");

const db = require("../config/MySQL_DAO.js");
const General_model = require("../models/MYSQL_models/General_mdl.js");
const User_model = require("../models/MYSQL_models/User_mdl.js");
const User = require("../models/POJO/User.js");
const Customer = require("../models/POJO/Customer.js");
const Employee = require("../models/POJO/Employee.js");

const {customer_register_form} = require("../middleware/Validate_mw.js");
const {is_already_logged_in} = require("../middleware/Authorize_mw.js");
const Category_model = require("../models/MYSQL_models/Category_mdl.js");

//*****HOME CONTROLS

router.get("/",function(req,res){

    console.log("SESSION TEST ON HOME",req.session,"SESSION USER ON HOME",req.session.user_info);
    console.log("1",req.header,"2",req.headers,"3",req.method)

    Category_model.get_all_categories()
    .then(()=>{

        res.render("general/home",{

            title: "Homepage: See bestsellers and available deals today",
            html_id: "home_page_html",
            body_id: "home_page_body",
            main_id: "home_page_main",
            main_class: ["scroll_snap_start_pos "],
            home: true,
            home_active_link: "active_link",
            best_sellers: ["Electronics","Food"],
            message: req.flash("message"),
            trial: "<h1>LETS GO</h1>"
        });
    })
    .catch(err=>`Error in General_ctrl: Error on GET / - all routes: ${err}`);
      
    //res.send("HOME 2");
});

//*****SIGNUP AND LOGIN CONTROLS

/*router.post("/signup",is_already_logged_in,function(req,res){

    console.log(req.body.data[3]);
    res.locals.login_animate = true;
    //console.log("RES LOCALS COUNTRY LIST",res.locals.country_list[3].location_name);
    //res.locals.country_list = req.body.data;
})*/

router.get("/signup",is_already_logged_in,function(req,res){

    //console.log(res.locals);
    //console.log((req));
    console.log("GET SIGNUP DATA",req.body,req.query,req.params);

    res.render("general/signup",{

        title: signup_render_obj.title, //"Signup now to create your account or login to your existing account",
        html_id: signup_render_obj.html_id, //"signup_page_html",
        body_id: signup_render_obj.body_id, //"signup_page_body",
        main_id: signup_render_obj.main_id, //"signup_page_main",
        no_modal: signup_render_obj.no_modal, //true
    });
});

router.post("/signup",is_already_logged_in,function(req,res){

    res.redirect("/signup");
});

router.post("/signup/create-account",customer_register_form,function(req,res){ //is_already_logged_in,

    //console.log("JSON OBJECT",req.body.country_json);
    console.log("GOT TO SIGNUP POST STAGE")

    const catch_rollback = function(){
        
        General_model.mysql_rollback()
        .then(()=>{

            res.redirect("/signup");     
        })
        .catch(err=>{console.log(`Error in General_ctrl.js: Catch rollback function: ${err}`)}); 
    };
    
    User_model.create_user(req.created_customer) //User_model.create_trigger_test()
    .then(()=>{return User_model.create_customer_on_user_creation()}) //FIRST THEN
    .then(()=>{
        
        console.log("ON CUSTOMER CREATION",req.created_customer);
        const time_stamp = "2020-10-24T08:28:53";

        return General_model.mysql_current_timestamp()
    }) //SECOND THEN
    .then((curr_time)=>{

        console.log("MYSQL CURRENT TIMESTAMP RESULT OBJ",curr_time);
        console.log("CURRENT TIMESTAMP ON CREATION",curr_time[0][0]['CURRENT_TIMESTAMP()']);

        const curr_time_to_string = JSON.stringify(curr_time[0][0]['CURRENT_TIMESTAMP()']);
        console.log("CURRENT TIMESTAMP TO STRING",curr_time_to_string);
        const mysql_curr_time = curr_time_to_string.substring(1,20);
        console.log("CURRENT TIMESTAMP COMPATIBLE WITH MYSQL",mysql_curr_time);

        return General_model.mysql_last_insert_id()    
    }) //THIRD THEN
    .then((last_ins_id)=>{
        
        console.log("MYSQL LAST INSERT ID RESULT OBJ",last_ins_id);
        console.log("LAST INSERT ID ON CREATION",last_ins_id[0][0]['LAST_INSERT_ID()']);

        /*curr_time[0].forEach(element => {
            console.log(element);
            console.log("ARRAY INDEX");
        });*/
        
        /*let normalObj = Object.assign({}, curr_time[0]);
        let stringify = JSON.stringify(normalObj[0]);*/
        //console.log("OBJECT ASSIGN");
        //console.log(JSON.parse(stringify));
        //console.log(curr_time[0][0]['CURRENT_TIMESTAMP()']);
        //console.log(curr_time[0][0]);
        //const time_stamp = curr_time[0][0];

        return General_model.mysql_commit()
    }) //FOURTH THEN        
    .then((test)=>{ 

        req.flash("message","Account successfully created! <br>Login to get started now")
        console.log("Fifth and final then before acc creation redirect",test);
        res.render("general/signup",{

            title: signup_render_obj.title, 
            html_id: signup_render_obj.html_id, 
            body_id: signup_render_obj.body_id, 
            main_id: signup_render_obj.main_id, 
            no_modal: signup_render_obj.no_modal,
            message: req.flash("message"),
            acc_created: true,
        });
    }) //FIFTH THEN       
    .catch((err)=>{

        console.log(`Error in General_ctrl.js: Customer Signup (on POST): ${err}`);
        catch_rollback();
    });
});

module.exports = router;