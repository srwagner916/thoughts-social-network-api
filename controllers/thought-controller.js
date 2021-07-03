const { Thought, User } = require('../models');

const thoughtController = {
  addThought({ params, body }, res) {
    /*
      expect body to be:
      {
        "thoughtText": "sample text",
        "username": "testUser"
      }
    */
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate( {  _id: body.userId }, {$push: { thoughts: _id } }, {new: true} );
      })
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ msg: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
}

module.exports = thoughtController;