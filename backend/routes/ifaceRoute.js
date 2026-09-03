const express = require("express")
const { getInterfaceInfo, getNetplanInfo, readNetplanFile } = require("../controllers/interfaceController")
const router = express.Router()


router.get("/status",getInterfaceInfo)
router.post("/netplan",getNetplanInfo)
router.get("/readNet",readNetplanFile)

module.exports = router