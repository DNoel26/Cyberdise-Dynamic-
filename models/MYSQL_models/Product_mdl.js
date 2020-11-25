const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO_pool.js");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");
const Product = require("../POJO/Product.js");
const Category = require("../POJO/Category.js");
const { response } = require("express");

const Product_model =
{ 
    create_products(products,categories)
    {
        return new Promise((resolve,reject)=>{
            
            let product_arr = [];
            
            for(let i=0; i < products.title.length; i++)
            {
                let product_arr_sub = [];
                product_arr_sub[0] = products.min_qty[i];
                product_arr_sub[1] = products.max_qty[i];
                product_arr_sub[2] = products.selling_price[i];
                product_arr_sub[3] = products.cost_price[i];
                product_arr_sub[4] = products.current_quantity[i];
                product_arr_sub[5] = products.title[i];
                product_arr_sub[6] = products.description[i];
                product_arr_sub[7] = products.image_path[i];
                product_arr_sub[8] = categories[i].category_id;
                product_arr_sub[9] = products.is_best_seller[i];

                //console.log("length",product.title.length);
                //console.log("i",i);
                product_arr[i] = product_arr_sub;
            }

            //console.log(product_arr);
            //product_arr = [product]

            this.SQL = `INSERT IGNORE INTO product (min,max,selling_price,cost_price,quantity,title,
                description,image_path,category_id_fk,is_best_seller) VALUES ?;`;
            db.connection.query(this.SQL, [product_arr])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in Product_mdl.js: create_products(): ${err}`);
            });
        })
    },

    get_all_products()
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `SELECT *, p.date_created AS product_date_created, c.date_created AS category_date_created,
                p.last_modified AS product_last_modified, c.last_modified AS category_last_modified,
                p.title AS product_title, c.title AS category_title,
                p.description AS product_description, c.description AS category_description,
                p.image_path AS product_image_path, c.image_path AS category_image_path
                FROM product p 
                INNER JOIN category c ON p.category_id_fk = c.category_id;`;
            db.connection.query(this.SQL)
            .then(([rows,fields])=>{
                
                const products = [];

                rows.forEach(row => {
                    
                    const product = new Product;
                    const category_on_join = new Category;
                    product.category = category_on_join;

                    product.product_code = row.product_code;
                    product.min_qty = row.min;
                    product.max_qty = row.max;
                    product.selling_price = row.selling_price;
                    product.cost_price = row.cost_price;
                    product.current_quantity = row.quantity;
                    product.title = row.product_title;
                    product.description = row.product_description;
                    product.image_path = row.product_image_path;
                    category_on_join.category_id = row.category_id;
                    category_on_join.title = row.category_title;
                    category_on_join.description = row.category_description;
                    category_on_join.image_path = row.category_image_path;
                    category_on_join.date_created = row.category_date_created;
                    category_on_join.last_modified = row.category_last_modified;
                    product.is_best_seller = row.is_best_seller;
                    product.date_created = row.product_date_created;
                    product.last_modified = row.product_last_modified;

                    products.push(product);
                });

                resolve(products);
            })
            .catch((err)=>{

                reject(`Error in Product_mdl.js: get_all_products(): ${err}`);
            });
        })
    },

    get_products_by_names_check(product_name_arr)
    {
        return new Promise((resolve,reject)=>{
            
            const product_names = product_name_arr.map(item => `"${item}"`).join();
            
            console.log(product_name_arr,"Product names joined",product_names);

            this.SQL = `SELECT * FROM product 
                WHERE title IN (?);`;
            db.connection.query(this.SQL, [product_name_arr])
            .then(([rows,fields])=>{
                
                //console.log("PRODUCT ROWS",rows);
                let selected_products = [];

                if(rows.length > 0)
                {
                    rows.forEach(row => {

                        const selected_product = new Product;
                        const category_on_join = new Category;
                        selected_product.category = category_on_join;

                        selected_product.product_code = row.product_code;
                        selected_product.min_qty = row.min;
                        selected_product.max_qty = row.max;
                        selected_product.selling_price = row.selling_price;
                        selected_product.cost_price = row.cost_price;
                        selected_product.current_quantity = row.quantity;
                        selected_product.title = row.title;
                        selected_product.description = row.description;
                        selected_product.image_path = row.image_path;
                        category_on_join.category_id = row.category_id_fk;
                        selected_product.is_best_seller = row.is_best_seller;
                        selected_product.date_created = row.date_created;
                        selected_product.last_modified = row.last_modified;

                        //console.log("FOR EACH SELECTED PRODUCT!!!",selected_product);
                        selected_products.push(selected_product);
                    });  
                }

                else
                {
                    selected_products = null;
                };

                if(selected_products != null)
                {
                    selected_products.forEach(product => {
                        
                        console.log("SELECTED PRODUCT ARRAY -",product.product_code,"-",product.product_name);
                    });
                }; 

                resolve(selected_products);
            })
            .catch((err)=>{

                reject(`Error in Product_mdl.js: get_products_by_names_check(): ${err} ${err.stack}`,console.trace(err));
            });
        })
    },

    get_product_by_name_code(product_name,product_code)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `SELECT *, p.date_created AS product_date_created, c.date_created AS category_date_created,
            p.last_modified AS product_last_modified, c.last_modified AS category_last_modified,
            p.title AS product_title, c.title AS category_title,
            p.description AS product_description, c.description AS category_description,
            p.image_path AS product_image_path, c.image_path AS category_image_path
            FROM product p 
            INNER JOIN category c ON p.category_id_fk = c.category_id
            WHERE p.title = ? OR p.product_code = ?`;
            db.connection.query(this.SQL, [product_name,product_code])
            .then(([rows,fields])=>{
                
                let selected_products = [];

                if(rows.length > 0)
                {
                    rows.forEach(row => {

                        const selected_product = new Product;
                        const category_on_join = new Category;
                        selected_product.category = category_on_join;

                        selected_product.product_code = row.product_code;
                        selected_product.min_qty = row.min;
                        selected_product.max_qty = row.max;
                        selected_product.selling_price = row.selling_price;
                        selected_product.cost_price = row.cost_price;
                        selected_product.current_quantity = row.quantity;
                        selected_product.title = row.product_title;
                        selected_product.description = row.product_description;
                        selected_product.image_path = row.product_image_path;
                        category_on_join.category_id = row.category_id;
                        category_on_join.title = row.category_title;
                        category_on_join.description = row.category_description;
                        category_on_join.image_path = row.category_image_path;
                        category_on_join.date_created = row.category_date_created;
                        category_on_join.last_modified = row.category_last_modified;
                        selected_product.is_best_seller = row.is_best_seller;
                        selected_product.date_created = row.product_date_created;
                        selected_product.last_modified = row.product_last_modified;

                        selected_products.push(selected_product);
                    });  
                }

                else
                {
                    selected_products = null;
                }

                if(selected_products != null)
                {
                    selected_products.forEach(product => {
                        
                        console.log("SELECTED PRODUCT ARRAY -",product.product_code,"-",product.product_name);
                    });
                }; 

                if(selected_products.length == 1)
                {
                    selected_products = selected_products[0];
                };

                resolve(selected_products);
            })
            .catch((err)=>{

                reject(`Error in Product_mdl.js: get_products_by_names_code(): ${err}`);
            });
        })
    },

    increase_quantity(add_quantities,product_codes)
    {
        return new Promise((resolve,reject)=>{

            const product_arr = [];
            let queries = "";
                
            for(let i=0; i < product_codes.length; i++)
            {
                const product_arr_sub = [];
                product_arr_sub[0] = add_quantities[i];
                product_arr_sub[1] = product_codes[i];

                product_arr[i] = product_arr_sub;

                queries += mysql.format(`UPDATE product
                                SET quantity = (quantity + ?)
                                WHERE product_code = ?; `, product_arr[i]);
            };

            this.SQL = queries;
            db.connection.query(this.SQL)
            .then(()=>{
                
                console.log(`Resolved`);
                resolve();
            })
            .catch((err)=>{
                
                reject(`Error in Product_mdl.js: increase_quantity(): ${err}`);
            });
        });
    },

    edit_update_product(min,max,selling_price,cost_price,quantity,
        title,description,image_path,is_best_seller,category_title,product_code)
    {
        return new Promise((resolve,reject)=>{

            console.log("DB INPUT LOGGER - 1",min,"2",max,"3",selling_price,"4",cost_price,"5",quantity,"6",
            title,"7",description,"8",image_path,"9",is_best_seller,"10",category_title,"11",product_code);

            this.SQL = `UPDATE product p
                INNER JOIN category c ON p.category_id_fk = c.category_id
                SET min = ?, max = ?, selling_price = ?, cost_price = ?, quantity = ?,
                p.title = ?, p.description = ?, p.image_path = ?, is_best_seller = ?,
                category_id_fk = (SELECT category_id FROM category WHERE title = ?)
                WHERE product_code = ?;`;
            db.connection.query(this.SQL, [min,max,selling_price,cost_price,quantity,
                title,description,image_path,is_best_seller,category_title,product_code])
            .then(()=>{
                
                console.log(`PRODUCT UPDATED IN Product_mdl - TO BE RESOLVED`);
                resolve();
            })
            .catch((err)=>{
                
                reject(`Error in Product_mdl.js: edit_update_product(): ${err}`);
            });
        });
    },
}

module.exports = Product_model;