const Joi = require("joi")
const moment = require("moment")
const Comments = require("../schema/schemaComments")

async function addComments(req, res) {
  try {
    const { body } = req
    const commentsAdd = await Comments.create({
      ...body,
      time: moment().format("h:mm:ss, MMM Do YY"),
    })
    const comments = await Comments.find()
    res.status(200).json(comments)
  } catch (error) {
    res.sendStatus(400).send(error)
  }
}

function validationComments(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    comment: Joi.string().required(),
  })
  const validationResult = validationRules.validate(req.body)
  if (validationResult.error) {
    return res.status(400).send({ message: "data error" })
  }
  next()
}
async function getComments(req, res) {
  const comments = await Comments.find()
  res.status(200).json(comments)
}

module.exports = { validationComments, addComments, getComments }
