const mysql = require("mysql2/promise");

const MySQL = {

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

            //console.log(con);
            this.connection = con;
            console.log("MySQL connection to database successful");
        })
        .catch(err => console.log(`Error in MySQL_DAO.js: MySQL.init(): ${err}`));
    },

    end()
    {
        return this.connection.end();
    }
}

module.exports = MySQL;