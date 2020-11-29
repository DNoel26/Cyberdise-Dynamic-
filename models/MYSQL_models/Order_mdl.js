const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO_pool.js");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");
const Category = require("../POJO/Category.js");
const Order = require("../POJO/Order.js");

const Order_model =
{
    create_order(customer_id_fk)
    {
        return new Promise((resolve,reject)=>{

            const NOW = mysql.raw('NOW()');
            const order_date = NOW;

            this.SQL = 'START TRANSACTION; INSERT INTO `order` (order_date,customer_id_fk) VALUES (?,?);';
            db.connection.query(this.SQL, [order_date, customer_id_fk])
            .then(()=>{
                
                /*let order;

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                        
                        const created_order = new Order;
                        const session_customer = new Customer;

                        created_order.customer = session_customer;

                        created_order.order_id = row.order_id;
                        created_order.order_date = row.order_date;
                        created_order.is_paid = row.is_paid;
                        created_order.is_completed = row.is_completed;
                        created_order.is_cancelled = row.is_cancelled;
                        created_order.total_cost = row.total_cost;
                        session_customer.customer_id_pk_fk = row.customer_id_fk;
                        created_order.date_created = row.date_created;
                        created_order.last_modified = row.last_modified;

                        order = created_order;
                    });     
                }*/

                resolve();
            })
            .catch((err)=>{

                reject(`Error in Order_mdl.js: create_order(): ${err}`);
            }); 
        });
    },

    update_order_status(total_cost, order_id)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = 'UPDATE `order` '
            this.SQL += 'SET is_paid = 1, is_completed = 1, total_cost = ? '    
            this.SQL += 'WHERE order_id = ?; '    
            db.connection.query(this.SQL, [total_cost, order_id])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in Order_Product_mdl.js: update_order_status(): ${err}`);
            });
        })
    },
};

module.exports = Order_model;