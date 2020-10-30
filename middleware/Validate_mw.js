const bcryptjs = require("bcryptjs");
const express = require("express");
const User_model = require("../models/MYSQL_models/User_mdl.js")
const Customer = require("../models/POJO/Customer.js");
const Employee = require("../models/POJO/Employee.js");
const User = require("../models/POJO/User.js");

exports.customer_register_form = (req,res,next)=>
{
    const created_customer = new Customer();

    created_customer.first_name = req.body.first_name;
    created_customer.last_name = req.body.last_name;
    created_customer.gender = req.body.gender;
    created_customer.country = req.body.country;
    created_customer.username = req.body.username;
    created_customer.email = req.body.email;
    created_customer.password = req.body.password;
    created_customer.confirm_password = req.body.confirm_password;
    created_customer.country_flag_src = req.body.country_flag_src;
    //created_customer.testtt = req.body.testtt; //TO TEST SENDING JSON FROM CLIENT TO SERVER

    req.created_customer = created_customer;
    
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

    let is_error = false;

    const errors = 
    {
        first_name: null,
        last_name: null,
        gender: null,
        country: null,
        username: null,
        email: null,
        password: null,
        confirm_password: null
    };

    if(created_customer.first_name === "")
    {
        is_error = true;
        errors.first_name = "You must enter a first name";
    };

    if(created_customer.last_name === "")
    {
        is_error = true;
        errors.last_name = "You must enter a last name";
    };

    if(created_customer.gender === undefined || created_customer.gender === "")
    {
        is_error = true;
        errors.gender = "You must select a gender";
    };

    if(created_customer.country === undefined || created_customer.country === "")
    {
        is_error = true;
        errors.country = "You must select a country";
    };
    
    if(created_customer.username === "")
    {
        is_error = true;
        errors.username = "You must enter a username";
    };

    if(created_customer.email === "")
    {
        is_error = true;
        errors.email = "You must enter an email";
    };

    if(created_customer.password == "" || created_customer.password == " ")
    {
        is_error = true;
        errors.password = "You must enter a password";
    };

    if(created_customer.confirm_password !== created_customer.password)
    {
        is_error = true;
        errors.confirm_password = "Passwords must match";
    };

    //console.log("VALIDATE REQ BODY ==>",req.body);
    //console.log("TESTTT",created_customer.testtt);
    //let data = JSON.parse(decodeURIComponent(created_customer.testtt));
    //console.log("JSON OBJECT",req.body.country_json,"REQ BODY!!!",req.body);

    if(is_error)
    {
        res.render("general/signup",{

            title: "Signup now to create your account or login to your existing account",
            html_id: "signup_page_html",
            body_id: "signup_page_body",
            main_id: "signup_page_main",
            errors,
            created_customer
        });

        /*console.log("Customer Gender REQ BODY",created_customer.gender,
        "Customer Country REQ BODY",created_customer.country);

        let tryer = req.body;//.country_arr[0].location_name;

        console.log("TRYINGGGGGG",tryer);*/
    }

    else
    {
        User_model.get_customer_by_username_email(created_customer.email,created_customer.username)
        .then((selected_customer)=>{

            if(selected_customer !== null)
            {
                if(selected_customer.email === created_customer.email)
                {
                    errors.email = "Entered email is already in use, please try another";
                };

                if(selected_customer.username === created_customer.username)
                {
                    errors.username = "Entered username is already in use, please try another";
                };

                res.render("general/signup",{

                    title: "Signup now to create your account or login to your existing account",
                    html_id: "signup_page_html",
                    body_id: "signup_page_body",
                    main_id: "signup_page_main",
                    errors,
                    created_customer
                });
            }
        
            else
            {
                return bcryptjs.genSalt(10)
                .then((salt)=>{
        
                    return bcryptjs.hash(created_customer.password, salt);
                })
                .then((hash)=>{
        
                    console.log(hash);
                    created_customer.password = hash;
                    next();
                }) 
                .catch(err=>console.log(`Error in Validate Middleware: Customer Registration Form 
                (bcrypt encryption process): ${err}`));
            };
        })
        .catch(err=>console.log(`Error in Validate Middleware: Customer Registration Form 
        (get customer by username_email): ${err}`))
    };
};

exports.customer_login_form = (req,res,next)=>{

    const login_customer = new Customer;

    login_customer.email = req.body.username_email;
    login_customer.username = req.body.username_email;
    login_customer.username_email = req.body.username_email;
    login_customer.password = req.body.password;
    
    req.login_customer = login_customer;

    let is_error = false;
    let is_exists = false;
    let is_authenticated = false;

    const errors = 
    {
        username_email_login: null,
        password_login: null
    };

    const exists_errors = 
    {
        result: null
    };

    const authenticated_errors = 
    {
        result: null
    };
    
    //Checks for empty username/email input before db lookup

    if(login_customer.username_email === "" && login_customer.password === "")
    {
        is_error = true;
        errors.username_email_login = "You must enter an email or username";
        errors.password_login = "You must enter a password";
    };

    if(login_customer.username_email === "" && login_customer.password !== "")
    {
        is_error = true;
        errors.username_email_login = "You must enter an email or username as well";
    };

    if(is_error)
    {
        res.render("general/signup",{

            title: "Signup now to create your account or login to your existing account",
            html_id: "signup_page_html",
            body_id: "signup_page_body",
            main_id: "signup_page_main",
            errors,
            login_customer
        });
    }

    //Checks for non-empty username/email in database

    else
    {
        User_model.get_customer_by_username_email(login_customer.email,login_customer.username)
        .then((selected_customer)=>{

            if(selected_customer !== null)
            {
                is_exists = true;
                console.log("THIS CUSTOMER WAS SELECTED",selected_customer);

                if(login_customer.password === "")
                {
                    errors.password_login = "You must enter password";
                    res.render("general/signup",{

                        title: "Signup now to create your account or login to your existing account",
                        html_id: "signup_page_html",
                        body_id: "signup_page_body",
                        main_id: "signup_page_main",
                        errors,
                        login_customer
                    });
                }

                else
                {
                    bcryptjs.compare(login_customer.password,selected_customer.password)
                    .then((auth_result)=>{
                        console.log(auth_result)
                        if(auth_result) //i.e. login_customer.password === selected_customer.password
                        {
                            is_authenticated = true;
                            console.log("CORRECT PASSWORD!!!");
                            next();  
                        }

                        else
                        {
                            authenticated_errors.result = "Invalid Email/Username and Password combination";    
                            console.log("WRONG PASSWORD!!!");
                            
                            res.render("general/signup",{

                                title: "Signup now to create your account or login to your existing account",
                                html_id: "signup_page_html",
                                body_id: "signup_page_body",
                                main_id: "signup_page_main",
                                authenticated_errors,
                                login_customer
                            });
                        };
                    })
                    .catch(err=>console.log(`Error in Validate Middleware: Customer Login Form: ${err}`)); 
                }          
            }

            else
            {
                is_exists = false;
                exists_errors.result = "Entered Email or Username does not exist";
                console.log("SORRY CUSTOMER DOESN'T EXIST",selected_customer);

                res.render("general/signup",{

                    title: "Signup now to create your account or login to your existing account",
                    html_id: "signup_page_html",
                    body_id: "signup_page_body",
                    main_id: "signup_page_main",
                    exists_errors
                });
            };
        })
        .catch(err=>console.log(`Error in Validate Middleware: Customer Login Form 
        (get customer by username_email): ${err}`));

        //let login_error = false;

        //if(login_customer.password === )
    }
}