const mongoose = require( 'mongoose' );

// schema for the 'foods' collection
const foodSchema = new mongoose.Schema( {
  // your schema fields (image, quantity, etc.)
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
}, { versionKey: false } );

// create a model based on the foodSchema
const Food = mongoose.model( 'Food', foodSchema );

module.exports = Food;