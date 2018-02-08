var inquirer = require('inquirer');
var mysql = require('mysql');
require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Ierh8911",
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
            displayInventory();
            addToInventory(); 
          }else if (choice.choice === 'Add New Product'){
            console.log('Add New Product')  
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
  }

  function lowInventory(){
    connection.query("SELECT * FROM products WHERE quantity < 10", function(err, res){
        if (err) throw err;
        console.log('**Current Invetory**')
        console.log('---------------------')
        console.table(res);
        }) 
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
        connection.query("UPDATE products SET quantity = quantity + ? WHERE id = ?",[input.quantity, input.id], function(err3, results3){
            if (err3) throw err3;
          });
      })
  }