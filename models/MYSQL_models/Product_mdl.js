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
            
            this.SQL = `INSERT IGNORE INTO product (min,max,selling_price,cost_price,quantity,title,
                description,image_path,category,is_best_seller) VALUES (?,?,?,?,?,?,?,?,?,?);`;
            db.connection.query(this.SQL, [product.min_qty,product.max_qty,product.selling_price,product.cost_price,product.current_quantity,product.title,
                product.description,product.image_path,product.category.title,product.is_best_seller])
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

    get_product_by_code(product_code)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `SELECT * FROM product 
                WHERE product_code = ?`
            db.connection.query(this.SQL, [product_code])
            .then(([rows,fields])=>{
                
                let selected_product = null;

                if(rows.length > 0)
                {
                    selected_product = new Product;

                    selected_product.product_code = rows[0].product_code;
                    selected_product.min_qty = rows[0].min_qty;
                    selected_product.max_qty = rows[0].max_qty;
                    selected_product.selling_price = rows[0].selling_price;
                    selected_product.cost_price = rows[0].cost_price;
                    selected_product.current_quantity = rows[0].current_quantity;
                    selected_product.title = rows[0].title;
                    selected_product.description = rows[0].description;
                    selected_product.image_path = rows[0].image_path;
                    selected_product.category = rows[0].category;
                    selected_product.is_best_seller = rows[0].is_best_seller;
                    selected_product.date_created = rows[0].date_created;
                    selected_product.last_modified = rows[0].last_modified;
                }

                resolve(selected_product);
            })
            .catch((err)=>{

                reject(`Error in Product_mdl.js: get_product_by_code(): ${err}`);
            });
        })
    },
}

module.exports = Product_model;