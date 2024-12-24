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

app.use(cors({
    origin: ['https://myapp-sigma-kohl.vercel.app', 'http://localhost:5173'],  // Add your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  

app.use('/api',itemRoutes);
console.log(process.env.CLOUDINARY_CLOUD_NAME); // Outputs: dwexbqc0u


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
 