# Cyberdise E-Commerce Store

## Table of Contents
* [Summary](#summary)
* [Technologies](#technologies)
* [Customer Setup](#customer-setup)
* [Employee Login](#employee-login)

## Summary
This project is an E-Commerce store, built from scratch using the MEHN stack. It consists of both customer functionality and employee functionality, each with separate dashboards. It is currently hosted on Heroku and can be accessed via the link here: https://dnoelcyberdise.herokuapp.com/  

Note: To date, works best on Google Chrome and on a PC. Site is not yet responsive for mobile or tablet devices. All core functionality works but some minor features do not. 

## Technologies
Project was created using:
* HTML
* Vanilla CSS
* JavaScript
* Node
* Express
* MySQL
* Handlebars 

## Customer Setup
To use this site, create an account with fake data (please do not use your real information), by clicking the "Signup" link at the top right. You may then login via that route or using the header login link. Go to the "Shop Now" link and browse the items. You may select items and place them into your cart and then proceed to checkout by clicking "Order All Items" link at the bottom right. To confirm your order, click the Debit or Credit Card PayPal button (black) and enter the following fake credit card info:

Card Type: Visa

Card Number: 4032032234046149

Expiration Date: 09/2022

CVV: 249

Also, fill out the rest of the form with fake info. 

Proceed with the payment to purchase the selected product(s). This will remove quantities from the database (shown in the employee dashboard). 

To login as an employee, please see the next section.

## Employee Login

Logging in as an employee allows your to modify and/or delete products / product data such as name, price, image etc.

Please use the following credentials to login:

Email / Username: admintest or admintest@test.com
Password: admin

Click the "Stock" link at the top right to gain access to the product and category databases. You can then login as both a customer and then an employee (use Incognito mode for one) separately to see product quantities being removed when a payment is processed by a customer.

Experiment and have fun!
