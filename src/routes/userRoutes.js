const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authorizationMiddleware = require('../middleware/authMiddleware');

router.get('/', authorizationMiddleware(['admin']), controller.getUsers);
router.get('/:id', authorizationMiddleware(['admin']), controller.getUserById);
router.post('/', authorizationMiddleware(['admin']), controller.addUser);
router.put('/:id', authorizationMiddleware(['admin']), controller.updateUserById);
router.delete('/:id', authorizationMiddleware(['admin']), controller.deleteUserById);

module.exports = router;
