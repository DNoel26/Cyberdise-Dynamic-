class Order
{
    order_id;
    order_date_all;
    is_abandoned = 0;
    is_in_cart = 0;
    customer; //Customer object instance
    date_created;
    last_modified;
};

module.exports = Order;