const express = require("express");
const router = express.Router();

const db = require("../config/MySQL_DAO.js");
const User_model = require("../models/MYSQL_models/User_mdl.js");
const User = require("../models/POJO/User.js");
const Customer = require("../models/POJO/Customer.js");
const Employee = require("../models/POJO/Employee.js");

const {customer_register_form} = require("../middleware/Validate_mw.js");

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

router.post("/signup",customer_register_form,function(req,res){

    const catch_rollback = function(){

        User_model.mysql_rollback()
        .then(()=>{

            res.redirect("/signup");     
        })
        .catch(err=>{console.log(`Error in catch rollback function: ${err}`)}); 
    };

    const created_customer = new Customer();

    created_customer.first_name = req.body.first_name;
    created_customer.last_name = req.body.last_name;
    created_customer.gender = req.body.gender;
    created_customer.country = req.body.country;
    created_customer.username = req.body.username;
    created_customer.email = req.body.email;
    created_customer.password = req.body.password;

    req.created_customer = created_customer;
    //let ID = NEW.user_id;'LAST_INSERT_ID()';
    //let c_address = "111 St. A Place";
    //let LAST_INSERT_ID;
    //let LAST = LAST_INSERT_ID();

    if(created_customer instanceof Customer)
    {
        console.log("YES THIS IS AN INSTANCE OF CUSTOMER");
    };

    if(!(created_customer instanceof Employee))
    {
        console.log("NO THIS IS NOT AN INSTANCE OF EMPLOYEE");
    };

    if(created_customer instanceof User)
    {
        console.log("YES THIS IS AN INSTANCE OF USER");
    };
    
    User_model.create_trigger_test()
    .then(()=>{ //FIRST THEN
       
        User_model.create_user(req.created_customer)//,ID,c_address)
        .then(()=>{ //SECOND THEN

            console.log(req.created_customer);
            const time_stamp = "2020-10-24T08:28:53";

            User_model.mysql_current_timestamp()
            .then((curr_time)=>{ //THIRD THEN
                
                console.log(curr_time);
                console.log(curr_time[0][0]['CURRENT_TIMESTAMP()']);

                const curr_time_to_string = JSON.stringify(curr_time[0][0]['CURRENT_TIMESTAMP()']);
                console.log(curr_time_to_string);
                const mysql_curr_time = curr_time_to_string.substring(1,20);
                console.log(mysql_curr_time);
            
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

                User_model.mysql_last_insert_id()
                .then((last_ins_id)=>{ //FOURTH THEN

                    console.log(last_ins_id);
                    console.log(last_ins_id[0][0]['LAST_INSERT_ID()']);

                    User_model.mysql_commit()
                    .then((sss)=>{ //FIFTH THEN

                        console.log(sss);
                        res.redirect("/"); 
                    })
                    .catch((err)=>{

                        console.log(`Error on General Controller, Customer Signup (on POST): Fifth catch: ${err}`);
                        catch_rollback();
                    }); 
                })
                .catch((err)=>{

                    console.log(`Error on General Controller, Customer Signup (on POST): Fourth catch: ${err}`);
                    catch_rollback();
                });   
            })
            .catch((err)=>{

                console.log(`Error on General Controller, Customer Signup (on POST): Third catch: ${err}`);
                catch_rollback();
            });   
        })
        .catch((err)=>{

            console.log(`Error on General Controller, Customer Signup (on POST): Second catch: ${err}`);
            catch_rollback();
        });
    })

    //TO SHOW KADEEM
    /*User_model.create_trigger_test()
    .then(()=>{
       
        User_model.create_user(req.created_customer)//,ID,c_address)
    })
    .then(()=>{

        console.log(req.created_customer);
        const time_stamp = "2020-10-24T08:28:53";
        User_model.mysql_current_timestamp()
    })
    .then((curr_time)=>{
                
        console.log(curr_time);
        console.log(curr_time[0][0]['CURRENT_TIMESTAMP()']);
        console.log(trunc(curr_time[0][0]['CURRENT_TIMESTAMP()']));

        User_model.mysql_last_insert_id()
    })
    .then((last_ins_id)=>{

        console.log(last_ins_id);
        console.log(last_ins_id[0][0]['LAST_INSERT_ID()']);
        User_model.drop_trigger_test();
        res.redirect("/"); 
    })*/
    .catch((err)=>{

        console.log(`Error on General Controller, Customer Signup (on POST): First catch: ${err}`);
        catch_rollback();
    });
});

module.exports = router;