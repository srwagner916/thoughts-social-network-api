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
      _id: params.id
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
      { _id: params.id }, body, { new: true, runValidators: true }
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
    User.findOneAndDelete({ _id: params.id })
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