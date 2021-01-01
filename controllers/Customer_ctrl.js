const express = require("express");
const General_model = require("../models/MYSQL_models/General_mdl");
const Order_model = require("../models/MYSQL_models/Order_mdl");
const Order_Product_model = require("../models/MYSQL_models/Order_Product_mdl");
const Product_model = require("../models/MYSQL_models/Product_mdl");
const User_Product_model = require("../models/MYSQL_models/User_Product_mdl");
const Product = require("../models/POJO/Product");
const { stack } = require("./Authenticate_ctrl");
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

    req.session.cart_item_total;
    let cart_item_calc = 0;

    console.log("REQ SESSION CART ITEM TOTAL - BEFORE DB PULL",req.session.cart_item_total)
    console.log("REQ SESSION USER ON CART LOAD",req.session.user_info);
    console.log("ORDER ID",req.session.order_id);

    User_Product_model.get_all_cart_products(req.session.user_info.user_id)
    .then((cart_products)=>{

        if(cart_products)
        {
            console.log("CART ITEMS FROM DB",cart_products);
            res.locals.cart_products = cart_products;

            req.session.cart_info = cart_products;

            cart_products.forEach(element => {
                
                cart_item_calc += element.cart_quantity;
            }); 
        };

        req.session.cart_item_total = cart_item_calc;
        res.locals.cart_item_total = req.session.cart_item_total;
        
        res.render("customer/my_cart",{

            title: "View and edit items in your cart",
            html_id: "my_cart_html",
            body_id: "my_cart_body",
            main_id: "my_cart_main",
            my_cart_active_link: "active_link",
            cart_products_str: JSON.stringify(cart_products)
        });
    })
    .catch(err=>console.log(`Error in Customer_ctrl: GET /customer/my-cart: ${err}`));   
});

router.post("/my-cart",function(req,res){

    //console.log("REQ BODY ON CART POST",req.body,"TEST",JSON.parse(req.body.cart_products)[0]);
    req.session.order_id = null;
    req.session.order_total = null;
    req.session.order_info = null;
    const order_items = JSON.parse(req.body.cart_products);

    Order_model.create_order(req.session.user_info.user_id)
    .then(()=>{

        let products_arr = [];
        let cart_quantity_arr = []
        console.log("ORDER ITEMS ARRAY",order_items[0].product.product_code);
        
        for(let i=0; i<order_items.length; i++)
        {
            products_arr.push(order_items[i].product.product_code);
            cart_quantity_arr.push(order_items[i].cart_quantity);
        }

        return Order_Product_model.create_transaction(products_arr, cart_quantity_arr)
    })
    .then(()=>{
        
        return General_model.mysql_commit()
    })
    .then(()=>{

        return General_model.mysql_last_insert_id()
    })
    .then((transaction_id)=>{

        console.log("ORDER PRODUCT TRANSACTION ID",transaction_id[0][0]['LAST_INSERT_ID()']);
        //transaction.order.order_id
        req.session.order_id = transaction_id[0][0]['LAST_INSERT_ID()'];
        res.redirect("/customer/confirm-order"); 
    })
    .catch(err=>{
        
        console.log(`Error in Customer_ctrl: POST /customer/my-cart: ${err}`);
        General_model.mysql_rollback();
    });
});

router.delete("/my-cart/delete/:id",function(req,res){

    User_Product_model.clear_cart_item(req.session.user_info.user_id, req.params.id)
    .then(()=>{

        res.redirect("/customer/my-cart");
    })
    .catch(err=>console.log(`Error in Customer_ctrl: DELETE /customer/my-cart/delete/:id: ${err}`));   
});

/*router.post("/confirm-order",function(req,res){

    User_Product_model.get_all_cart_products(req.session.user_info.user_id)
    .then((cart_products)=>{

        res.locals.cart_products = cart_products;

        res.render("customer/confirm_order",{

            title: "View and confirm orders for purchase",
            html_id: "my_order_html",
            body_id: "my_order_body",
            main_id: "my_order_main",
        });
    })
    .catch(err=>console.log(`Error in Customer_ctrl: POST /customer/confirm-order: ${err}`));   
});*/

router.get("/confirm-order",function(req,res){

    Order_Product_model.get_all_order_products(req.session.order_id)
    .then((order_products)=>{

        res.locals.order_products = order_products;
        console.log("ORDER OBJECT ON POST REDIRECT", order_products)

        let order_total = 0;
        let order_product_codes = [];

        for(let i=0; i<order_products.length; i++)
        {
            order_total += parseFloat(order_products[i].product.selling_price * order_products[i].order_quantity);
            order_product_codes[i] = order_products[i].product.product_code;
        };

        console.log(parseFloat(order_total),"product codes",order_product_codes);
        res.locals.order_total = parseFloat(order_total).toFixed(2);

        res.locals.order_id = req.session.order_id;
        res.locals.order_product_codes = JSON.stringify(order_product_codes);

        req.session.order_total = res.locals.order_total;
        req.session.order_info = order_products;

        console.log("ORDER QUANTITY",req.session.order_info[0].order_quantity);
        
        res.render("customer/confirm_order",{

            title: "View and confirm orders for purchase",
            html_id: "my_order_html",
            body_id: "my_order_body",
            main_id: "my_order_main",
        });
    })
    .catch(err=>console.log(`Error in Customer_ctrl: POST /customer/confirm-order: ${err}`));   
});

router.post("/purchase-complete",(req,res)=>{

    //let data = {purchase: true}
    //res.json(data.purchase);
    console.log("PURCHASE CONFIRMED REQ BODY",req.body);
    console.log(req.body[0]);

    const product_codes = []

    req.body.forEach(element => {
        
        product_codes.push(element);
    });
    console.log("PRODUCT CODES",product_codes);
    console.log("SESSION OBJECTS",req.session.order_info,
    req.session.order_total, req.session.order_id)

    Product_model.decrease_quantity(req.session.order_info, product_codes)
    .then(()=>{

        return User_Product_model.clear_cart_item(req.session.user_info.user_id, product_codes)
    })
    .then(()=>{

        console.log("TO UPDATE ORDER STATUS NOW")
        return Order_model.update_order_status(req.session.order_total, req.session.order_id)
    })
    .then(()=>{

        return Order_Product_model.update_all_order_products(req.session.order_id, product_codes)
    })
    .then(()=>{

        req.session.cart_info = null;
        req.session.cart_item_total = null;
        req.session.order_id = null;
        req.session.order_total = null;
        req.session.order_info = null;
        
        console.log("ORDER HAS BEEN COMPLETED - AWAITING REDIRECT")
        res.redirect("/");
    })
    .catch(err=>{
        
        console.log(`Error in Customer_ctrl: POST /customer/purchase-complete: ${err}`, err.stack, console.trace(err));
        //General_model.mysql_rollback();
    });
    //Order_Product_model.update_all_order_products()
});

module.exports = router;