const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');


//PEAB MUUTMA SEDA OSA SIIN
router.get('/', homeController.getInfos);
router.get('/admin/edit-info', homeController.getEditInfo);
router.post('/admin/edit-info', homeController.postEditInfo);

module.exports = router;