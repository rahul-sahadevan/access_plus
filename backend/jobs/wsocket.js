const WebSocket = require("ws")
const { cpuInfoService } = require("../services/sysService")
const { nginxStatusService } = require("../services/nginxService")
const { osInfoProvider } = require("../providers/osInfo")
const interfaceProvider = require("../providers/interfaceProvider")
const interfaceService = require("../services/interfaceService")


const dataForSocket = async()=>{
    try{

        const {cpuPercent} = await cpuInfoService()
        const {activeState} = await nginxStatusService()
        const {totalMemGb,freeMemGb} = await osInfoProvider()
        const interfaceTraffic  = await interfaceService()



        return{
            cpuPercent,
            activeState,
            totalMemGb,
            freeMemGb,
            interfaceTraffic

        }
    }
    catch(error){
        console.log(error.message)
        return error
    }
}

const systemSocketCall = async({server})=>{

    try{

        const wss = new WebSocket.Server({server})
        
        wss.on("connection",(socket)=>{
            console.log("websocket connection done!")
            const systemDataSend = async()=>{
                console.log("calling the systemdata send")
                try{
  
                    socket.send(JSON.stringify({
                        type:"system_data",
                        data:await dataForSocket()
                    }))
                    
                }
                catch(error){
                    socket.send(JSON.stringify({
                        type:"error",
                        error
                    }))
                }
            }
            

            systemDataSend()

            const interval = setInterval(async()=>{
                if(socket.readyState === WebSocket.OPEN){
                    systemDataSend()
                }
            },5000)

            socket.on("close",()=>{
                console.log("closing the websocket")
                clearInterval(interval)
            })
            
        })


    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}

module.exports = systemSocketCall