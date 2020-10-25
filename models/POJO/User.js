class User 
{
    //DB ATTRIBUTES
    user_id;
    first_name = "default";
    last_name;
    full_name;
    gender;
    country;
    email;
    password;
    logged_in = 0;
    last_login_date;
    last_login_IP;
    date_created;
    last_modified;
    //NON DB ATTRIBUTES
};
 
module.exports = User;