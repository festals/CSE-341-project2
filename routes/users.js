const express= require('express');
const router = express.Router();

const usersController = require('../controllers/users.js');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

module.exports = router;