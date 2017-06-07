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
    initApp();
});

var initApp = function(){
    inquirer.prompt({
        type: "list",
        name: "qa",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        message: "What would you like to do?"
    }).then(function(ans){
        switch (ans.qa) {
            case "View Products for Sale":
                allProduct();
                break;

            case "View Low Inventory":
                lowInventory(true);
                break;

            case "Add to Inventory":
                lowInventory(false);
                break;

            case "Add New Product":
                addNewProduct();
                break;
        }
    });
};

var allProduct = function() {
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
        connection.end();
    });
};

var lowInventory = function(endConnection){
    connection.query('SELECT * FROM products', function(err, res) {
            if (err) throw err;
            table.splice(0);
                for(var i = 0; i < res.length; i++){
                    if(res[i].stock_quantity <= 5){
                        var dataArr = [];
                        dataArr.push(res[i].item_id, res[i].product_name, res[i].department_name, '$ '+res[i].price, res[i].stock_quantity);
                        table.push(dataArr);
                    };
                };
        if (endConnection == true) {
            console.log("");
            console.log(table.toString());
            console.log("");
            connection.end();
        } else {
            console.log("");
            console.log(table.toString());
            console.log("");
            addInventory();
        }
    });
};

var addInventory = function(){
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please enter item id you would like to add stock",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
    },{
        type: "input",
        name: "qty",
        message: "How many would you like to add?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
    }]).then(function(ans){
        var id = parseInt(ans.id);
        var qty = parseInt(ans.qty);
        connection.query('SELECT * FROM products', function(err, res) {
            for(var i = 0; i < res.length; i++){
                if (res[i].stock_quantity <= 5){
                    if(res[i].item_id == id){
                        var newProductQTY = parseInt(res[i].stock_quantity);
                        newProductQTY += qty;
                        console.log(newProductQTY);
                        console.log(id);
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newProductQTY
                        },{
                            item_id: id
                        }], function(err, res) {
                        if (err) throw err;
                            console.log("");
                            console.log("Saved!");
                            console.log("");
                                setTimeout(function(){
                                    allProduct();
                                }, 2000);
                        });
                    } else if (res[i].item_id !== id){
                        console.log("");
                        console.log("Invalid ID!");
                        console.log("");
                        connection.end();
                        return;
                    };
                };
            };
        });
    });
};

var addNewProduct = function(){
    inquirer.prompt([{
        type:"input",
        name:"product",
        message:"Please enter the product name"
    },{
        type:"input",
        name:"department",
        message:"Please enter department name"
    },{
        type:"input",
        name:"price",
        message:"Please enter price per each",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
    },{
        type:"input",
        name:"stock",
        message:"Please enter the stock amount",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
    }]).then(function(ans){
        var name = ans.product;
        var department = ans.department;
        var price = parseFloat(ans.price);
        var stock = parseInt(ans.stock);

        connection.query("INSERT INTO products SET ?", {
            product_name: name,
            department_name: department,
            price: price,
            stock_quantity: stock
        }, function(err, res) {
            console.log("");
            console.log("Saved!");
            console.log("");
                setTimeout(function(){
                    allProduct();
                }, 2000);
        });
    });
}