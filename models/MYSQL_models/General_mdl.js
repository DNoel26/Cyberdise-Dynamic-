const db = require("../../config/MySQL_DAO_pool.js");

const General_model = 
{ 
    mysql_transaction()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = 'START TRANSACTION;';
            db.connection.query(this.SQL)
            .then(()=>{

                resolve();
            })
            .catch(err=>reject(`Error in General_mdl.js: mysql_transaction(): ${err}`));  
        })   
    },
    
    mysql_commit()
    {
        return new Promise((resolve,reject)=>{

            console.log("Transaction committed");
            this.SQL = 'COMMIT;';
            db.connection.query(this.SQL)
            .then(()=>{

                resolve();
            })
            .catch(err=>reject(`Error in General_mdl.js: mysql_commit(): ${err}`));  
        })
    },

    mysql_rollback()
    {
        return new Promise((resolve,reject)=>{

            console.log("Transaction rolled back");
            this.SQL = 'ROLLBACK;';
            db.connection.query(this.SQL)
            .then(()=>{

                resolve();
            })
            .catch(err=>reject(`Error in General_mdl.js: mysql_rollback(): ${err}`));  
        })
    },

    mysql_last_insert_id()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = 'SELECT LAST_INSERT_ID();';
            db.connection.query(this.SQL)
            .then((last_ins_id)=>{

                resolve(last_ins_id);
            })
            .catch(err=>reject(`Error in General_mdl.js: mysql_last_insert_id(): ${err}`));  
        })
    },

    mysql_current_timestamp()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = 'SELECT CURRENT_TIMESTAMP();';
            db.connection.query(this.SQL)
            .then((curr_time)=>{

                resolve(curr_time);
            })
            .catch(err=>reject(`Error in General_mdl.js: mysql_current_timestamp(): ${err}`));  
        })
    },
}

module.exports = General_model;