const express = require('express');
const getCases = require('../controllers/caseController');
const router = express.Router();

router.get('/', getCases);

module.exports = router;