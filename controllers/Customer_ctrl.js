const express = require("express");
const router = express.Router();

//*****MY CUSTOMER ACCOUNT CONTROLS

router.get("/customer/my-account",function(req,res){

    res.render("customer/my_customer_account",{

        title: "View and edit your customer account",
        html_id: "my_customer_account_html",
        body_id: "my_customer_account_body",
        main_id: "my_customer_account_main",
        main_class: "width_container",
        my_account_active_link: "active_link",
    });
});

//*****MY CART CONTROLS

router.get("/customer/my-cart",function(req,res){

    res.render("customer/my_cart",{

        title: "View and edit items in your cart",
        html_id: "my_cart_html",
        body_id: "my_cart_body",
        main_id: "my_cart_main",
        my_cart_active_link: "active_link",
    });
});

module.exports = router;