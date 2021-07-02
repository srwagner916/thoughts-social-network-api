const { User } = require('../models');

const userController = {
  // gets all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
      })
      .populate({
        path: 'friends'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });

    /* response will look like this
       [
         {
           "thoughts": [<array of thoughts>],
           "friends": [<array of friends>],
           "_id": _id,
           "username": username,
           "email": email,
           "friendCount": <length of friends array>
         },
         ...
       ] 
    */
  },

  // creates user
  createUser({ body }, res) {
    /* expects body
       {
         "username", "testUser",
         "email", "testuser@email.com"
       } 
    */
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  getUserById({ params }, res) {
    User.findById({
      _id: params.userId
    })
      .populate({
        path: 'thoughts',
      })
      .populate({
        path: 'friends'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ msg: `No User found with this ID` });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
      /* response will look like this
        {
          "thoughts": [<array of thoughts>],
          "friends": [<array of friends>],
          "_id": _id,
          "username": username,
          "email": email,
          "friendCount": <length of friends array>
         },
      */
  },
  // Gets user by Id and update
  updateUserById({ body, params }, res) {
    User.findOneAndUpdate(
    /* Expects body:
       {
         "username": "updatedUsername",
         "email": "updatedemail@email.com"
       }
    */
      { _id: params.userId }, body, { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ msg: `No User found with this ID` });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUserById({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ msg: `No User found with this ID` });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  // adds friend to users friends array
  // endpoint is /api/users/:userId/friends/:friendId
  // :userId is _id of the user to add friend to; :friendId is the _id of friend to add
  addFriend({ params }, res) {
    User.findOneAndUpdate( { _id: params.userId}, {$addToSet: { friends: params.friendId }}, {new: true} )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ msg: `No User found with this ID` });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  // removes friend from user's friends array
  // endpoint is /api/users/:userId/friends/:friendId
  // :userId is _id of the user to remove friend from; :friendId is the _id of friend to remove
  removeFriend({ params }, res) {
    User.findOneAndUpdate( {_id: params.userId }, {$pull: { friends: params.friendId }}, {new: true} )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ msg: `No User found with this ID` });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = userController;