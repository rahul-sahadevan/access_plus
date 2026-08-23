const express = require("express")
const { getInterfaceInfo, getNetplanInfo } = require("../controllers/interfaceController")
const router = express.Router()


router.get("/status",getInterfaceInfo)
router.post("/netplan",getNetplanInfo)

module.exports = router