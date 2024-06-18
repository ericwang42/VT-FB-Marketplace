const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors()); 
app.use(express.json()); 

mongoose.connect('mongodb+srv://nanayawo21:Kingnyboqwerty12345@itemtrade.bksa2hn.mongodb.net/UserTable');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully");
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "ericnodemailer@gmail.com",
        pass: "nxqzkozzltzeavmx"
    }
});

app.post('/send-email', async (req, res) => {
    const { sellerEmail, fullName, meetPlace, meetDate, meetTime, phoneNumber, productName } = req.body;

    const mailOptions = {
        from: "ericnodemailer@gmail.com",
        to: sellerEmail, 
        subject: 'Interest in your product listed on OurApp', 
        text: `Hello, I am ${fullName} and I am interested in your product "${productName}". I would like to meet at ${meetPlace} on ${meetDate} around ${meetTime}. Please let me know if this works for you. My phone number is ${phoneNumber}.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});


const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    condition: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    coverImage: { type: String, required: true } 
});

const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phoneNumber: String,
    firstName: String,
    lastName: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const User = mongoose.model('User', userSchema);


app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
        console.log(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/products', async (req, res) => {

    console.log(req.body);

    try {
        const newUser = new User({
            email: 'nanayawo21@vt.edu',
            phoneNumber: "1234567890",
            firstName: 'Nana Yaw',
            lastName: 'Oteng',
            products: []
        });

        await newUser.save();

        const product = new Product({
            title: req.body.title,
            price: req.body.price,
            status: req.body.status,
            condition: req.body.condition,
            user: newUser._id,
            coverImage: req.body.coverImage
        });

        const newProduct = await product.save();
        console.log("BOOO");
        console.log(newProduct);
        console.log("BOOO");
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log(users)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
