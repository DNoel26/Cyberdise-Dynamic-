const express = require("express");
const User_Product_model = require("../models/MYSQL_models/User_Product_mdl");
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

    console.log("REQ SESSION USER ON CART LOAD",req.session.user_info);

    User_Product_model.get_all_cart_products(req.session.user_info.user_id)
    .then((cart_products)=>{

        console.log("CART ITEMS FROM DB",cart_products);
        res.locals.cart_products = cart_products;

        res.render("customer/my_cart",{

            title: "View and edit items in your cart",
            html_id: "my_cart_html",
            body_id: "my_cart_body",
            main_id: "my_cart_main",
            my_cart_active_link: "active_link",
        });
    })
    .catch(err=>console.log(`Error in Customer_ctrl: GET /customer/my-cart: ${err}`));   
});

router.post("/my-cart",function(req,res){

    res.redirect("/customer/my-cart"); 
});

router.delete("/my-cart/delete/:id",function(req,res){

    User_Product_model.delete_cart_storage(req.session.user_info.user_id, req.params.id)
    .then(()=>{

        res.redirect("/customer/my-cart");
    })
    .catch(err=>console.log(`Error in Customer_ctrl: DELETE /customer/my-cart/delete/:id: ${err}`));   
});

router.post("/confirm-order",function(req,res){

    res.render("customer/confirm_order",{

        title: "View and confirm orders for purchase",
        html_id: "my_order_html",
        body_id: "my_order_body",
        main_id: "my_order_main",
        //my_cart_active_link: "active_link",
    });
});

module.exports = router;