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
        create_cart_storage(customer_id_fk)
        {
            return new Promise((resolve,reject)=>{

                this.SQL = `INSERT INTO user_product (customer_id_fk, product_code_fk, order_quantity) VALUES (?,?,?);
                SELECT *, p.date_created AS product_date_created, p.last_modified AS product_last_modified
                FROM user_product up 
                INNER JOIN product p ON p.product_code = up.product_code_fk
                WHERE up.customer_id_fk = ? AND p.product_code = ?;`;
                db.connection.query(this.SQL, [customer_id_fk, product_code_fk, order_quantity, customer_id_fk, product_code_fk])
                .then(()=>{
                    
                    resolve();
                })
                .catch((err)=>{

                    reject(`Error in User_Product_mdl.js: create_cart_storage(): ${err}`);
                }); 
            });
        };
    },

};

module.exports = Order_model;