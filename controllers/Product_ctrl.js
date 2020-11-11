const express = require("express");
const router = express.Router();

//*****ALL PRODUCTS CONTROLS

router.get("/all-products",function(req,res){

    const test_array = [];
    
    for(let i = 0; i < 100; i++)
    {
        let test_product = {};
        
        if(i == 0 || (i - 1) % 7 == 0)
        {
            test_product =
            {
                id: 1,
                src: "programmer_jersey.jpg",
                title: "Programmer T-Shirt",
                price: "$" + 52.75
            }  
        }

        else if((i - 1) % 5 == 0)
        {
            test_product =
            {
                id: 2,
                src: "echo_dot.png",
                title: "Alexa Echo Dot (new)",
                price: "$" + 199.98
            }
        }

        else
        {   
            test_product =
            {
                id: 3,
                src: "default_product.png",
                title: "Some Product",
                price: "$" + 100.00
            }
        }
        
        test_array.push(test_product);
    }

    console.log(test_array)

    res.render("products/all_products",{

        title: "View all products across all our available categories",
        html_id: "products_page_html",
        body_id: "products_page_body",
        main_id: "products_page_main",
        shop_now_active_link: "active_link",
        products: test_array
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