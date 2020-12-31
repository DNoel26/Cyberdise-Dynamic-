const bcryptjs = require("bcryptjs");
const express = require("express");
const {signup_render_obj} = require("../config/Render_obj_mw.js");
const User_model = require("../models/MYSQL_models/User_mdl.js");
const Product_model = require("../models/MYSQL_models/Product_mdl.js");
const Category_model = require("../models/MYSQL_models/Category_mdl.js");
const Customer = require("../models/POJO/Customer.js");
const Employee = require("../models/POJO/Employee.js");
const User = require("../models/POJO/User.js");
const Category = require("../models/POJO/Category.js");
const Product = require("../models/POJO/Product.js");
const { create_products } = require("../models/MYSQL_models/Product_mdl.js");
const { v4: uuidv4 } = require('uuid');
const fileUpload = require("express-fileupload");

exports.customer_register_form = (req,res,next)=>{

    const created_customer = new Customer();

    created_customer.first_name = req.body.first_name;
    created_customer.last_name = req.body.last_name;
    created_customer.gender = req.body.gender;
    created_customer.country = req.body.country;
    created_customer.country_flag_src = req.body.country_flag_src;
    created_customer.username = req.body.username;
    created_customer.email = req.body.email;
    created_customer.password = req.body.password;
    created_customer.confirm_password = req.body.confirm_password;
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
    console.log(req.body,is_error);

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
        .then((selected_users)=>{

            if(selected_users !== null)
            {
                selected_users.forEach(user => {
                    
                    if(user.username.toLowerCase() === created_customer.username.toLowerCase())
                    {
                        errors.username = "Entered username is already in use, please try another";
                    }

                    if(user.email.toLowerCase() === created_customer.email.toLowerCase())
                    {
                        errors.email = "Entered email is already in use, please try another";
                    };
                });

                console.log("ON CHECK SELECTED CUST",selected_users,"ON CHECK CREATED CUST",created_customer);
                console.log("ERRORS OBJECT ON CHECK FAIL",errors);

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
    console.log("SESSION TEST",req.session);
    
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

    console.log("IS HEADER LOGIN REQ CHECKER - TRUE OR FALSE",is_header_login,"LOGIN DETAILS",login_user);

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
                console.log("THIS USER WAS SELECTED",selected_user[0],"USER ROLE",selected_user[0].role);

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
                    bcryptjs.compare(login_user.password,selected_user[0].password)
                    .then((auth_result)=>{

                        console.log(auth_result);
                        if(auth_result) //i.e. login_customer.password === selected_customer.password
                        {
                            is_authenticated = true;
                            req.selected_user = selected_user[0];
                            req.errors = errors,
                            console.log("CORRECT USER AND PASSWORD!!!");

                            /*if(is_header_login === false)
                            {
                                next();  
                            }

                            else
                            {*/
                                next();
                            //};
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
    };
};

exports.add_category_form = (req,res,next)=>{

    const created_category = new Category;

    created_category.title = req.body.category_name;
    created_category.description = req.body.category_description;
    created_category.image_path = req.body.category_photo;

    const uploaded_image = req.files.category_img_upload;

    console.log("0 - CREATED CATEGORY");
    console.log("1",created_category,"OBJECT KEYS",Object.keys(created_category));
    console.log("2",created_category.title);
    console.log("3",created_category.title,created_category.description);
    console.log("4 - CREATED CATEGORY",created_category.title[0],created_category.title[1]);
    console.log("5",req.body);
    
    let is_error = false;

    const errors = 
    {
        title: [],
        description: [],
        image_path: [],
    };

    created_category.title.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.title[index] = "You must enter a title";
        };
    });

    created_category.description.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.description[index] = "You must enter a description";
        };
    });
    
    created_category.image_path.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.image_path[index] = "You must upload an image";
        };
    });

    if(uploaded_image)
    {
        uploaded_image.forEach((element,index) => {
        
            if(!element.mimetype.includes('image'))
            {
                is_error = true;
                errors.upload_image[index] = "File must be an image";
            }

            else if(element.truncated)
            {
                is_error = true;
                errors.upload_image[index] = "File size is too large. Maximum of 5mb allowed";
            };
        });
    };

    //console.log(req.body);

    if(is_error)
    {
        if(created_category.title.length == 1)
        {
            res.render("employee/add_categories",{

                title: "Add new product categories to the store",
                html_id: "edit_stock_html",
                body_id: "edit_stock_body",
                main_id: "edit_stock_main",
                my_stock_active_link: "active_link",
                errors,
                created_category,
            });
        }
        
        else if(created_category.title.length > 1)
        {
            console.log("MULTI SUBMIT CREATED CATEGORY ERROR")
            res.status(200).json({

                errors: errors,
                message: "Error message when add category form field is empty", 
            }); 
        };
    }

    else
    {
        Category_model.get_categories_by_names_check(created_category.title)
        .then((selected_categories)=>{

            console.log("GET CATEGORY BY NAME",selected_categories,created_category.title,JSON.stringify(created_category.title));
            if(selected_categories != null)
            {
                let results = selected_categories.map(category => category.title);
                let category_comparison;

                for(i=0; i<created_category.title.length; i++)
                {
                    console.log("Object keys",results)
                    category_comparison = results.some(element => element == created_category.title[i]);

                    console.log(category_comparison);

                    if(category_comparison)  //selected_categories[i].title == created_category.title[i])
                    {
                        errors.title[i] = "Entered name is already in use, please try another";
                        console.log("CATEGORY NAME ALREADY EXISTS",/*selected_categories,*/created_category.title);
                        is_error = true;
                    }

                    console.log("ENTERED LOOP");
                }

                //if(selected_categories.title == created_category.title)
                if(is_error == true)
                {
                    if(created_category.title.length == 1)
                    {
                        res.render("employee/add_categories",{

                            title: "Add new product categories to the store",
                            html_id: "edit_stock_html",
                            body_id: "edit_stock_body",
                            main_id: "edit_stock_main",
                            my_stock_active_link: "active_link",
                            errors,
                            created_category,
                        });
                    }

                    else if(created_category.title.length > 1)
                    {
                        res.status(200).json({

                            errors: errors,
                            message: "Error message when any add category title already exists", 
                        }); 
                    };
                }    
            }
        
            else
            {
                req.created_category = created_category;
                req.uploaded_image = uploaded_image;
                
                console.log("NO ISSUES IN CREATING CATEGORY")
                next();
            };
        })
        .catch(err=>{console.log(`Error in Validate_mw.js: add_category_form: get_category_by_name(): ${err} ${err.stack}`,console.trace(err))});
    };
};

