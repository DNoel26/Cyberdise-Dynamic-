const express = require("express");
const router = express.Router();
const app = express(); 
const Product_model = require("../models/MYSQL_models/Product_mdl.js");
const Category_model = require("../models/MYSQL_models/Category_mdl.js");
const Category = require("../models/POJO/Category.js");
const Product = require("../models/POJO/Product.js");
const Product_Shipment = require("../models/POJO/Product_Shipment.js");
const Shipment = require("../models/POJO/Shipment.js");
const {add_category_form,add_product_form,
    edit_update_product_form,edit_update_category_form} = require("../middleware/Validate_mw.js");
const General_model = require("../models/MYSQL_models/General_mdl.js");
const Shipment_model = require("../models/MYSQL_models/Shipment_mdl.js");
const Product_Shipment_model = require("../models/MYSQL_models/Product_Shipment_mdl.js");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const image_uploader = require("../middleware/Image_Upload_mw.js");



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

    let test_products = [{title: "TESTING",description: "A B C D E F G!!!"},{title: "OTHER",description: "HMMM!!!"}];
    Product_model.get_all_products()
    .then((products)=>{

        //console.log("FROM GET ALL PRODUCTS",products);
        if(products)
        {
            for(let i=0; i<products.length; i++)
            {
                if(products[i].is_best_seller == 1)
                {
                    products[i].is_best_seller = "Yes";
                }

                else
                {
                    products[i].is_best_seller = "No";
                };
            };
        }
                
        res.render("employee/edit_stock_products",{

            title: "View, add and edit products",
            html_id: "edit_stock_html",
            body_id: "edit_stock_body",
            main_id: "edit_stock_main",
            my_stock_active_link: "active_link",
            products,
        });
    })
    .catch(err=>console.log(`Error in Employee_ctrl: GET /edit-stock/products: ${err}`));
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

    Product_model.get_all_products()
    .then((products)=>{

        res.render("employee/restock",{

            title: "Order stock from available suppliers",
            html_id: "edit_stock_html",
            body_id: "edit_stock_body",
            main_id: "edit_stock_main",
            my_stock_active_link: "active_link",
            products,
        });
    })
    .catch(err=>console.log(`Error in Employee_ctrl.js: GET /edit-stock/restock ${err}`));
});

router.get("/edit-stock/restock/data",function(req,res){ 

    Product_model.get_all_products()
    .then((data)=>{
        
        res.json(data);
    })
});

