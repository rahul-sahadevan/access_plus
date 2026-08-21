const express = require("express")
const { getNginxStatus, performNginxOp } = require("../controllers/nginxController")
const router =  express.Router()


router.get("/status",getNginxStatus)
router.get("/operation",performNginxOp)


module.exports = router