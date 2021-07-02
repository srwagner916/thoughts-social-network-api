const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reationBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // format date
      get: createdAtVal => formatDate(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLenght: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Format the date!
      get: createdAtVal => formatDate(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;