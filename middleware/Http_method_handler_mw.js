const http_req = (req,res,next)=>{

    if(req.query.method == "delete")
    {
        req.method = "DELETE";
        console.log("CHANGED TO DELETE IN HTTP REQ HANDLER");
    }

    else if(req.query.method == "put")
    {
        req.method = "PUT";
        console.log("CHANGED TO PUT IN HTTP REQ HANDLER");
    }

    next();
};

module.exports = http_req;