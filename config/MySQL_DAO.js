const mysql = require("mysql2/promise");

const MySQL_DB = {

    connection: null,

    init()
    {
        mysql.createConnection({

            host: process.env.HOST,
            user: process.env.USER,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            multipleStatements: true
        })
        .then((con) => {

            if(this.connection != null)
            {
                this.connection.end();
            }
            //console.log(con);
            this.connection = con;
            console.log("MySQL connection to database successful");
        })
        .catch(err => console.log(`Error in MySQL_DAO.js: MySQL.init(): ${err}`));
    },

    end()
    {
        this.connection.end();
    }
}

module.exports = MySQL_DB;