require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
// const conversationRoutes = require('./routes/conversationRoutes');
// const messageRoutes = require('./routes/messageRoutes');

app.use('/api', userRoutes);
app.use('/api', productRoutes);
// app.use('/api', conversationRoutes);
// app.use('/api', messageRoutes);

app.get('/', (req, res) =>
    res.send('<h1>Textbook Project Backend</h1>') 
);


// Connect to MongoDB
mongoose.connect('mongodb+srv://nanayawo21:Kingnyboqwerty12345@itemtrade.bksa2hn.mongodb.net/');
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

// Listen on a port
app.listen(3001, () => console.log('Server running on port 3001'));
