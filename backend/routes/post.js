const router = require('express').Router()
const Post = require('../models/Post')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {
        const newPost = new Post(req.body)
        await newPost.save()
        res.json({ post: newPost });
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})


router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({})
        res.json({ posts })
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

router.post('/:id', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const editedPost = await Post.findById(req.params.id);

        editedPost.title = title;
        editedPost.content = content;

        await editedPost.save();
        res.json({ post: editedPost });
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id }, err => {
            if (err) return console.log(err);
        });
        res.json({ msg: 'Post successfully deleted!' })
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

module.exports = router