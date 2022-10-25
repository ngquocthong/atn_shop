const express = require('express');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { check, validationResult } = require('express-validator')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }

})
const upload = multer({storage: storage})
router.get('/', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/addAndList", {
                list: docs
            })
        }
    })
})
router.post("/", upload.single("image") , (req, res) => {
    // check upload picture
    //  const file = req.file
    //  if (!file) {
    //     const error = new Error('Please upload a file')
    //     error.httpStatusCode = 400
    //     return next(error)
    //   }
    //  res.send(file)
    if (req.bod y._id == "") {
       insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var product = new Product();
    product.productName = req.body.productName;
    product.category = req.body.category;
    product.des = req.body.des;
    product.image = req.file.filename;
    product.price = req.body.price + "$";
    product.save((err, doc) => {
        if (!err) {
            res.redirect('product');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/addAndList", {
                    viewTitle: "Insert Product",
                    err: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('product');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/addAndList", {
                    viewTitle: 'Update product',
                    product: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}



router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/update", {
                viewTitle: "Update Employee",
                product: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/product');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;

            case 'email':
                body['emailError'] = err.errors[field].message;
                break;

            default:
                break;
        }
    }
}

module.exports = router;