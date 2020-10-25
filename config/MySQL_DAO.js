const mysql = require("mysql2/promise");

const MySQL = {

    connection: null,

    init()
    {
        mysql.createConnection({

            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_DATABASE,
            password: process.env.MYSQL_PASSWORD,
            multipleStatements: true
        })
        .then((con) => {

            //console.log(con);
            this.connection = con;
            console.log("MySQL connection to database successful");
        })
        .catch(err => console.log(`Error in File MySQL_DAO.js, MySQL.init(): ${err}`));
    },

    end()
    {
        this.connection.end();
    }
}

module.exports = MySQL;