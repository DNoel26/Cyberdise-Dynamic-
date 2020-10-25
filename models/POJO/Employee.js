const User = require("./User.js");

class Employee extends User
{
    inventory_clerk_id_fk;
    role = "employee";
};

module.exports = Employee;