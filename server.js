//* Imports
const express = require('express');
const db = require('./db/connection');
// If the directory has an index.js file in it, Node.js will automatically look for it when requiring the directory.
const apiRoutes = require('./routes/apiRoutes');

//* Variables
const PORT = process.env.PORT || 3000;
const app = express();

//* Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', apiRoutes);


// Unsupported routes
// This must be the last route or it will override the others
app.use((req,res)=>{
    res.status(404).end();
});



//* Listen for server
// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});