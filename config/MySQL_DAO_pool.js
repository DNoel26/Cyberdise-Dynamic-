const mysql = require("mysql2");

const MySQL_DB_pool = {

    connection: null,

    init()
    {
        const pool = mysql.createPool({
        
            host: process.env.HOST,
            user: process.env.USER,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            multipleStatements: true,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })

        this.connection = pool.promise();
        console.log("CONN POOL AWAITING");
    },

    end()
    {
        if(this.connection)
        {
            this.connection.end();
        }
    },

    destroy()
    {
        if(this.connection)
        {
            this.connection.destroy();
        }
    }
}

module.exports = MySQL_DB_pool;