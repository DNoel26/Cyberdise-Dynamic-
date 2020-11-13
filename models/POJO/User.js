class User 
{
    //DB ATTRIBUTES
    user_id;
    first_name;
    last_name;
    gender;
    country;
    country_flag_src;
    username;
    email;
    password;
    phone_num;
    logged_in = 0;
    last_login_date;
    last_login_IP;
    date_created;
    last_modified;

    get_full_name()
    {
        return this.first_name + " " + this.last_name;
    };
};
 
module.exports = User;