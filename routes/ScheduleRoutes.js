const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/ScheduleController');
const verifyToken = require('../helpers/VerifyToken');

router.post('/', verifyToken, scheduleController.generateSchedule);
router.get('/allSchedules', verifyToken, scheduleController.getAllSchedules);
router.post('/generate', verifyToken, scheduleController.generateSchedule);
router.post('/deleteSubject', verifyToken, scheduleController.deleteSubject);
router.post('/updateSubject', verifyToken, scheduleController.updateSubject);
router.post('/updateAvailableTime', verifyToken, scheduleController.updateAvailableTime);
router.post('/addSubject', verifyToken, scheduleController.addSubject);

module.exports = router;
