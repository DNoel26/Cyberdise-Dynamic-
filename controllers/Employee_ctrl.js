const express = require("express");
const router = express.Router();

//*****MY EMPLOYEE ACCOUNT CONTROLS

router.get("/my-account",function(req,res){

    res.render("employee/my_employee_account",{

        title: "View and edit your employee account",
        html_id: "my_employee_account_html",
        body_id: "my_employee_account_body",
        main_id: "my_employee_account_main",
        main_class: "width_container",
        my_account_active_link: "active_link",
    });
});

//*****EDIT STOCK CONTROLS

router.get("/edit-stock",function(req,res){ 

    res.render("employee/edit_stock",{

        title: "View, add and edit product categories and stock",
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

module.exports = router;