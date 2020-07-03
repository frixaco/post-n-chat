const router = require('express').Router()
const auth = require('../middleware/auth')
const User = require('../models/User')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userID)
        res.json({ username: user.username, email: user.email })
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

router.post('/:update', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userID)
        const updateParam = req.params.update
        user[updateParam] = req.body[updateParam]

        await user.save()

        res.json({ msg: `${updateParam} successfully updated!` })
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

module.exports = router