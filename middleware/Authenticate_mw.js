const is_auth = (req,res,next)=>{

    if(req.session.user_info)
    {
        next();
    }

    else
    {
        res.redirect("/");
    };
};

module.exports = is_auth;