const express = require("express");
const Product_model = require("../models/MYSQL_models/Product_mdl");
const User_Product_model = require("../models/MYSQL_models/User_Product_mdl");
const User_Product = require("../models/POJO/User_Product");
const router = express.Router();

//*****ALL PRODUCTS CONTROLS

router.get("/all-products",function(req,res){

    const test_array = [];
    
    for(let i = 0; i < 200; i++)
    {
        let test_product = {};
        
        if(i == 0 || (i - 1) % 7 == 0)
        {
            test_product =
            {
                id: 1,
                image_path: "/img/fake_db_imgs/programmer_jersey.jpg",
                title: "Programmer T-Shirt",
                selling_price: "$" + 52.75,
                is_best_seller: true
            }  
        }

        else if((i - 1) % 5 == 0)
        {
            test_product =
            {
                id: 2,
                image_path: "/img/fake_db_imgs/echo_dot.png",
                title: "Alexa Echo Dot (new)",
                selling_price: "$" + 199.98,
                is_best_seller: false
            }
        }

        else
        {   
            test_product =
            {
                id: 3,
                image_path: "/img/fake_db_imgs/default_product.png",
                title: "Some Product",
                selling_price: "$" + 100.00,
                is_best_seller: false
            }
        }
        
        test_array.push(test_product);
    }

    Product_model.get_all_products()
    .then((products)=>{

        res.locals.products = products;

        res.render("products/all_products",{

            title: "View all products across all our available categories",
            html_id: "products_page_html",
            body_id: "products_page_body",
            main_id: "products_page_main",
            shop_now_active_link: "active_link",
            //products: test_array
        });
    })
    .catch(err=>console.log(`Error in Product_ctrl: GET /product/all-products: ${err}`));
});

//*****PRODUCT OVERVIEW CONTROLS

router.get("/product-overview/:id",function(req,res){

    let logged_in = false;
    let user_id;

    if(req.session.user_info)
    {
        logged_in = true;
        user_id = req.session.user_info.user_id;
    }

    else
    {
        user_id = null;
    };

    Product_model.get_product_by_name_code(null, req.params.id)
    .then((product)=>{

        res.locals.product = product;

        if(req.session.user_info)
        {
            return User_Product_model.check_cart_product_partial(req.session.user_info.user_id, parseInt(req.params.id))
        }
    })
    .then((cart)=>{

        res.locals.cart = cart;

        if(cart)
        {
            console.log("CART",cart,"CART PRODUCT",cart.product,"CART PRODUCT CATEGORY",cart.product.category);
        }

        res.render("products/product_overview",{

            title: "Product overview: See full details about your selected product",
            html_id: "product_overview_html",
            body_id: "product_overview_body",
            main_id: "product_overview_main",
            shop_now_active_link: "active_link",
        });
    })
    .catch(err=>console.log(`Error in Product_ctrl: GET /product/product-overview: ${err}`));
});

router.post("/product-overview/:id",function(req,res){

    console.log("BODYYY POST",req.body.product_cart_quantity_add);

    User_Product_model.create_cart_storage(req.session.user_info.user_id, req.params.id, req.body.product_cart_quantity_add)
    .then(()=>{

        res.redirect("/customer/my-cart");
    })
    .catch(err=>console.log(`Error in Product_ctrl: POST /product/product-overview/:id: ${err}`));
});

router.patch("/product-overview/add:id",function(req,res){

    console.log("BODYYY PATCH ADD",req.body.product_cart_quantity_add);

    User_Product_model.increase_quantity_in_cart(req.body.product_cart_quantity_add, req.session.user_info.user_id, req.params.id)
    .then(()=>{

        res.redirect("/customer/my-cart");
    })
    .catch(err=>console.log(`Error in Product_ctrl: PATCH /product/product-overview/add:id: ${err}`));
});

router.patch("/product-overview/return:id",function(req,res){

    console.log("BODYYY PATCH RETURN",req.body.product_cart_quantity_ret);

    User_Product_model.decrease_quantity_in_cart(req.body.product_cart_quantity_ret, req.session.user_info.user_id, req.params.id)
    .then(()=>{

        res.redirect("/customer/my-cart");
    })
    .catch(err=>console.log(`Error in Product_ctrl: PATCH /product/product-overview/return:id: ${err}`));
});

router.get("/product-overview",function(req,res){

    res.render("products/product_overview",{

        title: "Product overview: See full details about your selected product",
        html_id: "product_overview_html",
        body_id: "product_overview_body",
        main_id: "product_overview_main",
        shop_now_active_link: "active_link",
    });
});

module.exports = router;