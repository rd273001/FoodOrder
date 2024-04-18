const express = require( 'express' );
const app = express();
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
require('dotenv').config();   // import environment variables

const PORT = process.env.PORT || 3000; // define the PORT
const uri = process.env.MONGODB_URI    // mongodb connection string

// MongoDB connection
mongoose.connect( uri )
  .then( () => console.log( 'MongoDB connected successfully...' ) )
  .catch( err => console.log( err ) );

// middleware
app.use( cors() );
app.use( express.json() );

// API routes
const foodRoutes = require( './routes/food' );
app.use( '/api/foods', foodRoutes );

// error handling middleware
app.use( ( err, req, res, next ) => {
  console.error( err.stack );
  res.status( 500 ).json( { message: 'Something went wrong!' } );
} );

// start the server
app.listen( PORT, () => {
  console.log( `Server is running on port ${ PORT }` );
} );