router.post("/edit-stock/restock",function(req,res){ 

    const created_shipment = new Shipment;
    //created_shipment.

    console.trace("REQ SESSION USER INFO",req.session.user_info);
    //created_shipment.employee_id = req.session.user_info.

    const created_inventory = new Product_Shipment;
    const restocked_product = new Product;

    created_inventory.product = restocked_product;
    
    created_inventory.supplier = req.body.supplier;
    restocked_product.product_code = req.body.product_code;
    created_inventory.restock_quantity = req.body.product_quantity;

    General_model.mysql_transaction()
    .then(()=>{

        return Shipment_model.create_shipment(req.session.user_info.user_id);
    })
    .then(()=>{

        return General_model.mysql_last_insert_id();
    })
    .then((data)=>{

        //console.log("LAST SHIPMENT ID DATA",data);
        const last_shipment_id = data[0][0]['LAST_INSERT_ID()'];

        return Product_Shipment_model.product_restock(restocked_product.product_code,last_shipment_id,
            created_inventory.supplier,created_inventory.restock_quantity);
    })
    .then((shipment_data)=>{

        console.trace("SHIPMENT DATA",shipment_data);
        
        return Product_model.increase_quantity(created_inventory.restock_quantity,restocked_product.product_code);
    })
    .then(()=>{

        General_model.mysql_commit();
    })
    .then(()=>{

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
    })
    .catch(err=>{
        
        console.log(`Error in Employee_ctrl: POST /edit-stock/restock: ${err}`);
        General_model.mysql_rollback();
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

router.post("/edit-stock/add-categories",add_category_form,function(req,res){ 

    image_uploader(req.uploaded_image, req.created_category.image_path)

    console.log("VALIDATED CREATE CATEGORY");
    Category_model.create_categories(req.created_category)
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
    .catch(err=>{
        console.log(`Error in Employee_ctrl: POST /edit-stock/add-categories: ${err}`);
        console.trace(err);
        err.stack;
    });
});

//*****ADD PRODUCTS

router.get("/edit-stock/add-products",function(req,res){ 

    Category_model.get_all_categories()
    .then((categories)=>{

        res.locals.categories = categories

        res.render("employee/add_products",{

            title: "Add new products to the store",
            html_id: "edit_stock_html",
            body_id: "edit_stock_body",
            main_id: "edit_stock_main",
            my_stock_active_link: "active_link",
        });
    })
    .catch(err=>console.log(`Error in Employee_ctrl: GET /edit-stock/add-products: ${err}`));
});

router.get("/edit-stock/add-products/data",function(req,res){ 

    Category_model.get_all_categories()
    .then((data)=>{

        res.json(data);
    })
});

router.post("/edit-stock/add-products",add_product_form,function(req,res){ 

    //Product_model.create_product();
    console.log("VALIDATED CREATE PRODUCT",req.body);
    
    image_uploader(req.uploaded_image, req.created_product.image_path);
    /*const uuid = [];
    
    if(req.uploaded_image)
    {
        for(let i=0; i<req.uploaded_image.length; i++)
        {
            uuid[i] = uuidv4();
        }
    }
    
    req.created_product.image_path.forEach((element,index) => {
        
        if(!element || element == "" || element == undefined)
        {
            console.log("IMAGE PATH DOES NOT EXIST!!!")
            req.created_product.image_path[index] = '/img/Products/default_product.png'; 
        };

        if(fs.existsSync(`public${element}`))
        {
            console.log("THIS IMAGE FILE EXISTS");
        }

        else
        {
            req.created_product.image_path[index] = '/img/Products/default_product.png'; 
        };
    });

    if(req.uploaded_image)
    {
        req.uploaded_image.forEach((element,index) => {
            if(element)
            {
                const new_file_name = `${uuid[index]}_${element.name}`
                
                element.mv(`public/img/Uploads/Products_upl/${new_file_name}`);
                req.created_product.image_path[index] = `/img/Uploads/Products_upl/${new_file_name}`;
            }
        });
    };*/
    
    // Category_model.get_categories_by_names_check(req.created_product.category.title) //body.product_category)
    // .then((selected_categories)=>{
        
        // console.log("SELECTED CATEGORIES ON CREATION",selected_categories);
        // return
    //}) 
    Product_model.create_products(req.created_product,req.body.product_category_id) //selected_categories)
    .then(()=>{

        if(req.created_product.title.length > 1) 
        {
            req.flash("message","New Products Added successfully!");  
        }

        else
        {
            req.flash("message","New Product Added successfully!");
        }

        console.log(req.created_product);
        
        //console.log("CREATED PRODUCT REQ BODY",req.body);
        res.redirect("/employee/edit-stock/products");
    })
    .catch(err=>{
        
        console.log(`Error in Employee_ctrl: POST /edit-stock/add-products: ${err}`);
        console.trace(err);
        err.stack;
    });
});

//*****EDIT CATEGORY

router.get("/edit-stock/edit-category/:id",function(req,res){ 

    Category_model.get_category_by_name_id(null,req.params.id)
    .then((category)=>{

        res.locals.category = category;

        res.render("employee/edit_category",{

            title: "Edit your selected category here",
            html_id: "edit_stock_html",
            body_id: "edit_stock_body",
            main_id: "edit_stock_main",
            my_stock_active_link: "active_link",
        });
    })
    .catch(err=>console.log(`Error in Employee_ctrl: GET /edit-stock/edit-category/:id: ${err}`));
});

router.put("/edit-stock/edit-category/:id",edit_update_category_form,function(req,res){

    //Product_model.edit_update_product(req.params)
    req.edited_category.image_path = image_uploader(req.uploaded_image, req.edited_category.image_path);
    console.log("REQ PARAMS CATEGORIES",req.params);

    Category_model.edit_update_category(req.edited_category.title, req.edited_category.description,
        req.edited_category.image_path, req.params.id)
    .then(()=>{

        req.flash("message",`Successfully updated category '${req.body.category_name}'!`);
        res.redirect("/employee/edit-stock/categories");
    })
    .catch(err=>console.log(`Error in Employee_ctrl: PUT /edit-stock/edit-category/:id: ${err}`));
});

/*router.post("/edit-stock/delete-category/:id",function(req,res){

    res.send("DELETE CATEGORY");
});*/

router.delete("/edit-stock/delete-category/:id",function(req,res){

    Category_model.delete_category(req.params.id)
    .then(()=>{

        req.flash("message",`Successfully deleted category '${req.body.category_name}'!`);
        res.redirect("/employee/edit-stock/categories");
    })
    .catch(err=>console.log(`Error in Employee_ctrl: DELETE /edit-stock/delete-category/:id: ${err}`))
});

//*****EDIT PRODUCT

router.get("/edit-stock/edit-product/:id",function(req,res){ 

    Category_model.get_all_categories()
    .then((categories)=>{

        res.locals.categories = categories;

        return Product_model.get_product_by_name_code(null,req.params.id)
    })
    .then((product)=>{

        if(product.is_best_seller == 1)
        {
            product.is_best_seller = "Yes";
        }

        else if(product.is_best_seller == 0)
        {
            product.is_best_seller = "No";
        };

        //console.log(req.app.locals);
        console.log("PRODUCT PARAMS ID",product);
        console.log("PRODUCT SELLING PRICE",product.selling_price,"PRODUCT QUANTITY",product.current_quantity);

        res.locals.product = product;

        res.render("employee/edit_product",{

            title: "Edit your selected product here",
            html_id: "edit_stock_html",
            body_id: "edit_stock_body",
            main_id: "edit_stock_main",
            my_stock_active_link: "active_link",
        });
    })
    .catch(err=>console.log(`Error in Employee_ctrl: GET /edit-stock/edit-product/:id: ${err}`));
});

router.put("/edit-stock/edit-product/:id",edit_update_product_form,function(req,res){

    //console.log("REQ PARAMS PRODUCTS",req.params);
    //console.log("REQ PARAM FILE",req.uploaded_image,"REQ PARAM BODY",req.edited_product)

    req.edited_product.image_path = image_uploader(req.uploaded_image, req.edited_product.image_path);

    //console.log("TEST",req.edited_product.is_best_seller,req.edited_product.category.title,
    //    req.edited_product.product_code)
    
    Product_model.edit_update_product(req.edited_product.min_qty, req.edited_product.max_qty,
        req.edited_product.selling_price, req.edited_product.cost_price, req.edited_product.current_quantity,
        req.edited_product.title, req.edited_product.description, req.edited_product.image_path,
        req.edited_product.is_best_seller, req.edited_product.category.title, req.params.id)
    .then(()=>{

        /*const uuid = uuidv4();

        if(req.files.product_img_upload)
        {
            const new_file_name = `${uuid}_${req.files.product_img_upload.name}`
            
            req.files.product_img_upload.mv(`public/img/Uploads/Products_upl/${new_file_name}`);
            req.body.product_img = `/img/Uploads/Products_upl/${new_file_name}`;
        };*/

        req.flash("message",`Successfully updated product '${req.body.product_name}' (code: ${req.body.product_code})!`);
        res.redirect("/employee/edit-stock/products");
    })
    .catch(err=>console.log(`Error in Employee_ctrl: PUT /edit-stock/edit-product/:id: ${err}`));
})

module.exports = router;