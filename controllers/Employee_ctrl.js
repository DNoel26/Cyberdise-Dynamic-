const express = require("express");
const router = express.Router();

//*****MY EMPLOYEE ACCOUNT CONTROLS

router.get("/employee/my-account",function(req,res){

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

router.get("/employee/edit-stock",function(req,res){

    res.render("employee/edit_stock",{

        title: "View, add and edit product categories and stock",
        html_id: "edit_stock_html",
        body_id: "edit_stock_body",
        main_id: "edit_stock_main",
        my_account_active_link: "active_link",
    });
});

module.exports = router;