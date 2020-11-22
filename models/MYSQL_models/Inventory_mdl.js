const db = require("../../config/MySQL_DAO_pool.js");
const mysql = require("mysql2");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");
const Inventory = require("../POJO/Inventory.js");

const Inventory_model =
{
    product_restock(product_codes,last_shipment_id,suppliers,restock_quantities) //,order_date)
    {
        return new Promise((resolve,reject)=>{

            let inventory_arr = [];  
            const NOW = mysql.raw('NOW()');

            for(let i=0; i < product_codes.length; i++)
            {
                let inventory_arr_sub = [];
                inventory_arr_sub[0] = product_codes[i];
                inventory_arr_sub[1] = last_shipment_id;
                inventory_arr_sub[2] = suppliers[i];
                inventory_arr_sub[3] = restock_quantities[i];
                inventory_arr_sub[4] = NOW;

                //console.log("length",product.title.length);
                //console.log("i",i);
                inventory_arr[i] = inventory_arr_sub;
            };

            this.SQL = `INSERT INTO inventory (product_code_fk,shipment_id_fk,supplier,
                restock_quantity,restock_order_date) VALUES ?;`;
            db.connection.query(this.SQL, [inventory_arr])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in Inventory_mdl.js: product_restock(): ${err}`);
            });
        });
    },
}

module.exports = Inventory_model;