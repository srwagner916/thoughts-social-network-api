const router = require('express').Router();
const { addThought, getAllThoughts, getThoughtById } = require('../../controllers/thought-controller');

// endpoint: /api/thoughts
router.route('/').get(getAllThoughts).post(addThought);
// endpoint: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById);

module.exports = router;