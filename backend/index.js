const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const httpServer = require("http")
const pool = require("./db")
const cookieParser = require('cookie-parser')
const sessionCron = require("./jobs/sessionCron")



dotenv.config()

const app = express()
// creare a http server
const server = httpServer.createServer(app)



app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// port
const PORT = process.env.PORT || 13000


// routes
const authRoute = require("./routes/authRoute")
const sysRoute = require("./routes/sysRoute")
const ifaceRoute = require("./routes/ifaceRoute")
const nginxRoute = require("./routes/nginxRoute")
const logRoute = require("./routes/logRoute")
const systemSocketCall = require('./jobs/wsocket')


app.use("/api",authRoute)
app.use("/sys",sysRoute)
app.use("/iface",ifaceRoute)
app.use("/nginx",nginxRoute)
app.use("/logs",logRoute)



sessionCron()
systemSocketCall({server})

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})