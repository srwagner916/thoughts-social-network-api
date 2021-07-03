const { Thought, User } = require('../models');

const thoughtController = {
  // gets all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },
  
  // adds a new thought and pushes to user's thoughts array
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
  },

}

module.exports = thoughtController;