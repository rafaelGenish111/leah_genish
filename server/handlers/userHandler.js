const Query = require('../db/db');


async function isUserExist(username) {
    const q = `SELECT * FROM user WHERE username = ? `
    const res = await Query(q, [username])
    return res.length
}

async function addUser(fname, lname, username, password) {
    const q = `INSERT INTO user(first_name, last_name, username, password) VALUES(?, ?, ?, ?)`
    return await Query(q, [fname, lname, username, password])
}

async function getThisUser(username) {
    return await Query(`SELECT * FROM user WHERE username = ?`, [username])
}

async function getAllUsers() {
    return await Query(`SELECT * FROM user`)
}

module.exports = { addUser, getThisUser, isUserExist, getAllUsers }