var inq = require("inquirer");
var mysql = require("mysql");

var total = 0;

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "0113",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;	
	displayDB();
	
});



function displayDB() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log("|ID\t|Name\t|Department\t|Price\t|Quantity\t|");
		for (var i = 0; i < res.length; i++) {
			console.log("|" + res[i].item_id + "\t|" + res[i].product_name + "\t|" + res[i].department_name + "\t|" + res[i].price + "\t|" + res[i].stock_quantity + "\t\t|");
		}
		
		buyStuff();
	});

	
}

function buyStuff() {
	inq.prompt([{
        name: "item",
        type: "input",
        message: "What would you like to buy?\n"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many?"
      }]).then(function(ans) {
    	  connection.query("SELECT * FROM products", function(err, res) {
    		  if (err) throw err;
    		  for (var i = 0; i < res.length; i++) {
    			  if (ans.item == res[i].product_name) {
    				  if (res[i].stock_quantity < ans.quantity) {
    					  console.log("----------------------------------");
    					  console.log("We don't have enough in stock.");
    					  console.log("----------------------------------");
    					  return buyStuff();
    				  }
    				  
    				  break;
    			  }
    		  }
    		  if (i == 5) {
    			  console.log("----------------------------------");
    			  console.log("Item doesn't exist.");
    			  console.log("----------------------------------");
    			  buyStuff();
    		  }
    		  else {
    			  connection.query(
    					  "UPDATE products SET ? WHERE ?",
    					  [{stock_quantity: res[i].stock_quantity - ans.quantity}, {item_id: i + 1}],
    					  function(err) {
    						  if (err) throw err;
    					  });
    			  
    			  total += res[i].price * ans.quantity;
    			  console.log("Your total is $" + total + ".")
    			  inq.prompt([{
    				  name: "more",
    				  type: "confirm",
    				  message: "Would you like to buy anything else?"
    			  }]).then(function(ans) {
    				  if (ans.more) {
    					  buyStuff();
    				  }
    				  else {
    					  
    					  connection.end();
    				  }
    			  });
    			  
    			  
    			  
    			  

    		  }    		  
    	  });
	});
}

