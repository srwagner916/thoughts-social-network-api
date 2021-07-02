const router = require('express').Router();
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../../controllers/user-controller');

// endpoint: /api/users
router.route('/').get(getAllUsers).post(createUser);
// endpoint: /api/users/:id
router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById);

module.exports = router;