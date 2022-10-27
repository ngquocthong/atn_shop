const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
// const Employee = mongoose.model('User');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login/template", {
       
}) })

router.post("/login", (req, res) => {
    
    if (req.body.email == "admin@gmail.com" &&req.body.password == "12341234") {
        res.redirect("product")
    }
    else {
        res.send("Wrong password")
    }
}) 


module.exports = router;