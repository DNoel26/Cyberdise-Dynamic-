const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2/promise");
const session = require("express-session");
const body_parser = require("body-parser");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const file_upload = require("express-fileupload");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config({path: "config/keys.env"});

const MySQL_DB = require("./config/MySQL_DAO.js");
const User = require("./models/POJO/User.js");
const Customer = require("./models/POJO/Customer.js");
const Employee = require("./models/POJO/Employee.js");

const General_Controller = require("./controllers/General_ctrl.js");
const Customer_Controller = require("./controllers/Customer_ctrl.js");
const Employee_Controller = require("./controllers/Employee_ctrl.js");
const Product_Controller = require("./controllers/Product_ctrl.js");
const Authentication_Controller = require("./controllers/Authenticate_ctrl.js");
const Authorization_Controller = require("./controllers/Authorize_ctrl.js");

/*const controller_arr = [General_Controller,Customer_Controller,Employee_Controller,
                        Product_Controller,Authentication_Controller,Authorization_Controller];
const middleware_arr = [];*/
                 
//const mysql = require("mysql2");

/*const conn = mysql.createConnection({

    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.TEST
});*/

const app = express();

app.engine("handlebars",exphbs());
app.set("view engine","handlebars");

app.use(express.static("public"));
app.use(body_parser.urlencoded({extended: false}));

app.use("/",General_Controller);
app.use("/customer",Customer_Controller);
app.use("/employee",Employee_Controller);
app.use("/products",Product_Controller);
app.use("/authenticate",Authentication_Controller);
app.use("/authorize",Authorization_Controller);

/*app.get("/",function(req,res){

    res.render("general/home",{

        title: "Home",
        html_id: "home_page_html",
        body_id: "home_page_body",
        main_id: "home_page_main",
        main_class: ["scroll_snap_start_pos "],
        home: true,
        home_active_link: "active_link",
        best_sellers: ["Electronics","Food"],
        trial: "<h1>LETS GO</h1>"
    });
    
    //res.send("HOME 2");
});

app.get("/signup",function(req,res){

    res.render("general/signup",{

        title: "Signup",
        html_id: "signup_page_html",
        body_id: "signup_page_body",
        main_id: "signup_page_main",
        home_active_link: "active_link",
    });
    
    //res.send("HOME 2");
});*/

const User1 = new User;
User1.first_name = "John";
const Employee1 = new Employee;
console.log(`User ${User1.first_name} Employee ${Employee1.first_name}`);

app.listen(process.env.PORT,()=>{

    console.log(`Server is connected and running`);
    MySQL_DB.init();
});

