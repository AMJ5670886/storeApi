const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name must be provoded']
    },
    price:{
        type:Number,
        required:[true, 'product price must be provoded']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        deafault: Date.now()
    },
    company:{
        type:String, 
        enum:{
            values:['ikea','liddy','careesa','marcos'],
            message:'{VALUE} is not supported'
        }
    }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;