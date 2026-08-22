const express = require("express")
const isAuthenticated = require("../middlewares/isAuthenticated")
const { getSystemInfo, getCpuInfo, getDiskInfo } = require("../controllers/sysController")
const router = express.Router()

 router.get("/sysinfo",getSystemInfo)
 router.get('/cpuinfo',getCpuInfo)
 router.get('/diskinfo',getDiskInfo)

module.exports = router