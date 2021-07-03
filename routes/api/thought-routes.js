const router = require('express').Router();
const { addThought, getAllThoughts } = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(addThought);

module.exports = router;