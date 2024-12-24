const express = require('express');
const multer = require('multer');
const { storage } = require('../Cloudinary/cloudinaryConfig'); // Import Cloudinary config
const router = express.Router();
const Item = require('../models/Item'); // Your MongoDB model

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },  // Set limit to 50MB
  });

// Route to upload an item with an image
router.post('/items', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
      }
      const { name,price,location,phoneNumber, description } = req.body;
      const imageUrl = req.file.path; // Cloudinary URL

      const newItem = new Item({ 
        name,
        price,
        location,
        phoneNumber, 
        description,
         image: imageUrl 
        });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      console.error('Error uploading item:', error);  // Log the error to the console
      res.status(500).json({ error: 'Failed to upload item', message: error.message });
    }
  });
  
// Route to get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});
router.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
