const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/ScheduleController');
const verifyToken = require('../helpers/VerifyToken');

router.post('/', verifyToken, scheduleController.generateSchedule);
router.get('/', verifyToken, scheduleController.getSchedule);

module.exports = router;
