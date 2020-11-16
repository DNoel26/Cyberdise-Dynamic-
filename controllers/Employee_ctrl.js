const express = require("express");
const router = express.Router();

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

    res.render("employee/edit_stock_categories",{

        title: "View, add and edit categories",
        html_id: "edit_stock_html",
        body_id: "edit_stock_body",
        main_id: "edit_stock_main",
        my_stock_active_link: "active_link",
    });
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

router.post("/edit-stock/add-categories",function(req,res){ 

    if(req.body.category_name.length > 1) 
    {
        req.flash("message","New Categories Added successfully!");  
    }

    else
    {
        req.flash("message","New Category Added successfully!");
    }

    console.log(req.body);
    res.redirect("/employee/edit-stock/categories");
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

    if(req.body.product_name.length > 1) 
    {
        req.flash("message","New Products Added successfully!");  
    }

    else
    {
        req.flash("message","New Product Added successfully!");
    }

    console.log(req.body);
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