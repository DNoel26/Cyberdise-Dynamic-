class Order_Product
{
    order; //Order object instance
    product; //Product object instance
    order_quantity;
    is_processing = 1;
    is_shipped = 0;;
    is_delivered = 0;
    date_shipped;
    date_delivered; 
    date_created;
    last_modified;
};

module.exports = Order_Product;