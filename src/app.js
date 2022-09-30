const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const postModel = require('./models/postSchema');
const multer = require('multer');
const fs = require('fs');
const cors = require("cors");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage : storage})

// your code goes here
app.get('/post',async (req,res)=>{
    try {
        const allData = await postModel.find();
        res.json(allData);
    }
    catch(error) {
        console.log(error.message);
    }
})





app.post('/post', upload.single('image'), async (req, res) => {
    try {
        const saveData = new postModel({
            image : {
                data: fs.readFileSync('uploads/' + req.file.filename),
                contentType: "image/png"
            },
            author: req.body.author,
            location: req.body.location,
            description: req.body.description
        })
        saveData.save();
        return res.json({
            message: "Successfully Posted. Click OK"
        })
    }
    catch(e) {
        return res.json({
            message: e.message
        })
    } 
})


module.exports = app;