exports.add_product_form = (req,res,next)=>{

    console.log("1",req.body,"length",req.body.length);
    console.log("2",req.files);
    //console.log("3",req.body.product_bestseller);
    //console.log("4",req.body.product_bestseller[0]);

    //const hidden_counter_products = req.body.counter_products;
    //console.log("HIDDEN PRODUCT COUNTER",hidden_counter_products);

    //console.log(Object.entries(req.body));
    //console.log(Object.keys(req.body).length);

    const created_product = new Product;
    const queried_category = new Category;

    created_product.category = queried_category;

    created_product.title = req.body.product_name;
    queried_category.category_id = req.body.product_category_id;
    created_product.current_quantity = req.body.product_quantity;
    created_product.min_qty = req.body.product_min_quantity;
    created_product.max_qty = req.body.product_max_quantity;
    created_product.cost_price = req.body.product_cost_price;
    created_product.selling_price = req.body.product_selling_price;
    created_product.image_path = req.body.product_img;
    created_product.is_best_seller = req.body.product_bestseller;
    created_product.description = req.body.product_description;

    const uploaded_image = req.files.product_img_upload;

    console.log("UPLOADED PHOTO",uploaded_image);

    //console.log("0 - CREATED PRODUCT");
    //console.log("1",created_product,"OBJECT KEYS",Object.keys(created_product));
    //console.log("2",created_product.category,created_product.category.title);
    //console.log("3",created_product.title,created_product.description);
    //console.log("4 - CREATED CATEGORY",created_product.title[0],created_product.title[1]);
    //console.log("5",req.body);

    let is_error = false;

    const errors = 
    {
        title: [],
        category_title: [],
        current_quantity: [],
        min_qty: [],
        max_qty: [],
        cost_price: [],
        selling_price: [],
        image_path: [],
        is_best_seller: [],
        description: [],
        upload_image: [],
    };

    created_product.title.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.title[index] = "You must enter a title";
        };
    });

    queried_category.category_id.forEach((element,index) => {
        
        if(element == "" || element == "none")
        {
            created_product.category = null;
            element = null;
            is_error = true;
            errors.category_title[index] = "You must select a category";
        };
    });

    created_product.current_quantity.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.current_quantity[index] = "You must enter a quantity";
        };
    });

    created_product.min_qty.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.min_qty[index] = "You must enter a minimum quantity";
        };

        if(element > parseInt(created_product.max_qty[index]))
        {
            is_error = true;
            errors.min_qty[index] = "Minimum quantity cannot be greater than maximum quantity";
        };
    });

    created_product.max_qty.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.max_qty[index] = "You must enter a maximum quantity";
        };

        if(element < parseInt(created_product.min_qty[index]))
        {
            is_error = true;
            errors.max_qty[index] = "Maximum quantity cannot be less than minimum quantity";
        };
    });

    created_product.cost_price.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.cost_price[index] = "You must enter a cost price";
        };
    });

    created_product.selling_price.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.selling_price[index] = "You must enter a selling price";
        };
    });

    created_product.image_path.forEach((element,index) => {
        
        if(element == "" && !uploaded_image[index])
        {
            is_error = true;
            errors.image_path[index] = "You must enter an image directory";
        };
    });

    if(uploaded_image)
    {
        uploaded_image.forEach((element,index) => {
        
            if(!element.mimetype.includes('image'))
            {
                is_error = true;
                errors.upload_image[index] = "File must be an image";
            }

            else if(element.truncated)
            {
                is_error = true;
                errors.upload_image[index] = "File size is too large. Maximum of 5mb allowed";
            };
        });
    };

    //console.log("6 BEFORE - IS BEST SELLER",created_product.is_best_seller);

    created_product.is_best_seller.forEach((element,index) => {
        
        if(element === "")
        {
            is_error = true;
            errors.is_best_seller[index] = "You must select a bestseller status";
        };
    });

    console.log("6 AFTER - IS BEST SELLER",created_product.is_best_seller);

    created_product.description.forEach((element,index) => {
        
        if(element == "")
        {
            is_error = true;
            errors.description[index] = "You must enter a description";
        };
    });

    //console.log(req.body);

    if(is_error)
    {
        Category_model.get_all_categories()
        .then((categories)=>{

            res.locals.categories = categories;

            if(created_product.title.length == 1)
            {
                res.render("employee/add_products",{

                    title: "Add new products to the store",
                    html_id: "edit_stock_html",
                    body_id: "edit_stock_body",
                    main_id: "edit_stock_main",
                    my_stock_active_link: "active_link",
                    //categories_info,
                    errors,
                    created_product,
                });
            }

            else if(created_product.title.length > 1)
            {
                console.log("MULTI SUBMIT CREATED PRODUCT ERROR")
                res.status(200).json({

                    errors: errors,
                    message: "Error message when add product form field is empty", 
                }); 
            };
        })
        .catch(err=>console.log(`Error in Validate_mw: add_product_form(): ${err}`)); 
    }

    else
    {
        Product_model.get_products_by_names_check(created_product.title)
        .then((selected_products)=>{

            console.log("GET PRODUCT BY NAME",selected_products);

            if(selected_products != null)
            {
                let results = selected_products.map(product => product.title);
                let product_comparison;

                for(i=0; i<created_product.title.length; i++)
                {
                    console.log("Object keys",results)
                    product_comparison = results.some(element => element == created_product.title[i]);

                    console.log(product_comparison);

                    if(product_comparison)  //selected_categories[i].title == created_category.title[i])
                    {
                        errors.title[i] = "Entered name is already in use, please try another";
                        console.log("PRODUCT NAME ALREADY EXISTS",/*selected_categories,*/created_product.title);
                        is_error = true;
                    }

                    console.log("ENTERED LOOP - PRODUCTS");
                }

                //if(selected_categories.title == created_category.title)
                if(is_error == true)
                {
                    Category_model.get_all_categories()
                    .then((categories)=>{

                        res.locals.categories = categories;

                        if(created_product.title.length == 1)
                        {
                            res.render("employee/add_products",{

                                title: "Add new products to the store",
                                html_id: "edit_stock_html",
                                body_id: "edit_stock_body",
                                main_id: "edit_stock_main",
                                my_stock_active_link: "active_link",
                                //categories_info,
                                errors,
                                created_product,
                            });
                        }

                        else if(created_product.title.length > 1)
                        {
                            res.status(200).json({

                                errors: errors,
                                message: "Error message when any add product title already exists", 
                            }); 
                        };
                    })
                    .catch(err=>console.log(`Error in Validate_mw: add_product_form() (2nd validation error render): ${err}`));      
                }    
            }
        
            else
            {
                for(let i=0; i<created_product.is_best_seller.length; i++)
                {
                    console.log(`BESTSELLER LOOP ${i}`);

                    if(created_product.is_best_seller[i] == "Yes" || created_product.is_best_seller[i] == "yes")
                    {
                        created_product.is_best_seller[i] = 1;
                    }

                    else if(created_product.is_best_seller[i] == "No" || created_product.is_best_seller[i] == "no")
                    {
                        created_product.is_best_seller[i] = 0;
                    };
                };
                
                req.created_product = created_product;
                req.uploaded_image = uploaded_image;
                console.log("NO ISSUES IN CREATING PRODUCT")
                next();
            };
        })
        .catch(err=>{console.log(`Error in Validate_mw.js: add_product_form: get_products_by_names(): ${err} ${err.stack}`,console.trace(err))});
    };
};

