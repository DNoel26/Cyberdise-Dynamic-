const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

/* Receives req.files.whatever_form_name_image and req.body.whatever_form_name_image_path as arguments*/

const image_uploader = (image_upl,image_path)=>{

    console.log("ENTERED IMAGE UPLOADER - FUNCTION");

    //return (req,res,next)=>{

        console.log("ENTERED IMAGE UPLOADER - RETURN");

        if(image_upl) 
        {
            console.log("IMAGE UPLOADED = TRUE");

            if(Array.isArray(image_upl) && image_upl.length >= 1) //in the event multiple images are uploaded in an array
            {
                console.log("ENTERED IMAGE UPL ARRAY LOOP");
                const uuid = [];

                for(let i=0; i<image_upl.length; i++)
                {
                    uuid[i] = uuidv4();
                }

                image_upl.forEach((element,index) => {
                    if(element)
                    {
                        const new_file_name = `${uuid[index]}_${element.name}`
                        
                        element.mv(`public/img/Uploads/Products_upl/${new_file_name}`);
                        return image_path[index] = `/img/Uploads/Products_upl/${new_file_name}`;
                    }
                });
            }
            
            else if(!Array.isArray(image_upl))
            {
                console.log("ENTERED IMAGE UPL SINGLE ITEM");
                const uuid = uuidv4();

                const new_file_name = `${uuid}_${image_upl.name}`;
                        
                image_upl.mv(`public/img/Uploads/Products_upl/${new_file_name}`);
                return image_path = `/img/Uploads/Products_upl/${new_file_name}`;
            }

            //next();
        }
        

        else
        {
            console.log("NO IMAGE UPLOADED");

            if(Array.isArray(image_path) && image_path.length >= 1)
            {
                console.log("ENTERED IMAGE PATH ARRAY LOOP");
                
                image_path.forEach((element,index) => {
                
                    if(!element || element == "" || element == undefined)
                    {
                        console.log("IMAGE PATH DOES NOT EXIST!!!")
                        return image_path[index] = '/img/Products/default_product.png'; 
                    };
    
                    if(fs.existsSync(`public${element}`))
                    {
                        console.log("THIS IMAGE FILE EXISTS");
                        return image_path[index] = image_path[index];
                    }
    
                    else
                    {
                        return image_path[index] = '/img/Products/default_product.png'; 
                    };
                });
            } 

            else if(!Array.isArray(image_path))
            {
                console.log("ENTERED IMAGE PATH SINGLE ITEM");
                
                if(!image_path || image_path == "" || image_path == undefined)
                {
                    console.log("IMAGE PATH DOES NOT EXIST!!!")
                    return image_path = '/img/Products/default_product.png'; 
                };

                if(fs.existsSync(`public${image_path}`))
                {
                    console.log("THIS IMAGE FILE EXISTS");
                    return image_path = image_path;
                }

                else
                {
                    return image_path = '/img/Products/default_product.png'; 
                };   
            }

            //next();
        };
    }      
//}

module.exports = image_uploader;