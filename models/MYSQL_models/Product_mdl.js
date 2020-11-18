const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO_pool.js");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");
const Product = require("../POJO/Product.js");

const Product_model =
{ 
    create_product(product)
    {
        return new Promise((resolve,reject)=>{
            
            let product_arr = [];
            
            for(let i=0; i < product.title.length; i++)
            {
                let product_arr_sub = [];
                product_arr_sub[0] = product.min_qty[i];
                product_arr_sub[1] = product.max_qty[i];
                product_arr_sub[2] = product.selling_price[i];
                product_arr_sub[3] = product.cost_price[i];
                product_arr_sub[4] = product.current_quantity[i];
                product_arr_sub[5] = product.title[i];
                product_arr_sub[6] = product.description[i];
                product_arr_sub[7] = product.image_path[i];
                product_arr_sub[8] = product.category.title[i];
                product_arr_sub[9] = product.is_best_seller[i];

                //console.log("length",product.title.length);
                //console.log("i",i);
                product_arr[i] = product_arr_sub;
            }

            //console.log(product_arr);
            //product_arr = [product]

            this.SQL = `INSERT IGNORE INTO product (min,max,selling_price,cost_price,quantity,title,
                description,image_path,category,is_best_seller) VALUES ?;`;
            db.connection.query(this.SQL, [product_arr])
            .then((input_data)=>{
                
                resolve(input_data);
            })
            .catch((err)=>{

                reject(`Error in Project_mdl.js: create_project(): ${err}`);
            });
        })
    },

    get_all_products()
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `SELECT * FROM product`;
            db.connection.query(this.SQL)
            .then(([rows,fields])=>{
                
                const products = [];

                rows.forEach(row => {
                    
                    const product = new Product;

                    product.product_code = row.product_code;
                    product.min_qty = row.min_qty;
                    product.max_qty = row.max_qty;
                    product.selling_price = row.selling_price;
                    product.cost_price = row.cost_price;
                    product.current_quantity = row.current_quantity;
                    product.title = row.title;
                    product.description = row.description;
                    product.image_path = row.image_path;
                    product.category = row.category;
                    product.is_best_seller = row.is_best_seller;
                    product.date_created = row.date_created;
                    product.last_modified = row.last_modified;

                    products.push(product);
                });

                resolve(products);
            })
            .catch((err)=>{

                reject(`Error in Product_mdl.js: get_all_products(): ${err}`);
            });
        })
    },

    get_products_by_names(product_name_arr)
    {
        return new Promise((resolve,reject)=>{
            
            const product_names = product_name_arr.map(item => `"${item}"`).join();
            
            console.log(product_name_arr,"Product names joined",product_names);

            this.SQL = `SELECT * FROM product 
                WHERE title = (?)`
            db.connection.query(this.SQL, [product_name_arr])
            .then(([rows,fields])=>{
                
                let selected_products = [];

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                        
                        const selected_product = new Product;

                        selected_product.product_code = row.product_code;
                        selected_product.min_qty = row.min_qty;
                        selected_product.max_qty = row.max_qty;
                        selected_product.selling_price = row.selling_price;
                        selected_product.cost_price = row.cost_price;
                        selected_product.current_quantity = row.current_quantity;
                        selected_product.title = row.title;
                        selected_product.description = row.description;
                        selected_product.image_path = row.image_path;
                        selected_product.category = row.category;
                        selected_product.is_best_seller = row.is_best_seller;
                        selected_product.date_created = row.date_created;
                        selected_product.last_modified = row.last_modified;

                        selected_products.push(selected_product)
                    });  
                }

                else
                {
                    selected_products = null;
                }

                selected_products.forEach(product => {
                        
                    console.log("SELECTED PRODUCT ARRAY -",product.product_code,"-",product.product_name);
                });

                resolve(selected_products);
            })
            .catch((err)=>{

                reject(`Error in Product_mdl.js: get_products_by_names(): ${err}`);
            });
        })
    },
}

module.exports = Product_model;