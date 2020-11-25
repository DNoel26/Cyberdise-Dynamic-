const mysql = require("mysql2/promise");
const db = require("../../config/MySQL_DAO_pool.js");
const Customer = require("../POJO/Customer.js");
const Employee = require("../POJO/Employee.js");
const User = require("../POJO/User.js");
const Category = require("../POJO/Category.js");

const Category_model =
{ 
    create_categories(categories)
    {
        return new Promise((resolve,reject)=>{
            
            let category_arr = [];
            
            for(let i=0; i < categories.title.length; i++)
            {
                let category_arr_sub = [];
                category_arr_sub[0] = categories.title[i];
                category_arr_sub[1] = categories.description[i];
                category_arr_sub[2] = categories.image_path[i];

                //console.log("length",category.title.length);
                //console.log("i",i);
                category_arr[i] = category_arr_sub;
            }

            //console.log(category_arr);
            //category_arr = [category]

            this.SQL = `INSERT IGNORE INTO category (title,description,image_path) VALUES ?;`;
            db.connection.query(this.SQL, [category_arr])
            .then(()=>{
                
                resolve();
            })
            .catch((err)=>{

                reject(`Error in Category_mdl.js: create_categories(): ${err}`);
            });
        })
    },

    get_all_categories()
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `SELECT * FROM category`;
            db.connection.query(this.SQL)
            .then(([rows,fields])=>{
                
                const categories = [];

                rows.forEach(row => {
                    
                    const category = new Category;

                    category.category_id = row.category_id;
                    category.title = row.title;
                    category.description = row.description;
                    category.image_path = row.image_path;
                    category.date_created = row.date_created;
                    category.last_modified = row.last_modified;

                    categories.push(category);
                });

                resolve(categories);
            })
            .catch((err)=>{

                reject(`Error in Category_mdl.js: get_all_categories(): ${err}`);
            });
        })
    },

    get_categories_by_names_check(category_name_arr)
    {
        return new Promise((resolve,reject)=>{
            
            const category_names = /*"(" +*/ category_name_arr.map(item => `"${item}"`).join() /*+ ")"*/;
            
            console.log(category_name_arr,"Category names joined",category_names);

            this.SQL = `SELECT * FROM category 
                WHERE title IN (?);`;
            db.connection.query(this.SQL, [category_name_arr])
            .then(([rows,fields])=>{
                
                //console.log("CATEGORY ROWS",rows);
                let selected_categories = [];

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                        
                        const selected_category = new Category;

                        selected_category.category_id = row.category_id;
                        selected_category.title = row.title;
                        selected_category.description = row.description;
                        selected_category.image_path = row.image_path;
                        selected_category.date_created = row.date_created;
                        selected_category.last_modified = row.last_modified;

                        //console.log("FOR EACH SELECTED CATEGORY!!!",selected_category);
                        selected_categories.push(selected_category);
                    });
                }

                else
                {
                    selected_categories = null;
                };

                console.log("SELECTED CATEGORIES",selected_categories);
                resolve(selected_categories); 
            })
            .catch((err)=>{

                reject(`Error in Category_mdl.js: get_categories_by_names(): ${err}`);
            });
        })
    },

    get_category_by_name_id(category_name,category_id)
    {
        return new Promise((resolve,reject)=>{
            
            this.SQL = `SELECT *
            FROM category 
            WHERE title = ? OR category_id = ?`;
            db.connection.query(this.SQL, [category_name,category_id])
            .then(([rows,fields])=>{
                
                let selected_categories = [];

                if(rows.length > 0)
                {
                    rows.forEach(row => {

                        const selected_category = new Category;

                        selected_category.category_id = row.category_id;
                        selected_category.title = row.title;
                        selected_category.description = row.description;
                        selected_category.image_path = row.image_path;
                        selected_category.date_created = row.date_created;
                        selected_category.last_modified = row.last_modified;

                        selected_categories.push(selected_category);
                    });  
                }

                else
                {
                    selected_categories = null;
                }

                if(selected_categories != null)
                {
                    selected_categories.forEach(category => {
                        
                        console.log("SELECTED CATEGORY ARRAY -",category.category_id,"-",category.title);
                    });
                }; 

                if(selected_categories.length == 1)
                {
                    selected_categories = selected_categories[0];
                };

                resolve(selected_categories);
            })
            .catch((err)=>{

                reject(`Error in Category_mdl.js: get_category_by_name_id(): ${err}`);
            });
        })
    },

    get_categories_by_ids(category_id_arr)
    {
        return new Promise((resolve,reject)=>{
            
            const category_ids = /*"(" +*/ category_id_arr.map(item => `"${item}"`).join() /*+ ")"*/;
            
            console.log(category_id_arr,"Category ids joined",category_ids);

            this.SQL = `SELECT * FROM category 
                WHERE category_id IN (?)`;
            db.connection.query(this.SQL, [category_id_arr])
            .then(([rows,fields])=>{
                
                console.log("CATEGORY ROWS",rows);
                let selected_categories = [];

                if(rows.length > 0)
                {
                    rows.forEach(row => {
                        
                        const selected_category = new Category;

                        selected_category.category_id = row.category_id;
                        selected_category.title = row.title;
                        selected_category.description = row.description;
                        selected_category.image_path = row.image_path;
                        selected_category.date_created = row.date_created;
                        selected_category.last_modified = row.last_modified;

                        console.log("FOR EACH SELECTED CATEGORY!!!",selected_category);
                        selected_categories.push(selected_category);
                    });
                }

                else
                {
                    selected_categories = null;
                };

                console.log("SELECTED CATEGORIES",selected_categories);
                resolve(selected_categories); 
            })
            .catch((err)=>{

                reject(`Error in Category_mdl.js: get_categories_by_ids(): ${err}`);
            });
        })
    },

    edit_update_category(title,description,image_path,category_id)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `UPDATE category
                SET title = ?, description = ?, image_path = ?
                WHERE category_id = ?;`;
            db.connection.query(this.SQL, [title,description,image_path,category_id])
            .then(()=>{
                
                console.log(`CATEGORY UPDATED IN Category_mdl - TO BE RESOLVED`);
                resolve();
            })
            .catch((err)=>{
                
                reject(`Error in Category_mdl.js: edit_update_category(): ${err}`);
            });
        });
    },
}

module.exports = Category_model;