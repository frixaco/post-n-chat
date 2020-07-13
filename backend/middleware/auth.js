const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (res.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.cookies.token
        if (!token) {
            console.log('middleware: not authorized for route:', req.originalUrl)
            return res.status(401).json({ msg: 'Not authorized!' })
        }

        const decodedToken = jwt.verify(token, process.env.jwtSecret)
        req.user = decodedToken
        next()
    } catch (e) {
        res.status(401).json({ msg: 'Not authorized!' })
    }
}