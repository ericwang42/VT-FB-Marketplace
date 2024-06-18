const express = require('express');
const mongoose = require('mongoose');
const app = express();

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    condition: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    coverImage: { type: String, required: true } 
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phoneNumber: String,
    firstName: String,
    lastName: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);

const DBurl = 'mongodb+srv://nanayawo21:Kingnyboqwerty12345@itemtrade.bksa2hn.mongodb.net/UserTable'
mongoose.connect(DBurl)
 .then((result) => console.log("Succesful connection."))

 insertUser1()
 insertUser2()




 async function insertUser2() {
    const fs = require('fs');

    const newUser = new User({
            email: 'kingjulian393@vt.edu',
            phoneNumber: "0987654321",
            firstName: 'Julian',
            lastName: 'Acquah',
            products: []
    });

    const product1 = new Product({
        title: 'Lab Goggles',
        price: '9.99',
        status: 'Available',
        condition: 'Fair',
        user: newUser._id, 
        coverImage: 'https://m.media-amazon.com/images/I/41eGC3-bfoL._AC_.jpg' 
    });
    
    const product2 = new Product({
        title: 'Lab Coat',
        price: '59.99',
        status: 'Available',
        condition: 'Good',
        user: newUser._id, 
        coverImage: 'https://i5.walmartimages.com/seo/Panda-Uniform-lab-coat-women-and-doctor-coat-white-lab-coat-Medical-Lab-coat_0c640cb0-f1d7-40b7-9f43-5a608bb98911.8d07513c513d1896d1b71f16bb7c0cee.jpeg' 
    });

    const product3 = new Product({
        title: 'MS599',
        price: '44.99',
        status: 'Available',
        condition: 'Good',
        user: newUser._id, 
        coverImage: 'https://education.ti.com/-/media/ti/education/images/product-resources/which-calc/which-calc-30xsmv.png' 
    });
    
    const product4 = new Product({
        title: 'TI-64',
        price: '89.99',
        status: 'Available',
        condition: 'Good',
        user: newUser._id, 
        coverImage: 'https://pics.walgreens.com/prodimg/625721/450.jpg'
    });

    const product5 = new Product({
        title: 'TI-87',
        price: '69.99',
        status: 'Available',
        condition: 'Good',
        user: newUser._id, 
        coverImage: 'https://i.ebayimg.com/images/g/PdMAAOSwdrljWMQb/s-l640.jpg' 
    });

    await newUser.save();
    console.log('User2 inserted successfully.');


    await Product.insertMany([product1, product2, product3, product4, product5]);
    console.log('Products2 inserted successfully.');
    
    newUser.products.push(product1._id, product2._id, product3._id, product4._id, product5._id);
    await newUser.save();
    console.log('User2 updated with products.');

} 

async function insertUser1() {
    const fs = require('fs');

    const newUser = new User({
            email: 'nanayawo21@vt.edu',
            phoneNumber: "1234567890",
            firstName: 'Nana Yaw',
            lastName: 'Oteng',
            products: []
    });


    const product1 = new Product({
        title: 'World History Textbook',
        price: '29.99',
        status: 'Available',
        condition: 'Good',
        user: newUser._id, 
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_Da1V8BxK4lUH1hBLsbgLknABzBk9j46tg&usqp=CAU' 
    });

    const imageBuffer1 = fs.readFileSync('assets/comp_lang.jpg');
    const profileImageBase64_1 = imageBuffer1.toString('base64');
    
    const product2 = new Product({
        title: 'Language Composition Textbook',
        price: '15.99',
        status: 'Available',
        condition: 'Good',
        user: newUser._id, 
        coverImage: 'https://prod-cat-files.macmillan.cloud/MediaResources/Jackets/258W/9781319056148.jpg' 
    });

    const imageBuffer2 = fs.readFileSync('assets/design_systems.jpg');
    const profileImageBase64_2 = imageBuffer2.toString('base64'); 
    const product3 = new Product({
        title: 'System Design Textbook',
        price: '16.99',
        status: 'Available',
        condition: 'Good',
        user: newUser._id, 
        coverImage: 'https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/beee7aa8-482e-4404-9844-82fa92e0b00f/design-systems-book-800w-opt.jpg' 
    });

    const imageBuffer3 = fs.readFileSync('assets/grokking.jpeg');
    const profileImageBase64_3 = imageBuffer3.toString('base64');
    
    const product4 = new Product({
        title: 'Grokking Coding Interview',
        price: '21.99',
        status: 'Available',
        condition: 'Good',
        user: newUser._id, 
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfFke-iFLU0CPWMDa2ooELJFAIVX21-h6mTl1Tmy7cSL_n37bwU-zpx7xjbmPCbdxTaFc&usqp=CAU' 
    });

    await newUser.save();
    console.log('User1 inserted successfully.');


    await Product.insertMany([product1, product2, product3, product4]);
    console.log('Products1 1inserted successfully.');
    
    newUser.products.push(product1._id, product2._id, product3._id, product4._id);
    await newUser.save();
    console.log('User1 updated with products.');

}