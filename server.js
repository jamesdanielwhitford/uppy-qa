const express = require('express');
const cors = require('cors'); 
const path = require('path');
const multer = require('multer');

const app = express();
app.use(express.static('dist'));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/dist/index.html"));
});

const storage = multer.diskStorage({
    destination: `${process.env.PERSISTENT_STORAGE_DIR}`,
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadImage = multer({
    storage
}).single('userFile');

app.post('/image', uploadImage, (req, res) => {
    if (req.file) {
        return res.json({
            msg: req.file.filename
        });
    }
    res.send('Error uploading file');
});

const port = process.env.PORT || 3000;
app.listen(port, () => { 
    console.log("listening on port " + port); 
});