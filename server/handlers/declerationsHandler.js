const Query = require('../db/db');

async function addDecleration(id, fname, lname, phone, hltStt, date, sign) {
    const q = `INSERT INTO declerations(id, first_name, last_name, phone, health_status, decleration_date, signature) VALUES (?, ?, ?, ?, ?, ?, ?)`
    return await Query(q, [id, fname, lname, phone, hltStt, date, sign])
}

async function getDeclerstions(searchTerm) {
    const q = `SELECT * FROM declerations WHERE id LIKE CONCAT('%', ?, '%') OR first_name LIKE CONCAT('%', ?, '%') OR last_name LIKE CONCAT('%', ?, '%')`   
    return await Query(q, [searchTerm, searchTerm, searchTerm])
}

async function getDeclerationById(id) {
    return await Query('SELECT * FROM declerations WHERE id = ?', [id])
}

module.exports = {addDecleration, getDeclerstions, getDeclerationById}