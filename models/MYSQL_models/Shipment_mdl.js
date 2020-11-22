const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO_pool.js");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");
const Category = require("../POJO/Category.js");
const Order = require("../POJO/Order.js");
const Shipment = require("../POJO/Shipment.js");

const Shipment_model =
{
    create_shipment(employee_id)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `INSERT INTO shipment (inventory_clerk_id_fk) VALUES (?);`;
            db.connection.query(this.SQL, employee_id)
            .then((data)=>{
                
                console.trace("CREATE SHIPMENT DATA",data);
                resolve(data);
            })
            .catch((err)=>{

                reject(`Error in Shipment_mdl.js: create_shipment(): ${err}`);
            });
        })
    },

    get_last_id()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `SELECT FROM shipment (inventory_clerk_id_fk) VALUES (?);`;
            db.connection.query(this.SQL, employee_id)
            .then((id)=>{
                
                resolve(id);
            })
            .catch((err)=>{

                reject(`Error in Shipment_mdl.js: get_last_id(): ${err}`);
            });
        })
    },
    /*get_shipment_details(employee_id)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `INSERT INTO shipment (inventory_clerk_id_fk) VALUES (?);`;
            db.connection.query(this.SQL, employee_id)
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in Shipment_mdl.js: create_shipment(): ${err}`);
            });
        })
    },*/
};

module.exports = Shipment_model;