const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    if (req.header("Authorization")) {
        jwt.verify(req.header('Authorization'), 'KuKoBoLo', (err, user) => {
            if (err) {
                res.status(403).json({err: true, msg: "token not valid"})
            } else {
                req.user = user
                next()
            }
        })
    } else {
        res.status(401).json({err: true, msg: "token expected"})
    }
}


module.exports = {verifyUser}