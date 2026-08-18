const express = require("express")
const { getLogInformation } = require("../controllers/logController")
const router = express.Router()

router.get("/sysLog",getLogInformation)


module.exports = router