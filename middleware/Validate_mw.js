const bcryptjs = require("bcryptjs");
const express = require("express");
const {signup_render_obj} = require("../config/Render_obj_mw.js");
const User_model = require("../models/MYSQL_models/User_mdl.js");
const Customer = require("../models/POJO/Customer.js");
const Employee = require("../models/POJO/Employee.js");
const User = require("../models/POJO/User.js");

exports.customer_register_form = (req,res,next)=>{

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
    console.log(req.body);

    if(is_error)
    {
        res.render("general/signup",{

            title: signup_render_obj.title, 
            html_id: signup_render_obj.html_id, 
            body_id: signup_render_obj.body_id, 
            main_id: signup_render_obj.main_id, 
            no_modal: signup_render_obj.no_modal,
            errors,
            created_customer,
        });

        /*console.log("Customer Gender REQ BODY",created_customer.gender,
        "Customer Country REQ BODY",created_customer.country);

        let tryer = req.body;//.country_arr[0].location_name;

        console.log("TRYINGGGGGG",tryer);*/
    }

    else
    {
        User_model.get_user_by_username_email(created_customer.email,created_customer.username)
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

                    title: signup_render_obj.title, 
                    html_id: signup_render_obj.html_id, 
                    body_id: signup_render_obj.body_id, 
                    main_id: signup_render_obj.main_id, 
                    no_modal: signup_render_obj.no_modal,
                    errors,
                    created_customer,
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
                .catch(err=>{console.log(`Error in Validate_mw.js: Customer Registration Form 
                    (bcrypt encryption process): ${err}`);
                    return;
                });
            };
        })
        .catch(err=>{console.log(`Error in Validate_mw.js: Customer Registration Form 
            (get customer by username_email): ${err}`);
            return;
        });
    };
};

exports.user_login_form = (req,res,next)=>{

    console.log("REQ BODY IS HEADER LOGIN",req.body.data);
    console.log("LOGIN USER FORM DATA INPUT",req.body);

    const login_user = new User;

    login_user.email = req.body.username_email;
    login_user.username = req.body.username_email;
    login_user.username_email = req.body.username_email;
    login_user.password = req.body.password;
    
    req.login_user = login_user;

    let is_error = false;
    let is_exists = false;
    let is_authenticated = false;

    let is_header_login = req.body.data;
    if(is_header_login === undefined || is_header_login === null)
    {
        is_header_login = false;
    };

    console.log("IS HEADER LOGIN REQ CHECKER - TRUE OR FALSE",is_header_login);
    req.is_header_login = is_header_login;

    const errors = 
    {
        username_email_login: null,
        password_login: null,
        result: null
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

    if(login_user.username_email === "" && login_user.password === "")
    {
        is_error = true;
        errors.username_email_login = "You must enter an email or username";
        errors.password_login = "You must enter a password";
    };

    if(login_user.username_email === "" && login_user.password !== "")
    {
        is_error = true;
        errors.username_email_login = "You must enter an email or username as well";
    };

    if(is_error)
    {
        if(is_header_login === false)
        {
            res.render("general/signup",{

                title: signup_render_obj.title, 
                html_id: signup_render_obj.html_id, 
                body_id: signup_render_obj.body_id, 
                main_id: signup_render_obj.main_id, 
                no_modal: signup_render_obj.no_modal,
                errors,
                login_user,
            });
        }

        else
        {
            console.log("HEADER LOGIN - IS_ERROR = TRUE");

            res.status(200).json({

               errors: errors,
               message: "Error message when no email or username is entered",
            }); 
        };
    }

    //Checks for non-empty username/email in database

    else
    {
        User_model.get_user_by_username_email(login_user.email,login_user.username)
        .then((selected_user)=>{

            if(selected_user !== null)
            {
                is_exists = true;
                console.log("THIS USER WAS SELECTED",selected_user,"USER ROLE",selected_user.role);

                if(login_user.password === "")
                {
                    errors.password_login = "You must enter password";

                    if(is_header_login === false)
                    {
                        res.render("general/signup",{

                            title: signup_render_obj.title, 
                            html_id: signup_render_obj.html_id, 
                            body_id: signup_render_obj.body_id, 
                            main_id: signup_render_obj.main_id, 
                            no_modal: signup_render_obj.no_modal,
                            errors,
                            login_user,
                        });
                    }
                    
                    else
                    {
                        console.log("HEADER LOGIN - USER SELECTED BUT NO PASSWORD ENTERED = TRUE");

                        res.status(200).json({

                            errors: errors,
                            message: "Error message when user exists but no password is entered", 
                        }); 
                    };
                }

                else
                {
                    bcryptjs.compare(login_user.password,selected_user.password)
                    .then((auth_result)=>{

                        console.log(auth_result);
                        if(auth_result) //i.e. login_customer.password === selected_customer.password
                        {
                            is_authenticated = true;
                            req.selected_user = selected_user;
                            console.log("CORRECT USER AND PASSWORD!!!");

                            if(is_header_login === false)
                            {
                                next();  
                            }

                            else
                            {
                                res.status(200).json({

                                    errors: errors,
                                    message: "Correct email and password was entered, error message is null", 
                                });

                                next();
                            };
                        }

                        else
                        {
                            authenticated_errors.result = "Invalid Email/Username and Password combination";  
                            errors.result = authenticated_errors.result;  
                            console.log("WRONG PASSWORD!!!");
                            
                            if(is_header_login === false)
                            {
                                res.render("general/signup",{

                                    title: signup_render_obj.title, 
                                    html_id: signup_render_obj.html_id, 
                                    body_id: signup_render_obj.body_id, 
                                    main_id: signup_render_obj.main_id, 
                                    no_modal: signup_render_obj.no_modal,
                                    authenticated_errors,
                                    login_user,
                                });
                            }

                            else
                            {
                                console.log("HEADER LOGIN - USER SELECTED BUT WRONG PASSWORD = TRUE");

                                res.status(200).json({

                                    errors: errors,
                                    message: "Error message when incorrect username/email and password combination is entered", 
                                }); 
                            };
                        };
                    })
                    .catch(err=>{
                        
                        console.log(`Error in Validate_mw.js: User Login Form: ${err}`);
                        return;
                    }); 
                }          
            }

            else
            {
                is_exists = false;
                exists_errors.result = "Entered Email or Username does not exist";
                errors.result = exists_errors.result;
                console.log("SORRY USER DOESN'T EXIST",selected_user);

                if(is_header_login === false)
                {
                    res.render("general/signup",{

                        title: signup_render_obj.title, 
                        html_id: signup_render_obj.html_id, 
                        body_id: signup_render_obj.body_id, 
                        main_id: signup_render_obj.main_id, 
                        no_modal: signup_render_obj.no_modal,
                        exists_errors,
                    });
                }

                else
                {
                    console.log("HEADER LOGIN - USER NOT FOUND IN DB = TRUE");    

                    res.status(200).json({

                        errors: errors,
                        message: "Error message when email or username does not exist in database", 
                    }); 
                }   
            };
        })
        .catch(err=>{
            
            console.log(`Error in Validate_mw.js: User Login Form (get User by username_email): ${err}`);
            return;
        });

        //let login_error = false;

        //if(login_customer.password === )
    }
}