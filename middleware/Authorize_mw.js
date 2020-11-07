exports.is_already_logged_in = (req,res,next)=>{ //redirects if attempts to go to signup page

    if(req.session.user_info)
    {
        req.flash("message","Already Logged in! Please Logout to continue");
        res.redirect("/");
    }

    else
    {
        next();
    };
};

exports.is_authorized_customer = (req,res,next)=>{

    if(req.session.user_info)
    {
        if(req.session.user_info.role === "customer")
        {
            next();
        }

        else if(req.session.user_info.role === "employee")
        {
            res.redirect("/employee/my-account");
        };
    }

    else
    {
        res.redirect("/");
    };
};


exports.is_authorized_employee = (req,res,next)=>{

    if(req.session.user_info)
    {
        if(req.session.user_info.role === "employee")
        {
            next();
        }

        else if(req.session.user_info.role === "customer")
        {
            res.redirect("/customer/my-account");
        };
    }

    else
    {
        res.redirect("/");
    };
};