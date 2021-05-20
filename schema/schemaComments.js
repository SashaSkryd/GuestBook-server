const mongoose = require("mongoose")
const { Schema } = mongoose

const CommentsSchema = new Schema({
  name: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
})

const Comments = mongoose.model("Comments", CommentsSchema)

module.exports = Comments
