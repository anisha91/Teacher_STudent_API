/* Importing necessary modules and setting up routes for an Express server */
const express = require("express");
require("dotenv").config();
const teacherRoutes = require("./routes/teacherRoutes");
const cors = require('cors');

// Setting up an Express server in a Node.js application
const app = express();

app.use(express.json());
app.use("/api", teacherRoutes);

/* Setting up the port number for the Express server to
listen on.*/
const PORT = process.env.PORT || 3000;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // Export the app instance for testing