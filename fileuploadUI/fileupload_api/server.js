const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('uploads'));

const storage = multer.diskStorage({
    // destination: './', or
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '.' + file.mimetype.split("/")[1]) or
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage }).single('file');

const multipleUploads = multer({ storage: storage }).array("files");//to the array method we can pass second argument to limit how many no of file we can upload

app.post('/', (req, res) => {
    //compare to images uploading video takes more time

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json({ path: req.file.filename });


    })
});

app.post('/multipleFiles', (req, res) => {

    multipleUploads(req, res, (err) => {

        if (err) {
            console.log(err);
        }
        let imgs = [];

        req.files.forEach(file => {
            imgs.push(file.filename)
        })

        res.status(200).json({ path: imgs });
    })
})

app.listen(port, () => console.log(`listening on port ${port}`))