var mysql = require("mysql");
var inquirer = require ("inquirer")
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  inventory();
});

function inventory(answer) {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    console.log('**Current Invetory**')
    console.log('---------------------')
    console.table(res);
    })    


  purchase();
}

function purchase() {

connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
  inquirer.prompt([
  { name: 'choice',
    type: 'input',
    message: 'Enter the ID of the product you would like to purchase'
  },
  {
    name: 'amount',
    type: 'input',
    message: 'How many would you like to purchase?'
  }
    ]).then(function(choice){
      connection.query("SELECT * FROM products WHERE id = ?",[choice.choice], function(err2, results2){
        if (err2) throw err2;

        var currentInventory;
        var currentPrice;

        for (i = 0; i<results2.length; i++){
          currentInventory = results2[i].quantity;
          currentPrice = results2[i].price;
        }
        if (currentInventory > choice.amount){
          connection.query("UPDATE products SET quantity = quantity - ? WHERE id = ?",[choice.amount, choice.choice], function(err3, results3){
            if (err3) throw err3;
          });
          console.log("Yes you can purchase");
          console.log("Your total Purchase is $" + currentPrice*choice.amount)
        }
        else{
          console.log("not enough");
        }
      })
    })
})
};
