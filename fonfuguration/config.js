const mongoose = require('mongoose');
const config = async()=>{
    try{
        await mongoose.connect('mongodb+srv://omaar:TmYTxhxY3qlPbUgZ@cluster0.rdjpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB');
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = config;