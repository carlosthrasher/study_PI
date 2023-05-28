const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const verifyToken = require('../helpers/VerifyToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/subject', verifyToken, userController.addSubject);
router.delete('/subject/:subjectId', verifyToken, userController.deleteSubject);
router.put('/subject/:subjectId', verifyToken, userController.updateSubject);
router.put('/availableTime', verifyToken, userController.updateAvailableTime);

module.exports = router;
