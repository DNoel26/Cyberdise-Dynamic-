const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO.js");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");

const User_model = {

    SQL: '',
    SQL_2: '',

    create_user_test(user,curr_time)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = 'START TRANSACTION; INSERT INTO user (first_name,last_name,gender,country,username,email,password) VALUES (?,?,?,?,?,?,?); ';
            db.connection.query(this.SQL, [user.first_name,user.last_name,user.gender,user.country,
                                            user.username,user.email,user.password])
            .then((input_data)=>{

                /*User_model.mysql_current_timestamp();
                console.log(`CURRENT TIMESTAMP ${User_model.mysql_current_timestamp()}`);
                console.log(User_model.mysql_current_timestamp());

                User_model.mysql_last_insert_id();
                console.log(`LAST INSERT ID ${User_model.mysql_last_insert_id()}`);
                console.log(User_model.mysql_last_insert_id());*/

                resolve(input_data);
            })
            .catch(err=>reject(`Error in User_mdl.js: create_user(): ${err}`));
        })
    },

    /*customer_signup(user,ID,c_address)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `START TRANSACTION; INSERT INTO user(first_name,last_name,gender,country,email,password) VALUES (?,?,?,?,?,?);
            INSERT INTO customer(customer_id_fk,address) VALUES (?,?); COMMIT;`;

            db.connection.query(this.SQL, [user.first_name,user.last_name,user.gender,user.country,
                user.email,user.password,ID,c_address])
            db.connection.query('START TRANSACTION')
            .then(()=>{

                this.SQL = 'INSERT INTO user(first_name,last_name,gender,country,email,password) VALUES (?,?,?,?,?,?)';
                db.connection.query(this.SQL, [user.first_name,user.last_name,user.gender,user.country,
                                                            user.email,user.password]);    

                this.SQL_2 = 'INSERT INTO customer(customer_id_fk,address) VALUES (?,?)';
                db.connection.query(this.SQL_2, [10,c_address]);
            })
            
            
            console.log(this.SQL)
            console.log(this.SQL_2)
            
            db.connection.query('commit')
            .then(()=>{

                console.log("Before resolve");
                console.log(resolve());
            })
            .catch(err=>reject(`Error in User_mdl.js: user_signup(): ${err}`))
            .then(()=> {

                this.SQL = 'ROLLBACK;';
                db.connection.query(this.SQL);
            })
        })
    },*/

    create_trigger_test()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = ('DROP TRIGGER IF EXISTS on_customer_signup; CREATE TRIGGER on_customer_signup AFTER INSERT ON user FOR EACH ROW INSERT INTO customer (customer_id_fk, address) VALUES(NEW.user_id,?);');//LAST_INSERT_ID() NEW.user_id
            db.connection.query(this.SQL, ["A PLACE TRIGGERED"])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: create_trigger_tester(): ${err}`);
            }); 
        })
    },

    drop_trigger_test()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = ('DROP TRIGGER IF EXISTS on_customer_signup;');
            db.connection.query(this.SQL)
            .then(()=>{

                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: drop_trigger_tester(): ${err}`);
            })
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
            .catch(err=>reject(`Error in User_mdl.js: mysql_current_timestamp(): ${err}`));  
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
            .catch(err=>reject(`Error in User_mdl.js: mysql_last_insert_id(): ${err}`));  
        })
    },

    mysql_commit()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = 'COMMIT;';
            db.connection.query(this.SQL)
            .then(()=>{

                resolve();
            })
            .catch(err=>reject(`Error in User_mdl.js: mysql_commit(): ${err}`));  
        })
    },

    mysql_rollback()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = 'ROLLBACK;';
            db.connection.query(this.SQL)
            .then(()=>{

                resolve();
            })
            .catch(err=>reject(`Error in User_mdl.js: mysql_resolve(): ${err}`));  
        })
    },

    create_user(user)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = 'START TRANSACTION; INSERT INTO user (first_name,last_name,gender,country,username,email,password) VALUES (?,?,?,?,?,?,?);';
            db.connection.query(this.SQL, [user.first_name,user.last_name,user.gender,user.country,
                                            user.username,user.email,user.password])
            .then((input_data)=>{
                
                //LAST_INSERT_ID();
                resolve(input_data);
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: create_user(): ${err}`);
            });
        })
    },
    
    get_customer_by_username_email(customer_email,customer_username)//customer_email,customer_username)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = 'SELECT * FROM customer INNER JOIN user ON customer.customer_id_fk = user.user_id WHERE email = ? OR username = ?;';
            db.connection.query(this.SQL, [customer_email,customer_username])//customer_email,customer_username])
            .then(([rows,fields])=>{

                let selected_customer = null;

                if(rows.length > 0)
                {
                    selected_customer = new Customer;
                    
                    selected_customer.user_id = rows[0].user_id;
                    selected_customer.first_name = rows[0].first_name;
                    selected_customer.last_name = rows[0].last_name;
                    selected_customer.full_name = rows[0].full_name;
                    selected_customer.gender = rows[0].gender;
                    selected_customer.country = rows[0].country;
                    selected_customer.username = rows[0].username;
                    selected_customer.email = rows[0].email;
                    selected_customer.password = rows[0].password;
                    selected_customer.logged_in = rows[0].logged_in;
                    selected_customer.last_login_date = rows[0].last_login_date;
                    selected_customer.last_login_IP = rows[0].last_login_IP;
                    selected_customer.customer_id_fk = rows[0].customer_id_fk;
                    selected_customer.address = rows[0].address;
                    selected_customer.town_city = rows[0].town_city;
                    selected_customer.state = rows[0].state;
                    selected_customer.credit_card_num = rows[0].credit_card_num;
                    selected_customer.role = rows[0].role;
                    selected_customer.date_created = rows[0].date_created;
                    selected_customer.last_modified = rows[0].last_modified;

                    //console.log("The data for login customer",selected_customer,"The fields for login customer",fields);
                    
                    resolve(selected_customer);
                }

                else
                {
                    selected_customer = null;
                    resolve(selected_customer);
                }
                
            })
            .catch(err=>reject(`Error in User_mdl.js: user_login(): ${err}`));
        })
    }
}

module.exports = User_model;