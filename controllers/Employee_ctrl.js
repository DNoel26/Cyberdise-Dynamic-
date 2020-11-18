const express = require("express");
const router = express.Router();
const Product_model = require("../models/MYSQL_models/Product_mdl.js");
const Category_model = require("../models/MYSQL_models/Category_mdl.js");
const Category = require("../models/POJO/Category.js");
const Product = require("../models/POJO/Product.js");
const {add_category_form} = require("../middleware/Validate_mw.js")

//*****MY EMPLOYEE ACCOUNT CONTROLS

router.get("/my-account",function(req,res){
    
    //console.log("EMPLOYEE FLASH ACC",req.flash("info"));

    res.render("employee/my_employee_account",{

        title: "View and edit your employee account",
        html_id: "my_employee_account_html",
        body_id: "my_employee_account_body",
        main_id: "my_employee_account_main",
        main_class: "width_container",
        my_account_active_link: "active_link",
        //message: req.flash("info")
    });
});

router.post("/my-account",function(req,res){
    
    res.redirect("/employee/my-account");
});

//*****EDIT EMPLOYEE ACCOUNT

router.get("/edit-account",function(req,res){

    res.render("employee/edit_employee_account",{

        title: "Edit your employee account",
        html_id: "edit_employee_account_html",
        body_id: "edit_employee_account_body",
        main_id: "edit_employee_account_main",
        main_class: "width_container",
        my_account_active_link: "active_link",
    });
});

router.put("/edit-account/:id",function(req,res){

    console.log("POST REQUEST INTERCEPTED AND CHANGED TO PUT!!!");
    req.flash("message","Employee Profile updated successfully!");
    res.redirect("/employee/my-account");
});

//*****EDIT STOCK CONTROLS

router.get("/edit-stock/products",function(req,res){ 

    res.render("employee/edit_stock_products",{

        title: "View, add and edit products",
        html_id: "edit_stock_html",
        body_id: "edit_stock_body",
        main_id: "edit_stock_main",
        my_stock_active_link: "active_link",
    });
});

router.get("/edit-stock/categories",function(req,res){ 

    Category_model.get_all_categories()
    .then((categories)=>{

        console.log(categories);
        
        res.render("employee/edit_stock_categories",{

            title: "View, add and edit categories",
            html_id: "edit_stock_html",
            body_id: "edit_stock_body",
            main_id: "edit_stock_main",
            my_stock_active_link: "active_link",
            categories,
        });
    })
    .catch(err=>console.log(`Error in Employee_ctrl: GET /edit-stock/categories: ${err}`));
});

//*****RESTOCK PRODUCTS

router.get("/edit-stock/restock",function(req,res){ 

    res.render("employee/restock",{

        title: "Order stock from available suppliers",
        html_id: "edit_stock_html",
        body_id: "edit_stock_body",
        main_id: "edit_stock_main",
        my_stock_active_link: "active_link",
        products: ["item_1","item_2"]
    });
});

router.post("/edit-stock/restock",function(req,res){ 

    if(req.body.supplier.length > 1) 
    {
        req.flash("message","New Orders Placed successfully!");  
    }

    else
    {
        req.flash("message","New Order Placed successfully!");
    }

    console.log(req.body);
    res.redirect("/employee/edit-stock/products");
});

//*****ADD CATEGORIES

router.get("/edit-stock/add-categories",function(req,res){ 

    res.render("employee/add_categories",{

        title: "Add new product categories to the store",
        html_id: "edit_stock_html",
        body_id: "edit_stock_body",
        main_id: "edit_stock_main",
        my_stock_active_link: "active_link",
    });
});

router.post("/edit-stock/add-categories",add_category_form,function(req,res){ 

    console.log("VALIDATED CREATE CATEGORY");
    Category_model.create_category(req.created_category)
    .then(()=>{

        if(req.created_category.title.length > 1) 
        {
            req.flash("message","New Categories Added successfully!");  
        }

        else
        {
            req.flash("message","New Category Added successfully!");
        };

        console.log(req.body);
        res.redirect("/employee/edit-stock/categories");
    })
    .catch(err=>console.log(`Error in Employee_ctrl: POST /edit-stock/add-categories: ${err}`));
});

//*****ADD PRODUCTS

router.get("/edit-stock/add-products",function(req,res){ 

    res.render("employee/add_products",{

        title: "Add new products to the store",
        html_id: "edit_stock_html",
        body_id: "edit_stock_body",
        main_id: "edit_stock_main",
        my_stock_active_link: "active_link",
    });
});

router.post("/edit-stock/add-products",function(req,res){ 

    const queried_category = new Category;

    const created_product = new Product;

    created_product.category = queried_category;

    created_product.title = req.body.product_name;
    created_product.category.title = req.body.product_category;
    created_product.current_quantity = req.body.product_quantity;
    created_product.min_qty = req.body.product_min_quantity;
    created_product.max_qty = req.body.product_max_quantity;
    created_product.cost_price = req.body.product_cost_price;
    created_product.selling_price = req.body.product_selling_price;
    created_product.image_path = req.body.product_img;
    created_product.is_best_seller = req.body.product_bestseller;
    created_product.description = req.body.product_description;

    console.log("0 - CREATED PRODUCT");
    console.log("1",created_product);
    console.log("2",created_product.category);
    console.log("3",created_product.title,created_product.category.title);
    console.log("4 - CREATED PRODUCT",created_product.title[0],created_product.title[1]);
    
    //Product_model.create_product();

    if(req.body.product_name.length > 1) 
    {
        req.flash("message","New Products Added successfully!");  
    }

    else
    {
        req.flash("message","New Product Added successfully!");
    }

    console.log("CREATED PRODUCT REQ BODY",req.body);
    res.redirect("/employee/edit-stock/products");
});

//*****EDIT CATEGORY

router.get("/edit-stock/edit-category",function(req,res){ 

    res.render("employee/edit_category",{

        title: "Edit your selected category here",
        html_id: "edit_stock_html",
        body_id: "edit_stock_body",
        main_id: "edit_stock_main",
        my_stock_active_link: "active_link",
    });
});

router.put("/edit-stock/edit-category/:id",function(req,res){

    req.flash("message",`Successfully updated category '${req.body.category_name}'!`);
    res.redirect("/employee/edit-stock/categories");
})

//*****EDIT PRODUCT

router.get("/edit-stock/edit-product",function(req,res){ 

    res.render("employee/edit_product",{

        title: "Edit your selected product here",
        html_id: "edit_stock_html",
        body_id: "edit_stock_body",
        main_id: "edit_stock_main",
        my_stock_active_link: "active_link",
    });
});

router.put("/edit-stock/edit-product/:id",function(req,res){

    req.flash("message",`Successfully updated product '${req.body.product_name}' (code: ${req.body.product_code})!`);
    res.redirect("/employee/edit-stock/products");
})

module.exports = router;