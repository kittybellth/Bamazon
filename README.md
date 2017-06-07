# Bamazon

### Purpose
Pricticing how to applying 2 technologies to create shopping and database management applications.

### Technologies
* NodeJS
* MySQL

### How to use an application


#### Customer Application
1. Open the Terminal or Bash and use command `node bamazonCustomer.js`.
1. Then you will see all available products and be prompted asking 
    ![Data Table](/images/BC1.png)

1. Once you enter the product ip you will be promted asking
    ![Purchasing product](/images/BC2.png)
   
1. Then you will be shown the total price and prompted confirming
    ![Confirmation](/images/BC3.png)

1. If you `enter` or type `Y` and enter, you will successfully make a purchase
    ![Update Table](/images/BC4.png)

    * Otherwise if you type `N` and enter you will be quit of the application.


#### Manager Application
1. Open the Terminal or Bash and use command `node bamazonManager.js`.
1. Once you are connected to the mySQ you will be promptd asking
    ![Initial Prompt](/images/BM1.png)

1. If you select `View Products for Sale` then you will be shown with all product data table
    ![Data Table](/images/BM2.png)

1. If you select `View Low Inventory` then you will be shown with all products data table that **stock less than 5**
    ![Data Table](/images/BM3.png)
   
1. If you select `Add to Inventory` then you will be shown with all products data table that **stock less than 5** and prompted asking
    ![Add data](/images/BM4.png)

1. If you select `Add New Product` then you will be prompted asking all mandatory questions for adding a new inventory 
    ![Add New Product Prompt](/images/BM5.png)

    1. Once you finish filling out the information you will be shown all new data talble
        ![New Data Table](/images/BM6.png)
