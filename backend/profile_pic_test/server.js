const express = require('express');
const app = express()
const multer = require('multer')

const upload = multer({ dest: 'public/' })

app.use(express.static('public'))
app.post('/pic', upload.single('photo'), async (req, res) => {
    try {
        console.log('Incoming image...')
        if (req.file) {
            res.json(req.file);
        }
        else throw 'error';
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(4000, () => console.log('listening on port 4000...'))