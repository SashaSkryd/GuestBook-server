const Router = require("express")
const { validationComments, addComments, getComments } = require("../controllers/controllerComments")
const router = Router()

router.post("/add", validationComments, addComments)
router.get("/", getComments)

module.exports = router
