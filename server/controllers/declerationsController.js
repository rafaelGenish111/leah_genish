const { addDecleration, getDeclerstions, getDeclerationById } = require('../handlers/declerationsHandler');
const getValueFromBody = require('../utils');

async function createDecleration(req, res) {
    try {
        const id = getValueFromBody(req.body, 'id' )
        const fname = getValueFromBody(req.body, 'fname' )
        const lname = getValueFromBody(req.body, 'lname')
        const phone = getValueFromBody(req.body, 'phone' )
        const hltStt = getValueFromBody(req.body, 'hltStt' )
        const date = getValueFromBody(req.body, 'date')
        const sign = getValueFromBody(req.body, 'sign')
        const strStatus = JSON.stringify(hltStt)
        if (id, fname, lname, phone, hltStt, date, sign) {
            const dec = await getDeclerationById(id)
            if (!dec.length) {
                await addDecleration(id, fname, lname, phone, strStatus, date, sign)
                res.status(200).json({err: false, msg: "decleration added successfully"})
            } else {
                res.status(401).json({err: true, msg: "decleration exist already"})
            }
        } else {
            res.status(401).json({err: true, msg: 'some info missing'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
}

async function findDeclerations(req, res) {
    try {
        const {searchTerm} = req.body
        const data = await getDeclerstions(searchTerm)
        res.status(200).json({err: false, msg: data})
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
}

async function findDeclerationById(req, res) {
    try {
        const id = getValueFromBody(req.params, 'id')
        const data = await getDeclerationById(id)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
}


module.exports = {createDecleration, findDeclerations, findDeclerationById}