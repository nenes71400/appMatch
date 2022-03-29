const mysql = require('mysql');

var connection = mysql.createConnection({
  port:3306,
  host:"localhost",
  user:"appMatch",
  password:"_pa$$w0rd_",
  database:"appMatch"
});

connection.connect((err) => {
  if(!err)
  {
    console.log("Connected to mysql database");
  }
  else
    console.log(err);
});

module.exports = connection;



