const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO_pool.js");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");
const Category = require("../POJO/Category.js");
const Order = require("../POJO/Order.js");

const Order_model =
{
    create_orders(orders)
    {
        return new Promise((resolve,reject)=>{
            
            let order_arr = [];
            
            for(let i=0; i < orders.title.length; i++)
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
                product_arr_sub[8] = category[i].category_id;
                product_arr_sub[9] = product.is_best_seller[i];

                //console.log("length",product.title.length);
                //console.log("i",i);
                product_arr[i] = product_arr_sub;
            }

            //console.log(product_arr);
            //product_arr = [product]

            this.SQL = `INSERT IGNORE INTO product (min,max,selling_price,cost_price,quantity,title,
                description,image_path,category_id_fk,is_best_seller) VALUES ?;`;
            db.connection.query(this.SQL, [product_arr])
            .then((input_data)=>{
                
                resolve(input_data);
            })
            .catch((err)=>{

                reject(`Error in Project_mdl.js: create_order(): ${err}`);
            });
        })
    },

};

module.exports = Order_model;