const User_Product_model = require("../MYSQL_models/User_Product_mdl");

class User_Product //Functions as a cart
{
    customer; //Customer object instance
    product; //Product object instance
    cart_quantity; 
    date_created;
    last_modified;
}

module.exports = User_Product;