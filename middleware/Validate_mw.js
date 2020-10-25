const bcrypt = require("bcryptjs");
const Customer = require("../models/POJO/Customer.js");

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

    req.created_customer = created_customer;

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

    if(created_customer.first_name === null)
    {
        is_error = true;
        errors.first_name = "You must enter a first name";
    };

    if(created_customer.last_name === null)
    {
        is_error = true;
        errors.last_name = "You must enter a last name";
    };

    if(created_customer.gender === null)
    {
        is_error = true;
        errors.gender = "You must select a gender";
    };

    if(created_customer.country === null)
    {
        is_error = true;
        errors.country = "You must select a country";
    };
    
    if(created_customer.username === null)
    {
        is_error = true;
        errors.username = "You must enter a username";
    };

    if(created_customer.email === null)
    {
        is_error = true;
        errors.email = "You must enter an email";
    };

    if(created_customer.password === "")
    {
        is_error = true;
        errors.password = "You must enter a password";
    };

    if(created_customer.confirm_password !== created_customer.password)
    {
        is_error = true;
        errors.confirm_password = "Passwords must match";
    };

    if(is_error)
    {
        res.render("general/signup",{

            title: "Signup now to create your account or login to your existing account",
            html_id: "signup_page_html",
            body_id: "signup_page_body",
            main_id: "signup_page_main",
            errors,
            created_customer,
        })
    }

    else
    {
        next();
    }
};