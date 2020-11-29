class Order
{
    order_id;
    order_date;
    is_paid = 0;
    is_completed = 0;
    is_cancelled = 0;
    total_cost;
    //is_open = 1;
    //is_abandoned = 0;
    //is_in_cart = 1;
    customer; //Customer object instance
    date_created;
    last_modified;
};

module.exports = Order;