const router = require('express').Router();
const {createDecleration, findDeclerations, findDeclerationById} = require('../controllers/declerationsController');
const { verifyUser } = require('../verify');

router.post('/add', createDecleration)

router.post('/find', verifyUser, findDeclerations)

router.get('/decleration/:id', verifyUser, findDeclerationById)




module.exports = router;