const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
    if (res.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.cookies.token
        if (!token) {
            console.log('middleware: not authorized')
            return res.status(401).json({ msg: 'Not authorized!' })
        }

        const decodedToken = jwt.verify(token, config.get('jwtSecret'))
        req.user = decodedToken
        next()
    } catch (e) {
        res.status(401).json({ msg: 'Not authorized!' })
    }
}