exports.edit_update_product_form = (req,res,next)=>{

    const edited_product = new Product;
    const queried_category = new Category;

    edited_product.category = queried_category;

    edited_product.title = req.body.product_name;
    edited_product.product_code = req.body.product_code;
    queried_category.title = req.body.product_category;
    edited_product.current_quantity = req.body.product_quantity;
    edited_product.min_qty = req.body.product_min_quantity;
    edited_product.max_qty = req.body.product_max_quantity;
    edited_product.cost_price = req.body.product_cost_price;
    edited_product.selling_price = req.body.product_selling_price;
    edited_product.image_path = req.body.product_img;
    edited_product.is_best_seller = req.body.product_bestseller;
    edited_product.description = req.body.product_description;

    const uploaded_image = req.files.product_img_upload;
    console.log("EDITED PRODUCT",edited_product);

    let is_error = false;

    const errors = 
    {
        title: "",
        category_title: "",
        current_quantity: "",
        min_qty: "",
        max_qty: "",
        cost_price: "",
        selling_price: "",
        image_path: "",
        is_best_seller: "",
        description: "",
        upload_image: "",
    };
 
    if(edited_product.title == "")
    {
        is_error = true;
        errors.title = "Cannot update product name if field is empty";
    };

    if(edited_product.current_quantity == "")
    {
        is_error = true;
        errors.current_quantity = "Cannot update product quantity if field is empty";
    };
    
    if(edited_product.min_qty == "" || edited_product.min_qty == null)
    {
        is_error = true;
        errors.min_qty = "Cannot update product minimum quantity if field is empty";
    };

    if(edited_product.max_qty == "" || edited_product.max_qty == null)
    {
        is_error = true;
        errors.max_qty = "Cannot update product maximum quantity if field is empty";
    };

    if(edited_product.cost_price == "")
    {
        is_error = true;
        errors.cost_price = "Cannot update product cost price if field is empty";
    };

    if(edited_product.selling_price == "")
    {
        is_error = true;
        errors.selling_price = "Cannot update product selling price if field is empty";
    };

    if(edited_product.image_path == "" && !uploaded_image)
    {
        is_error = true;
        errors.image_path = "Cannot update product image if field is empty and no image is uploaded";
    };

    if(uploaded_image)
    {
        if(!uploaded_image.mimetype.includes('image'))
        {
            is_error = true;
            errors.upload_image = "Cannot update product image if file type is not an image";
        }

        else if(uploaded_image.truncated)
        {
            is_error = true;
            errors.upload_image = "File size is too large. Maximum of 5mb allowed";
        };
    };

    if(edited_product.description == "")
    {
        is_error = true;
        errors.description = "Cannot update product description if field is empty";
    };

    //let product = edited_product;

    if(is_error)
    {
        Category_model.get_all_categories()
        .then((categories)=>{

            res.locals.categories = categories;

            return Product_model.get_product_by_name_code(null,req.params.id)
        })
        .then((product)=>{

            if(product.is_best_seller == 1)
            {
                product.is_best_seller = "Yes";
            }

            else if(product.is_best_seller == 0)
            {
                product.is_best_seller = "No";
            };

            //console.log(req.app.locals);
            console.log("PRODUCT PARAMS ID",product);
            console.log("PRODUCT SELLING PRICE",product.selling_price,"PRODUCT QUANTITY",product.current_quantity);

            Object.assign(edited_product, product);
            res.locals.product = edited_product;
            
            res.render("employee/edit_product",{

                title: "Edit your selected product here",
                html_id: "edit_stock_html",
                body_id: "edit_stock_body",
                main_id: "edit_stock_main",
                my_stock_active_link: "active_link",
                //product,
                errors
                //stock_val
            });
        })
        .catch(err=>console.log(`Error in Validate_mw: edit_update_product_form: ${err}`));

    }

    else
    {
        if(edited_product.is_best_seller == "Yes" || edited_product.is_best_seller == "yes")
        {
            edited_product.is_best_seller = 1;
        }

        else if(edited_product.is_best_seller == "No" || edited_product.is_best_seller == "no")
        {
            edited_product.is_best_seller = 0;
        }
        
        req.edited_product = edited_product;
        req.uploaded_image = uploaded_image;
        next();
    }
};

