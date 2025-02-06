const mongoose = require('mongoose');
const config = async()=>{
    try{
        await mongoose.connect('..............');
        console.log('Connected to MongoDB');
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = config;
