const User = require("./User.js");

class Customer extends User
{
    customer_id_fk;
    address;
    city;
    town;
    credit_card_num;
    role = "customer";
};

module.exports = Customer;