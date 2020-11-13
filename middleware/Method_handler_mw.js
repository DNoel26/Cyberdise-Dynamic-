exports.http_delete_req = (req,res,next)=>{

    if(req.query.method == "delete")
    {
        req.method = "DELETE";
        next();
    }
};

exports.http_put_req = (req,res,next)=>{

    if(req.query.method == "PUT")
    {
        req.method = "put";
        next();
    }
};