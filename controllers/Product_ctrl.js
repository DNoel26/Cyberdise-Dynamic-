const express = require("express");
const router = express.Router();

//*****ALL PRODUCTS CONTROLS

router.get("/all-products",function(req,res){

    res.render("products/all_products",{

        title: "View all products across all our available categories",
        html_id: "products_page_html",
        body_id: "products_page_body",
        main_id: "products_page_main",
        shop_now_active_link: "active_link",
    });
});

//*****PRODUCT OVERVIEW CONTROLS

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