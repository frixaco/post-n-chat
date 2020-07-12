const router = require('express').Router()
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

module.exports = router