const express = require("express");
const exphbs = require("express-handlebars");

const helper  = exphbs.create({

    helpers: {

        if_eq(a,b, options)
        {
            if(a == b) 
            {
                //console.log("if main this",options.fn(a),options.fn(b),options.fn(this));
                return options.fn(this);
            }

            else
            {
                //console.log("else main this",options.inverse(a),options.inverse(b),options.inverse(this));
                return options.inverse(this);
            };
        },

        if_true(a,b)
        {
            if(a == b) 
            {
                console.log("TRUE",a,"and",b);
                return true;
            }

            else
            {
                console.log("TRUE",a,"and",b);
                return false;
            };
        },

        if_not(a,options)
        {
            if(a == null || a == undefined || a == "" || a == false) 
            {
                //console.log("IF NOT IF",a)
                return options.fn(this);
            }

            else
            {
                //console.log("IF NOT ELSE",a)
                return options.inverse(this);
            };
        },

        for_each_sel()
        {

        },

        calc_stock_val(a,b)
        {
            return parseFloat(a * b).toFixed(2);
        },

        help_test(a,options)
        {
            if(a == "male")
            {
                return a = "DOG"
            }

            else
            {
                return a = "CAT"
            };
        },

        help_test_2(a,options)
        {
            //console.log("help 2",options.fn(this));
            
            return a += " I'M TRYING SOMETHING";
        },

        log(a,options)
        {
            console.log(a);
        },
    }
})

module.exports = helper;