const router = require('express').Router();
const {
  addThought,
  getAllThoughts,
  getThoughtById,
  updateThoughtById,
  removeThought,
  addReaction, 
  removeReaction
} = require('../../controllers/thought-controller');

// endpoint: /api/thoughts
router.route('/').get(getAllThoughts).post(addThought);
// endpoint: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById);
// endpoint: /api/thoughts/:thoughtId/users/:userId
router.route('/:thoughtId/users/:userId').delete(removeThought);
// endpoint: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;