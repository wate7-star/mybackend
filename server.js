require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan');
const itemRoutes = require('./routes/itemRoutes')


const app = express();




const db = process.env.MONGO_URI;

mongoose.connect(db)
.then(() => app.listen(8001,"0.0.0.0", () => console.log('Server running')))
.catch((err) => console.log(err));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(express.json());

const allowedOrigins = ['https://myapp-6ut6a1p5o-wate7-stars-projects.vercel.app'];
app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/api',itemRoutes);
console.log(process.env.CLOUDINARY_CLOUD_NAME); // Outputs: dwexbqc0u


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });