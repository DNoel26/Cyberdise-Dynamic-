const User = require("./User.js");

class Customer extends User
{
    customer_id_fk;
    address_1;
    address_2;
    town_city;
    state;
    credit_card_num;
    role; // = "customer"
    date_created;
    last_modified;
};

module.exports = Customer;