const express = require('express');
const router = express.Router();

const saleController = require('../controllers/saleController');

router.get('/', saleController.list)
router.post('/add', saleController.save)
router.get('/delete/:id', saleController.delete)
router.get('/update/:id', saleController.edit)
router.post('/update/:id', saleController.update)

module.exports = router;

