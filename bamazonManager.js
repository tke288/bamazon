var inquirer = require('inquirer');
var mysql = require('mysql');
require('console.table');

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
    action();
  });

  function action(){
      inquirer.prompt([
          {
              type: 'list',
              name: 'choice',
              message: 'What would you like to do?',
              choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
          }
      ]).then(function(choice){
          if (choice.choice === 'View Products for Sale'){
            displayInventory(); 
          }else if (choice.choice === 'View Low Inventory'){
            lowInventory();   
          }else if (choice.choice === 'Add to Inventory'){
            addToInventory(); 
          }else if (choice.choice === 'Add New Product'){
            newProduct(); 
          }
      })
  }

  function displayInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log('**Current Invetory**')
        console.log('---------------------')
        console.table(res);
        })    
        connection.end();
  }

  function lowInventory(){
    connection.query("SELECT * FROM products WHERE quantity < 10", function(err, res){
        if (err) throw err;
        console.log('**Current Invetory**')
        console.log('---------------------')
        console.table(res);
        }) 
        connection.end();
  }

  function addToInventory(){
        inquirer.prompt([
          {
              type: 'input',
              name: 'id',
              message: 'Enter ID of item you would like to update.'
          },
          {
            type: 'input',
            name: 'quantity',
            message: 'How many items would you like to add?'
        }
      ]).then(function(input){
        connection.query("UPDATE products SET quantity = quantity + ? WHERE id = ?",[input.quantity, input.id], function(err3, res3){
            if (err3) throw err3;
          });
          connection.end();    
      })
  }

function newProduct(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Please enter product name'
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Which department does the product belong in?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'How much does it cost?'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do we have?'
        }
    ]).then(function(input){
        connection.query("INSERT INTO products SET ?",
         {product_name: input.product_name, 
         department_name: 
         input.department_name, 
         price: input.price, 
         quantity: input.quantity}, function(err4, res4){});
        console.log("New product added")
        connection.end();
    })
}
