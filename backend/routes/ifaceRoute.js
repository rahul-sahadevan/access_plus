const express = require("express")
const { getInterfaceInfo } = require("../controllers/interfaceController")
const router = express.Router()


router.get("/status",getInterfaceInfo)

module.exports = router