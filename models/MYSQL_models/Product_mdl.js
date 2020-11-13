const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO_pool.js");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");

const Product_model =
{
    create_product(product)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `INSERT INTO product (min,max,selling_price,cost_price,quantity,title,
                description,image_path,category) VALUES (?,?,?,?,?,?,?,?,?);`;
            db.connection.query(this.SQL, [product.min,product.max,product.selling_price,product.cost_price,product.quantity,product.title,
                product.description,product.image_path,product.category])
            .then((input_data)=>{
                
                resolve(input_data);
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: create_user(): ${err}`);
            });
        })
    },
}

module.exports = Product_model;