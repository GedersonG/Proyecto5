const express = require('express');
const router = express.Router();

const debtsController = require('../controllers/debtController');

router.get('/', debtsController.list)
router.post('/add', debtsController.save)
router.get('/delete/:id', debtsController.delete)
router.get('/update/:id',debtsController.edit)
router.post('/update/:id', debtsController.update)

module.exports = router;
