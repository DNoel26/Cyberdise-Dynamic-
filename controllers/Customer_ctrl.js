const express = require("express");
const router = express.Router();

//*****MY CUSTOMER ACCOUNT CONTROLS

router.get("/my-account",function(req,res){
    
    res.render("customer/my_customer_account",{

        title: "View and edit your customer account",
        html_id: "my_customer_account_html",
        body_id: "my_customer_account_body",
        main_id: "my_customer_account_main",
        main_class: "width_container",
        my_account_active_link: "active_link",
    });
});

router.post("/my-account",function(req,res){
    
    res.redirect("/customer/my-account");
});

//*****MY CUSTOMER EDIT ACCOUNT

router.get("/edit-account",function(req,res){

    res.render("customer/edit_customer_account",{

        title: "Edit your customer account",
        html_id: "my_customer_account_html",
        body_id: "my_customer_account_body",
        main_id: "my_customer_account_main",
        main_class: "width_container",
        my_account_active_link: "active_link",
    });
});

//*****MY CART CONTROLS

router.get("/my-cart",function(req,res){

    res.render("customer/my_cart",{

        title: "View and edit items in your cart",
        html_id: "my_cart_html",
        body_id: "my_cart_body",
        main_id: "my_cart_main",
        my_cart_active_link: "active_link",
    });
});

router.post("/my-cart",function(req,res){
    
    res.render("customer/my_cart",{

        title: "View and edit items in your cart",
        html_id: "my_cart_html",
        body_id: "my_cart_body",
        main_id: "my_cart_main",
        my_cart_active_link: "active_link",
    });
});

module.exports = router;