const express = require( 'express' );
const router = express.Router();   // Create an Express router
const Food = require( '../models/Food' );
const { v4: uuidv4 } = require( 'uuid' );

// GET method -  /api/foods
router.get( '/', async ( req, res ) => {
  const { search } = req.query;
  const filters = {};

  //  if any search query is there in request then add them to filter object so it will find and return filtered items
  if ( search ) {
    filters.$or = [
      { name: { $regex: search, $options: 'i' } },
      { price: { $lte: Number( search ) || 0 } },
      { type: { $regex: search, $options: 'i' } }
    ];
  }

  try {
    const foods = await Food.find( filters );
    res.json( foods );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( `ERROR: ${ error.message }` );
  }
} );

router.post( '/addfood', async ( req, res ) => {
  try {
    const { name, price, type } = req.body;
    const food = { name, price, type, _id: uuidv4() };
    const newFood = new Food( food );   // create a new food order doc
    const result = await newFood.save();   // save the doc to "foods" collection
    res.status( 201 ).json( 'Food order added successfully.' );
    console.log( 'Food Added Response => ', 'Status = ', res.statusCode, '  Data = ', result );
  } catch ( error ) {
    res.status( 500 ).send( `ERROR: ${error.message}` );
  }
} );

module.exports = router;