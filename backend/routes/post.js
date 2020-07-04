const router = require('express').Router()
const Post = require('../models/Post')
const auth = require('../middleware/auth')


router.post('/my', auth, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.body.username });
        res.json({ posts });
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong in the server!' })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const newPost = new Post(req.body)
        await newPost.save()
        res.json({ msg: 'Post created successfully!' });
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