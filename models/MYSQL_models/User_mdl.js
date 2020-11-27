const db = require("../../config/MySQL_DAO_pool.js");
const mysql = require("mysql2");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");

const User_model = 
{
    SQL: '',

    create_trigger_test()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = ('DROP TRIGGER IF EXISTS on_customer_signup; CREATE TRIGGER on_customer_signup AFTER INSERT ON user FOR EACH ROW INSERT INTO customer (customer_id_pk_fk, address) VALUES(NEW.user_id,?);');//LAST_INSERT_ID() NEW.user_id
            db.connection.query(this.SQL, ["A PLACE TRIGGERED"])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: create_trigger_tester(): ${err}`);
            }); 
        });
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

    create_user(user)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = 'START TRANSACTION; INSERT INTO user (first_name,last_name,gender,country,country_flag_src,username,email,password) VALUES (?,?,?,?,?,?,?,?);';
            db.connection.query(this.SQL, [user.first_name,user.last_name,user.gender,user.country,user.country_flag_src,
                user.username,user.email,user.password])
            .then(()=>{
                
                //LAST_INSERT_ID();
                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: create_user(): ${err}`);
            });
        })
    },

    create_customer_on_user_creation()
    {
        return new Promise((resolve,reject)=>{
            
            const last_ins_id = mysql.raw('LAST_INSERT_ID()');

            this.SQL = 'INSERT INTO customer (customer_id_pk_fk, address_line_1, address_line_2) VALUES(?,?,?);';
            db.connection.query(this.SQL, [last_ins_id,"---","---"])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: create_user(): ${err}`);
            });
        })
    },
    
    get_user_by_username_email(user_email,user_username)//customer_email,customer_username)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = 
            `SELECT *, c.role AS customer_role, ic.role AS inventory_clerk_role, 
            c.date_created AS customer_date_created, c.last_modified AS customer_last_modified,
            ic.date_created AS inventory_clerk_date_created, ic.last_modified AS inventory_clerk_last_modified
            FROM user u
            LEFT JOIN customer c ON u.user_id = c.customer_id_pk_fk LEFT JOIN inventory_clerk ic ON u.user_id = ic.inventory_clerk_id_pk_fk
            WHERE email = ? OR username = ?;`;
            
            db.connection.query(this.SQL, [user_email,user_username]) //customer_email,customer_username])
            .then(([rows,fields])=>{

                let selected_users = [];
                //console.log("SELECTED ROWS IN QUERY",rows)

                if(rows.length > 0)
                {
                    rows.forEach((row,index) => {
                        
                        if(row.customer_role === "customer")
                        {
                            const selected_user = new Customer;
                        
                            selected_user.user_id = row.user_id;
                            selected_user.first_name = row.first_name;
                            selected_user.last_name = row.last_name;
                            selected_user.gender = row.gender;
                            selected_user.country = row.country;
                            selected_user.country_flag_src = row.country_flag_src;
                            selected_user.username = row.username;
                            selected_user.email = row.email;
                            selected_user.password = row.password;
                            selected_user.phone_num = row.phone_num;
                            selected_user.logged_in = row.logged_in;
                            selected_user.last_login_date = row.last_login_date;
                            selected_user.last_login_IP = row.last_login_IP;
                            //customer specific
                            selected_user.customer_id_pk_fk = row.customer_id_pk_fk;
                            selected_user.address_line_1 = row.address_line_1;
                            selected_user.address_line_2 = row.address_line_2;
                            selected_user.town_city = row.town_city;
                            selected_user.state = row.state;
                            selected_user.credit_card_num = row.credit_card_num;
                            selected_user.role = row.customer_role;
                            selected_user.date_created = row.customer_date_created;
                            selected_user.last_modified = row.customer_last_modified;

                            selected_users.push(selected_user);
                        }

                        else if(row.inventory_clerk_role === "employee")
                        {
                            const selected_user = new Employee;

                            selected_user.user_id = row.user_id;
                            selected_user.first_name = row.first_name;
                            selected_user.last_name = row.last_name;
                            selected_user.gender = row.gender;
                            selected_user.country = row.country;
                            selected_user.country_flag_src = row.country_flag_src;
                            selected_user.username = row.username;
                            selected_user.email = row.email;
                            selected_user.password = row.password;
                            selected_user.phone_num = row.phone_num;
                            selected_user.logged_in = row.logged_in;
                            selected_user.last_login_date = row.last_login_date;
                            selected_user.last_login_IP = row.last_login_IP;
                            //employee specific
                            selected_user.inventory_clerk_id_pk_fk = row.inventory_clerk_id_pk_fk;
                            selected_user.role = row.inventory_clerk_role;
                            selected_user.date_created = row.inventory_clerk_date_created;
                            selected_user.last_modified = row.inventory_clerk_last_modified;

                            selected_users.push(selected_user);
                        }    
                    });
                    
                    selected_users.forEach(user => {
                        
                        console.log("SELECTED USER ARRAY -",user.username,"-",user.email);
                    });

                    resolve(selected_users);
                    //console.log("The data for login customer",selected_customer,"The fields for login customer",fields);
                }

                else
                {
                    selected_users = null;
                    console.log("SELECTED USER ARRAY",selected_users)
                    resolve(selected_users);
                }
                //console.log("SELECTED USER QUERY RESULTS",selected_user)
            })
            .catch(err=>reject(`Error in User_mdl.js: user_login(): ${err}`));
        })
    },

    update_user_on_login(user)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = 
            `UPDATE user
            SET logged_in = ?, last_login_date = ?, last_login_IP = ?
            WHERE user_id = ?;`;
            db.connection.query(this.SQL, [user.logged_in, user.last_login_date, user.last_login_IP, user.user_id])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: update_user_on_login(): ${err}`);
            });
        })
    },

    update_user_on_logout(user)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = 
            `UPDATE user
            SET logged_in = ?
            WHERE user_id = ?;`;
            db.connection.query(this.SQL, [user.logged_in, user.user_id])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in User_mdl.js: update_user_on_logout(): ${err}`);
            });
        })
    },
}

module.exports = User_model;