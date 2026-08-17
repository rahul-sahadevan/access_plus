const express = require("express")
const isAuthenticated = require("../middlewares/isAuthenticated")
const { getSystemInfo } = require("../controllers/sysController")
const router = express.Router()

 router.get("/sysinfo",getSystemInfo)

module.exports = router