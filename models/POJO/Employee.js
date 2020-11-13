const User = require("./User.js");

class Employee extends User
{
    inventory_clerk_id_fk;
    role; // = "employee"
    date_created;
    last_modified;
};

module.exports = Employee;