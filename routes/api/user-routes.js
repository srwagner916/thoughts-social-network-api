const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend 
} = require('../../controllers/user-controller');

// endpoint: /api/users
router.route('/').get(getAllUsers).post(createUser);
// endpoint: /api/users/:id
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);
// endpoint: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;