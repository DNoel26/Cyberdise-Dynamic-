const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO_pool.js");
const Customer = require("../POJO/Customer.js");
const Order = require("../POJO/Order.js");
const Order_Product = require("../POJO/Order_Product.js");
const Product = require("../POJO/Product.js");

const Order_Product_model =
{
    create_transaction(product_code_fk, order_quantity)
    {
        return new Promise((resolve,reject)=>{

            const LAST_INSERT_ID = mysql.raw('LAST_INSERT_ID()');
            const order_id_fk = LAST_INSERT_ID;

            let transaction_arr = [];
            let order_arr = [];
            let product_arr = [];
            
            for(let i=0; i < product_code_fk.length; i++)
            {
                let transaction_arr_sub = [];
                transaction_arr_sub[0] = order_id_fk;
                transaction_arr_sub[1] = product_code_fk[i];
                transaction_arr_sub[2] = order_quantity[i];

                //console.log("length",product.title.length);
                //console.log("i",i);
                transaction_arr[i] = transaction_arr_sub;
            };

            for(let i=0; i < product_code_fk.length; i++)
            {
                let order_arr_sub = [];
                order_arr_sub[0] = order_id_fk;

                order_arr[i] = order_arr_sub;
            };

            for(let i=0; i < product_code_fk.length; i++)
            {
                product_arr[i] = product_code_fk[i];
            };

            console.log("CREATE TRANSACTION ARRAYS", transaction_arr[0], order_id_fk, product_arr[0],
                transaction_arr[1],product_arr[1]);
            
            this.SQL = 'INSERT INTO order_product (order_id_fk, product_code_fk, order_quantity) VALUES ?; '
            this.SQL += 'SELECT *, p.date_created AS product_date_created, p.last_modified AS product_last_modified, '
            this.SQL += 'o.date_created AS order_date_created, o.last_modified AS order_last_modified, '
            this.SQL += 'op.date_created AS transaction_date_created, op.last_modified AS transaction_last_modified '
            this.SQL += 'FROM order_product op '
            this.SQL += 'INNER JOIN product p ON p.product_code = op.product_code_fk '
            this.SQL += 'INNER JOIN `order` o ON o.order_id = op.order_id_fk '
            this.SQL += 'WHERE op.order_id_fk = ? AND p.product_code IN (?);' //WHERE IN SET PRODUCT CODES WHERE I op.order_id_fk  = ? AND p.product_code = ?;
            db.connection.query(this.SQL, [transaction_arr, order_id_fk, product_arr]) //[order_id_fk, product_code_fk, order_quantity, order_id_fk, product_code_fk])
            .then(([rows,fields])=>{
                
                let purchase_order;

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                        
                        const queried_order = new Order;
                        const queried_product = new Product;
                        const queried_customer = new Customer;
                        const transaction = new Order_Product;

                        transaction.order = queried_order;
                        transaction.product = queried_product;

                        queried_order.order_id = row.order_id_fk;
                        queried_product.product_code = row.product_code_fk;
                        transaction.order_quantity = row.order_quantity;
                        transaction.is_processing = row.is_processing;
                        transaction.is_shipped = row.is_shipped;
                        transaction.is_delivered = row.is_delivered;
                        transaction.product_date_shipped = row.product_date_shipped;
                        transaction.product_date_delivered = row.product_date_delivered;
                        transaction.date_created = row.date_created;
                        transaction.last_modified = row.last_modified;

                        purchase_order = transaction;
                    });     
                }

                resolve(purchase_order);
            })
            .catch((err)=>{

                reject(`Error in Order_Project_mdl.js: create_transaction(): ${err}`);
            }); 
        });
    },

    get_all_order_products(order_id)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = 'SELECT *, p.date_created AS product_date_created, p.last_modified AS product_last_modified, '
            this.SQL += 'p.title AS product_title, p.description AS product_description, p.image_path AS product_image_path, '
            this.SQL += 'c.date_created AS customer_date_created, c.last_modified AS customer_last_modified, '
            this.SQL += 'o.date_created AS order_date_created, o.last_modified AS order_last_modified '
            this.SQL += 'FROM order_product op '
            this.SQL += 'INNER JOIN `order` o ON o.order_id = op.order_id_fk '
            this.SQL += 'INNER JOIN customer c ON c.customer_id_pk_fk = o.customer_id_fk '
            this.SQL += 'INNER JOIN product p ON p.product_code = op.product_code_fk '
            this.SQL += 'WHERE o.order_id = ? AND op.is_processing = 1;'
            db.connection.query(this.SQL, [order_id])
            .then(([rows,fields])=>{
                
                let purchase_orders = [];

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                    
                        const queried_order = new Order;
                        const queried_product = new Product;
                        const queried_customer = new Customer;
                        const transaction = new Order_Product;

                        transaction.order = queried_order;
                        transaction.product = queried_product;

                        queried_order.order_id = row.order_id_fk;
                        queried_product.product_code = row.product_code_fk;
                        transaction.order_quantity = row.order_quantity;
                        transaction.is_processing = row.is_processing;
                        transaction.is_shipped = row.is_shipped;
                        transaction.is_delivered = row.is_delivered;
                        transaction.product_date_shipped = row.product_date_shipped;
                        transaction.product_date_delivered = row.product_date_delivered;
                        transaction.date_created = row.date_created;
                        transaction.last_modified = row.last_modified;

                        queried_order.order_date = row.order_date;
                        queried_order.is_paid = row.is_paid;
                        queried_order.is_completed = row.is_completed;
                        queried_order.is_cancelled = row.is_cancelled;
                        queried_order.total_cost = row.total_cost;
                        queried_order.date_created = row.order_date_created;
                        queried_order.last_modified = row.order_last_modified;

                        queried_product.min_qty = row.min;
                        queried_product.max_qty = row.max;
                        queried_product.selling_price = row.selling_price;
                        queried_product.current_quantity = row.quantity;
                        queried_product.title = row.title;
                        queried_product.description = row.description;
                        queried_product.image_path = row.image_path;
                        queried_product.is_best_seller = row.is_best_seller;
    
                        purchase_orders.push(transaction);
                    });
                }

                else
                {
                    purchase_orders = null;
                };

                resolve(purchase_orders);
            })
            .catch((err)=>{

                reject(`Error in Order_Product_mdl.js: get_all_order_products(): ${err}`);
            });
        })
    },

    update_all_order_products(order_id_fk, product_code_fk)
    {
        return new Promise((resolve,reject)=>{
            
            /*let transaction_arr = [];
            
            for(let i=0; i < order_id_fk.length; i++)
            {
                let transaction_arr_sub = [];
                transaction_arr_sub[0] = order_id_fk[i];
                transaction_arr_sub[1] = product_code_fk[i];

                transaction_arr[i] = transaction_arr_sub;
            };*/

            this.SQL = `UPDATE order_product
                SET is_processing = 0
                WHERE order_id_fk = ? AND product_code_fk IN (?);`
                /*UPDATE order
                SET is_paid = 1, is_completed = 1
                WHERE order_id = ?;*/
            db.connection.query(this.SQL, [order_id_fk, product_code_fk])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in Order_Product_mdl.js: update_all_order_products(): ${err}`);
            });
        })
    },
};

module.exports = Order_Product_model;