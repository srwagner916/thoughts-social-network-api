const { Thought, User } = require('../models');

const thoughtController = {
  // gets all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },
  
  // gets a thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId})
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ msg: `No thought found with this Id` });
          return;
        }
        res.json(dbThoughtData)
      })
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

  // Finds a thought by Id and updates
  updateThoughtById({ body, params }, res) {
    Thought.findOneAndUpdate(
    /* Expects body:
       {
         "thoughtText": "updatedUsername"
       }
    */
      { _id: params.thoughtId }, body, { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ msg: `No Thought found with this ID` });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // deletes a thought by ID and pulls from User's thoughts array
  // endpoint: /api/thoughts/:thoughtId/users/:userId
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(removedThought => {
        if (!removedThought) {
          return res.status(404).json({ msg: `No thought found with this ID` });
        }
        return User.findOneAndUpdate({ _id: params.userId }, { $pull: { thoughts: params.thoughtId } }, { new: true, runValidators: true });
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ msg: `No user found with this ID` });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = thoughtController;