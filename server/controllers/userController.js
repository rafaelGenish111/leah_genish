const { addUser, getThisUser, isUserExist, getAllUsers } = require('../handlers/userHandler');
const getValueFromBody = require('../utils');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function createUser(req, res) {
    try {
        const fname = getValueFromBody(req.body, 'fname')
        const lname = getValueFromBody(req.body, 'lname')
        const username = getValueFromBody(req.body, 'username')
        const password = getValueFromBody(req.body, 'password')
        if (fname && lname && username && password) {
            const user = await isUserExist(username)
            if (!user) {
                const userLength = await getAllUsers()
                if (userLength.length < 1) {
                    const salt = genSaltSync(10)
                    const hash = hashSync(password, salt)
                    await addUser(fname, lname, username, hash)
                    res.status(200).json({ err: false, msg: "user added successfully", hash })
                } else {
                    res.status(403).json({ err: true, msg: "you're can't sing up. have an admin already" })
                }
            } else {
                res.status(401).json({ err: true, msg: "username exist already, please sign in" })
            }
        } else {
            res.status(400).json({ err: true, msg: 'some info missing' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
}

async function logIn(req, res) {
    try {
        const username = getValueFromBody(req.body, 'username')
        const password = getValueFromBody(req.body, 'password')
        if (username && password) {
            const user = await getThisUser(username)
            if (!user.length) {
                return res.status(403).json({ err: true, msg: "this user not exist. please sign up" })
            } else {
                if (compareSync(password, user[0].password)) {
                    const access_token = jwt.sign({ username: user[0].username, name: user[0].first_name }, 'KuKoBoLo', {
                        expiresIn: '10m'
                    })
                    res.header("Authorization", `Bearer ${access_token}`).json({
                        msg: 'Authenticated successfully',
                        token: access_token,
                        login: `welcome ${user[0].first_name}!`
                    })
                } else {
                    res.status(401).json({ err: true, msg: "incorrect password" })
                }
            }
        } else {
            res.status(400).json({ err: true, msg: "some info missing" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
}

async function checkToken(req, res) {
    const authHeader = req.headers["Authorization"]
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, 'KuKoBoLo', (err, user) => {
        if (err) {
            return res.status(403).json({ err: true, msg: 'invalid token' })
        } else {
            res.json({ isValid: true, user })
        }
    })
}

module.exports = { createUser, logIn, checkToken }