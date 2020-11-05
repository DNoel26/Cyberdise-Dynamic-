exports.http_delete_req = (req,res,next)=>{

    if(req.query.method == "DELETE")
    {
        req.method = "delete";
    }
};

exports.http_put_req = (req,res,next)=>{

    if(req.query.method == "PUT")
    {
        req.method = "put";
    }
};