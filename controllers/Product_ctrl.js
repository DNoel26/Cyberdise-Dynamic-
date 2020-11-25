const express = require("express");
const Product_model = require("../models/MYSQL_models/Product_mdl");
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

    Product_model.get_product_by_name_code(null,req.params.id)
    .then((product)=>{

        res.locals.product = product;

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