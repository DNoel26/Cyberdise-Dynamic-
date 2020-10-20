const express = require("express");
const router = express.Router();

//*****HOME CONTROLS

router.get("/",function(req,res){

    res.render("general/home",{

        title: "Homepage: See bestsellers and available deals today",
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

//*****SIGNUP AND LOGIN CONTROLS

router.get("/signup",function(req,res){

    res.render("general/signup",{

        title: "Signup now to create your account or login to your existing account",
        html_id: "signup_page_html",
        body_id: "signup_page_body",
        main_id: "signup_page_main",
    });
});

module.exports = router;