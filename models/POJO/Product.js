class Product
{
    product_code;
    min_qty;
    max_qty;
    selling_price;
    cost_price;
    current_quantity;
    title;
    description;
    image_path;
    category; //Category object instance
    is_best_seller = 0;
    date_created;
    last_modified;

    get_stock_val()
    {
        return this.selling_price * this.current_quantity;
    };
};

module.exports = Product;