var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

var connection = mysql.createConnection ({
   
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "Bamazon"
});

var table = new Table({
           head: ['item_id', 'Product', 'Department', 'Price', 'Stock']
        , colWidths: [10, 33, 15, 13, 10]
      });

connection.connect (function(err) {
    if (err) throw err;
    console.log("connection as id "+connection.threadId);
});

connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

        for(var i = 0; i < res.length; i++){
            var data = new Array();
            data.push(res[i].item_id, res[i].product_name, res[i].department_name, '$ '+res[i].price, res[i].stock_quantity);
            table.push(data);
        };
      console.log("");
      console.log(table.toString());
      console.log("");
      start();
});

var start = function(){
    inquirer.prompt({
        name: "id",
        message: "What would you like to buy? (Please enter item_id)",
    }).then(function(ans){
        connection.query('SELECT * FROM products', function(err, res) {
            if (err) throw err;
                for(var i = 0; i < res.length; i++){
                    if(ans.id == res[i].item_id){
                        table.splice(0);
                        var dataArr = [];
                        dataArr.push(res[i].item_id, res[i].product_name, res[i].department_name, '$ '+res[i].price, res[i].stock_quantity);
                        table.push(dataArr);
                        console.log("");
                        console.log(table.toString());
                        console.log("");

                        var productQTY = parseInt(res[i].stock_quantity);
                        var productPrice = parseFloat(res[i].price);
                        buy(productQTY, productPrice);
                    };  
                };
        });
    });
};

var buy = function(productQTY, productPrice){

    inquirer.prompt({
        name: "QTY",
        message: "How many would you like to buy?"
    }).then(function(ans){
        if(ans.QTY > productQTY){
            console.log("")
            console.log("Insufficient quantity!")
            console.log("")
        } else if (ans.QTY < productQTY){
            var total = parseInt(ans.QTY);
            total *= productPrice;
            console.log("")
            console.log("The total is " + total);
            console.log("")
        };
    });
}
