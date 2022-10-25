const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: 'This field is required'
    },
    category: {
        type: String
    },
    price: {
        type: String
    },
    des: {
        type: String
    },
    image: {
        type: String
    },
})

// custom validation for email



mongoose.model('Product', employeeSchema);