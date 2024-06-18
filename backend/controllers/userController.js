const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

function validateEmail(email) {
    const domain = email.split('@')[1];
    return domain === 'vt.edu';
}

async function sendVerificationEmail(email, code) {
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

    const mailOptions = {
        from: {
            name: "Text Trade",
            address: "ericnodemailer@gmail.com"
        },
        to: email,
        subject: 'Verify Your Account',
        text: `Your verification code is: ${code}`
    };

    try {
        let info = await transporter.sendMail(mailOptions)
        console.log('email has been sent');
    } catch (error) {
        console.error(error);
    }
}


exports.verifyEmail = async (req, res) => {
    res.status(200).json({ message: "Email verified successfully!" });
};

exports.createUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email domain. Only @vt.edu emails are allowed.' });
        }

        const verificationCode = "492759";  

        const user = new User({
            email,
            password,
            firstName,
            lastName
        });

        await user.save();
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: 'User created successfully. Please check your email.', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error });
    }
};

exports.updateUserListings = async (req, res) => {
    try {
        const { userId } = req.params;
        const { listingId } = req.body;


        await User.findByIdAndUpdate(userId, { $push: { currentListings: listingId } });
        res.status(200).json({ message: 'User listings updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user listings', error: error });
    }
};

exports.updatePurchaseHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const { purchaseId } = req.body;

        await User.findByIdAndUpdate(userId, { $push: { purchaseHistory: purchaseId } });
        res.status(200).json({ message: 'Purchase history updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating purchase history', error: error });
    }
};

exports.addListingToUser = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { currentListings: productId } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: 'Listing added to user successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error adding listing to user', error });
    }
};

exports.addPurchaseToUser = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { purchaseHistory: productId } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: 'Purchase added to user successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error adding purchase to user', error });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not set in the environment variables');
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            secret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'User logged in successfully', token, userId: user._id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
