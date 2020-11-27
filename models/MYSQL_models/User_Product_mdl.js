const db = require("../../config/MySQL_DAO_pool.js");
const mysql = require("mysql2");
const Customer = require("../POJO/Customer.js");
const User_Product = require("../POJO/User_Product.js");
const Product = require("../POJO/Product.js");
const Category = require("../POJO/Category.js");

const User_Product_model =
{
    create_cart_storage(customer_id_fk, product_code_fk, cart_quantity)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `INSERT INTO user_product (customer_id_fk, product_code_fk, cart_quantity) VALUES (?,?,?);
            SELECT *, p.date_created AS product_date_created, p.last_modified AS product_last_modified
            FROM user_product up 
            INNER JOIN product p ON p.product_code = up.product_code_fk
            WHERE up.customer_id_fk = ? AND p.product_code = ?;`;
            db.connection.query(this.SQL, [customer_id_fk, product_code_fk, cart_quantity, customer_id_fk, product_code_fk])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_Product_mdl.js: create_cart_storage(): ${err}`);
            }); 
        });
    },

    increase_quantity_in_cart(cart_quantity, customer_id_fk, product_code_fk)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `UPDATE user_product up
                INNER JOIN product p ON p.product_code = up.product_code_fk
                SET cart_quantity = (cart_quantity + ?)
                WHERE customer_id_fk = ? AND product_code_fk = ? AND (cart_quantity + ?) < p.quantity;`;      
            db.connection.query(this.SQL, [cart_quantity, customer_id_fk, product_code_fk, cart_quantity])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{
                
                reject(`Error in User_Product_mdl.js: increase_quantity_in_cart(): ${err}`);
            });
        });
    },

    decrease_quantity_in_cart(cart_quantity, customer_id_fk, product_code_fk)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `UPDATE user_product
                SET cart_quantity = (cart_quantity - ?)
                WHERE customer_id_fk = ? AND product_code_fk = ? AND (cart_quantity - ?) > 0;`;
            db.connection.query(this.SQL, [cart_quantity, customer_id_fk, product_code_fk, cart_quantity])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{
                
                reject(`Error in User_Product_mdl.js: decrease_quantity_in_cart(): ${err}`);
            });
        });
    },

    delete_cart_storage(customer_id_fk, product_code_fk)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `DELETE FROM user_product WHERE customer_id_fk = ? AND product_code_fk = ?;`;
            db.connection.query(this.SQL, [customer_id_fk, product_code_fk])
            .then(()=>{
                
                console.log("DELETE CART ITEM SUCCESSFUL")
                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_Product_mdl.js: delete_cart_storage(): ${err}`);
            }); 
        });
    },

    get_all_cart_products(customer_id_fk)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `SELECT *, p.date_created AS product_date_created, p.last_modified AS product_last_modified,
            p.title AS product_title, p.description AS product_description, p.image_path AS product_image_path,
            c.date_created AS customer_date_created, c.last_modified AS customer_last_modified,
            u.date_created AS user_date_created, u.last_modified AS user_last_modified,
            ca.date_created AS category_date_created, ca.last_modified AS category_last_modified,
            ca.title AS category_title, ca.description AS category_description, ca.image_path AS category_image_path
            FROM user_product up
            INNER JOIN customer c ON c.customer_id_pk_fk = up.customer_id_fk
            INNER JOIN product p ON p.product_code = up.product_code_fk
            INNER JOIN user u ON u.user_id = c.customer_id_pk_fk
            INNER JOIN category ca ON ca.category_id = p.category_id_fk
            WHERE c.customer_id_pk_fk = ?`;
            db.connection.query(this.SQL, [customer_id_fk])
            .then(([rows,fields])=>{
                
                let cart_items = [];

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                    
                        const cart_item = new User_Product;
    
                        const session_customer = new Customer;
                        const stored_product = new Product;
                        const stored_category = new Category;
    
                        cart_item.customer = session_customer;
                        cart_item.product = stored_product;
                        stored_product.category = stored_category;
    
                        session_customer.customer_id_pk_fk = row.customer_id_pk_fk;
                        session_customer.username = row.username;
                        session_customer.email = row.email;
                        session_customer.phone_num = row.phone_num;
                        session_customer.country = row.country;
                        session_customer.first_name = row.first_name;
                        session_customer.last_name = row.last_name;
                        session_customer.address_1 = row.address_line_1;
                        session_customer.address_2 = row.address_line_2;
                        session_customer.town_city = row.town_city;
                        session_customer.state = row.state;
                        session_customer.credit_card_num = row.credit_card_num;
                        session_customer.date_created = row.customer_date_created;
                        session_customer.last_modified = row.customer_last_modified;
    
                        stored_product.product_code = row.product_code;
                        stored_product.title = row.product_title;
                        stored_product.min_qty = row.min;
                        stored_product.max_qty = row.max;
                        stored_product.current_quantity = row.quantity;
                        stored_product.selling_price = row.selling_price;
                        stored_product.description = row.product_description;
                        stored_product.image_path = row.product_image_path;
                        stored_product.is_best_seller = row.is_best_seller;
                        stored_product.date_created = row.product_date_created;
                        stored_product.last_modified = row.product_last_modified;
    
                        stored_category.category_id = row.category_id;
                        stored_category.title = row.category_title;
                        stored_category.description = row.category_description;
                        stored_category.image_path = row.category_image_path;
                        stored_category.date_created = row.category_date_created;
                        stored_category.last_modified = row.category_last_modified;
    
                        cart_item.cart_quantity = row.cart_quantity;
                        cart_item.date_created = row.date_created;
                        cart_item.last_modified = row.last_modified;
    
                        cart_items.push(cart_item);
                    });
                }

                else
                {
                    cart_items = null;
                };

                resolve(cart_items);
            })
            .catch((err)=>{

                reject(`Error in User_Product_mdl.js: get_all_cart_products(): ${err}`);
            });
        })
    },

    check_cart_product(customer_id_fk, product_code_fk)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `SELECT *, p.date_created AS product_date_created, p.last_modified AS product_last_modified,
            p.title AS product_title, p.description AS product_description, p.image_path AS product_image_path,
            c.date_created AS customer_date_created, c.last_modified AS customer_last_modified,
            u.date_created AS user_date_created, u.last_modified AS user_last_modified,
            ca.date_created AS category_date_created, ca.last_modified AS category_last_modified,
            ca.title AS category_title, ca.description AS category_description, ca.image_path AS category_image_path
            FROM user_product up
            INNER JOIN customer c ON c.customer_id_pk_fk = up.customer_id_fk
            INNER JOIN product p ON p.product_code = up.product_code_fk
            INNER JOIN user u ON u.user_id = c.customer_id_pk_fk
            INNER JOIN category ca ON ca.category_id = p.category_id_fk
            WHERE customer_id_fk = ? AND product_code_fk = ?;`;
            db.connection.query(this.SQL, [customer_id_fk, product_code_fk])
            .then(([rows,fields])=>{
                
                let cart;

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                    
                        const cart_item = new User_Product;
    
                        const session_customer = new Customer;
                        const stored_product = new Product;
                        const stored_category = new Category;
                        
                        //Object.assign(cart_item.customer, session_customer);
                        //Object.assign(cart_item.product, stored_product);
                        //Object.assign(stored_product.category, stored_category);
                        cart_item.customer = session_customer;
                        cart_item.product = stored_product;
                        stored_product.category = stored_category;
    
                        session_customer.customer_id_pk_fk = row.customer_id_pk_fk;
                        session_customer.username = row.username;
                        session_customer.email = row.email;
                        session_customer.phone_num = row.phone_num;
                        session_customer.country = row.country;
                        session_customer.first_name = row.first_name;
                        session_customer.last_name = row.last_name;
                        session_customer.address_1 = row.address_line_1;
                        session_customer.address_2 = row.address_line_2;
                        session_customer.town_city = row.town_city;
                        session_customer.state = row.state;
                        session_customer.credit_card_num = row.credit_card_num;
                        session_customer.date_created = row.customer_date_created;
                        session_customer.last_modified = row.customer_last_modified;
    
                        stored_product.product_code = row.product_code;
                        stored_product.title = row.product_title;
                        stored_product.min_qty = row.min;
                        stored_product.max_qty = row.max;
                        stored_product.current_quantity = row.quantity;
                        stored_product.selling_price = row.selling_price;
                        stored_product.description = row.product_description;
                        stored_product.image_path = row.product_image_path;
                        stored_product.is_best_seller = row.is_best_seller;
                        stored_product.date_created = row.product_date_created;
                        stored_product.last_modified = row.product_last_modified;
    
                        stored_category.category_id = row.category_id;
                        stored_category.title = row.category_title;
                        stored_category.description = row.category_description;
                        stored_category.image_path = row.category_image_path;
                        stored_category.date_created = row.category_date_created;
                        stored_category.last_modified = row.category_last_modified; 
    
                        cart_item.cart_quantity = row.cart_quantity;
                        cart_item.date_created = row.date_created;
                        cart_item.last_modified = row.last_modified;
                        
                        console.log("CART IN ARRAY",cart_item);
                        console.log(session_customer,stored_product,stored_category);

                        cart = cart_item;
                    });
                }

                else
                {
                    cart = null;
                };

                if(cart)
                {
                    console.log("CART",cart,"CART PRODUCT",cart.product,"CART PRODUCT CATEGORY",cart.product.category);
                }

                else
                {
                    console.log("CART",cart);  
                }

                resolve(cart);
            })
            .catch((err)=>{

                reject(`Error in User_Product_mdl.js: check_cart_product(): ${err}`,console.trace(err));
            });
        });
    },

    check_cart_product_partial(customer_id_fk, product_code_fk)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `SELECT * FROM user_product
                WHERE customer_id_fk = ? AND product_code_fk = ?;`;
            db.connection.query(this.SQL, [customer_id_fk, product_code_fk])
            .then(([rows,fields])=>{
                
                let cart;

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                    
                        const cart_item = new User_Product;
    
                        const session_customer = new Customer;
                        const stored_product = new Product;
    
                        cart_item.customer = session_customer;
                        cart_item.product = stored_product;
    
                        session_customer.customer_id_pk_fk = row.customer_id_fk;

                        stored_product.product_code = row.product_code_fk;
    
                        cart_item.cart_quantity = row.cart_quantity;
                        cart_item.date_created = row.date_created;
                        cart_item.last_modified = row.last_modified;
    
                        cart = cart_item;
                    });  
                }

                else
                {
                    cart = null;
                };

                resolve(cart);
            })
            .catch((err)=>{

                reject(`Error in User_Product_mdl.js: check_cart_product_partial(): ${err}`);
            }); 
        });
    },
};

module.exports = User_Product_model;