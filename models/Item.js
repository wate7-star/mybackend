const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Store Cloudinary URL
});

module.exports = mongoose.model('Item', ItemSchema);
