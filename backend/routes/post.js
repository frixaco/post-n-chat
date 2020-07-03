const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const auth = require('../middleware/auth')

// router.post('/', auth, async (req, res) => {
//     try {
//         const post = new Post({ ...req.body })
//         await post.save()

//         res.status(201).json({ post, msg: 'Post successfully created!' })
//     } catch (e) {
//         res.status(500).json({ msg: 'Something went wrong in the server!' })
//     }
// })

router.post('/my', auth, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.body.username });
        res.json({ posts });
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

// router.get('/all', auth, async (req, res) => {
//     try {
//         const posts = await Post.find({})
//         res.json({ posts })
//     } catch (e) {
//         res.status(500).json({ msg: 'Something went wrong in the server!' })
//     }
// })

// router.get('/:id', auth, async (req, res) => {
//     try {
//         const post = Post.findById(req.params.id)
//         res.json({ post })
//     } catch (e) {
//         res.status(500).json({ msg: 'Something went wrong in the server!' })
//     }
// })

// router.post('/:id', auth, async (req, res) => {
//     try {
//         const { newTitle, newContent } = req.body;
//         const post = Post.findById(req.params.id);

//         post.title = newTitle;
//         post.content = newContent;

//         await post.save();
//         res.json({ post });
//     } catch (e) {
//         res.status(500).json({ msg: 'Something went wrong in the server!' })
//     }
// })

module.exports = router