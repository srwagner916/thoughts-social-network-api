const router = require('express').Router();
const { addThought } = require('../../controllers/thought-controller');

router.route('/').post(addThought);

module.exports = router;