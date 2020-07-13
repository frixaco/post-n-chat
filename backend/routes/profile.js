const router = require('express').Router()
const auth = require('../middleware/auth')
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userID)
        res.json({ username: user.username, email: user.email })
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

router.post('/:updateKey', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userID)
        const updateParam = req.params.updateKey

        if (updateParam === 'password') {
            const updatedPassword = await bcrypt.hash(req.body[updateParam], 8);
            user.password = updatedPassword;
        } else {
            user[updateParam] = req.body[updateParam]
        }
        await user.save()

        res.json({ [updateParam]: user[updateParam] })
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        console.log('deleting user')
        await User.deleteOne({ username: req.body.username }, err => {
            if (err) return console.log(err.message);
        });
        await Post.deleteMany({ author: req.body.username }, err => {
            if (err) return console.log(err.message)
        })
        res.json({ msg: 'User deleted successfully!' })
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})


module.exports = router