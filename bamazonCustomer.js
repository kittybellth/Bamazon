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
var displayTable = function(fn){
connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
        table.splice(0);
        for(var i = 0; i < res.length; i++){
            var data = new Array();
            data.push(res[i].item_id, res[i].product_name, res[i].department_name, '$ '+res[i].price, res[i].stock_quantity);
            table.push(data);
        };
      console.log("");
      console.log(table.toString());
      console.log("");
        if (typeof fn === "function") {
            fn();
        } else {
            console.log("");
            console.log("Thank you! Have a good day.");
            console.log("");
            connection.end();
        }
});
};

var initApp = function(){
    inquirer.prompt({
        type: "input",
        name: "id",
        message: "What would you like to buy? (Please enter item_id)",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
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
                        buy(productQTY, productPrice, ans.id);
                    };  
                };
        });
    });
};

var buy = function(productQTY, productPrice, id){

    inquirer.prompt({
        type: "input",
        name: "QTY",
        message: "How many would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
    }).then(function(ans){
        if(ans.QTY > productQTY){
            console.log("");
            console.log("Insufficient quantity!");
            console.log("");
            buy(productQTY, productPrice);
        } else if (ans.QTY < productQTY){
            var QTY = parseInt(ans.QTY);
            QTY *= productPrice
            var newTotal = parseFloat(QTY).toFixed(2)
            console.log("");
            console.log("The total is $ " + newTotal);
            console.log("");
            confirm(ans.QTY, productQTY, id);
        };
    });
};

var confirm = function(QTY, productQTY, id){
    inquirer.prompt({
        type: "confirm",
        name: "confirm",
        message: "Are you sure?"
    }).then(function(ans){
        if(ans.confirm){
            var newProductQTY = productQTY -= QTY;
                connection.query("UPDATE products SET ? WHERE ?",[{
                    stock_quantity: newProductQTY
                },{
                    item_id: id
                }], function(err, res) {
                    if (err) throw err;
                    displayTable();
                });
        } else {
          console.log("");
          console.log("Alright! Have a good day.");
          console.log("");
          connection.end();
        };
    });
};

displayTable(initApp);
