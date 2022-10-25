const mongoose = require('mongoose');
const url = "mongodb+srv://crud:crud_123@cluster0.kaunka5.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})

require('./product.model');
require('./employee.model');