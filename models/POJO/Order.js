class Order
{
    order_id;
    order_date;
    is_completed = 0;
    is_cancelled = 0;
    //is_open = 1;
    //is_abandoned = 0;
    //is_in_cart = 1;
    customer; //Customer object instance
    date_created;
    last_modified;
};

module.exports = Order;