exports.edit_update_category_form = (req,res,next)=>{

    const edited_category = new Category;

    edited_category.title = req.body.category_name;
    edited_category.description = req.body.category_description;
    edited_category.image_path = req.body.category_img;

    const uploaded_image = req.files.category_img_upload;

    let is_error = false;

    const errors = 
    {
        title: "",
        description: "",
        image_path: "",
        upload_image: "",
    };
 
    if(edited_category.title == "")
    {
        is_error = true;
        errors.title = "Cannot update category name if field is empty";
    };

    if(edited_category.image_path == "" && !uploaded_image)
    {
        is_error = true;
        errors.image_path = "Cannot update category image if field is empty and no image is uploaded";
    };

    if(uploaded_image)
    {
        if(!uploaded_image.mimetype.includes('image'))
        {
            is_error = true;
            errors.upload_image = "Cannot update category image if file type is not an image";
        }

        else if(uploaded_image.truncated)
        {
            is_error = true;
            errors.upload_image = "File size is too large. Maximum of 5mb allowed";
        };
    };

    if(edited_category.description == "")
    {
        is_error = true;
        errors.description = "Cannot update category description if field is empty";
    };

    if(is_error)
    {
        Category_model.get_category_by_name_id(null,req.params.id)
        .then((category)=>{
           
            res.locals.category = category;

            res.render("employee/edit_product",{

                title: "Edit your selected product here",
                html_id: "edit_stock_html",
                body_id: "edit_stock_body",
                main_id: "edit_stock_main",
                my_stock_active_link: "active_link",
                errors
            });
        })
        .catch(err=>console.log(`Error in Validate_mw: edit_update_category_form: ${err}`));
    }

    else
    {       
        req.edited_category = edited_category;
        req.uploaded_image = uploaded_image;
        next();
    }
};