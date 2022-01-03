//* Imports
const express = require('express');
const mysql = require('mysql2');

//* Variables
const PORT = process.env.PORT || 3000;
const app = express();

//* Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//* Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Daniel12',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );
  


//* Routes and Queries

// GET request
db.query('SELECT * FROM candidates WHERE id = 1', (err,rows)=>{
    if(err) console.log(err);
    else console.log(rows);
});

// DELETE request
db.query('DELETE FROM candidates where id = ?',1, (err,result)=>{
    if (err) console.log(err);
    else console.log(result);
});

// POST request
const sql = 'INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)';
const params = [1, "Ronald", "Firbank", 1];

db.query(sql, params, (err, result)=>{
    if (err) console.log(err);
    else console.log(result);
});

// Unsupported routes
// This must be the last route or it will override the others
app.use((req,res)=>{
    res.status(404).end();
});



//* Listen for server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});