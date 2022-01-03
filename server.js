//* Imports
const express = require('express');

//* Variables
const PORT = process.env.PORT || 3000;
const app = express();

//* Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//* Routes




// Unsupported routes
// This must be the last route or it will override the others
app.use((req,res)=>{
    res.status(404).end();
});

//* Listen for server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});