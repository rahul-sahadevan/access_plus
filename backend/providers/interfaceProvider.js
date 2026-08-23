const os = require("os")
const fs = require("fs/promises")
const {spawn} = require("child_process")

const runCommand = (interfaceName)=>{
    return new Promise((resolve,reject)=>{
        const process = spawn("ip",["link","show",interfaceName])

        let stdout = ''
        let stderr = ''

        process.stdout.on("data",(data)=>{
            stdout += data
        })

        process.stderr.on("data",(data)=>{
            stderr += data
        })

        process.on("error",(error)=>{
            reject(error)
        })


        process.on("close",(code)=>{
            if(code !== 0){
                reject({
                    status:500,
                    message:'Command execution failed!',
                    data:stderr
                })
            }

           const isUp = stdout.includes("state UP")
           resolve({
                interfaceName,
                status: isUp ? "UP" : "DOWN"
           })
            
        })
    })
}



const interfaceProvider = async()=>{
    try{    

        // interface IP configuration data
        const iface = os.networkInterfaces()

        // interface traffic data
        const ifaceData = await fs.readFile("/proc/net/dev","utf-8")
        const interfaces = await Promise.all(
        ifaceData
        .trim()
        .split("\n")
        .slice(2)
        .map(async (line) =>{

            const [name,stat] = line.split(":")

            const [
                rxBytes,
                rxPackets,
                rxErrors,
                rxDrops,
                rxFifo,
                rxFrame,
                rxCompressed,
                rxMulticast,
                txBytes,
                txPackets,
                txErrors,
                txDrops,
                txFifo,
                txColls,
                txCarrier,
                txCompressed,
            ] = stat.trim().split(/\s+/).map(Number);

            const ifaceIP = iface[name.trim()] ? iface[name.trim()][0].cidr : ""
            const ifaceStatus =  await runCommand(name.trim())

            // rx and tx bytes into mbps
            const rxMb = Number((rxBytes / (1024 * 1024)).toFixed(2))
            const txMb = Number((txBytes / (1024 * 1024)).toFixed(2))
        

            return {
                interface: name.trim(),
                interfaceIP: ifaceIP,
                interfaceStatus: ifaceStatus,
                rxMb,
                rxPackets,
                rxErrors,
                rxDrops,
                txMb,
                txPackets,
                txErrors,
                txDrops,
            }
        }))

        console.log(interfaces)
        return interfaces

    }
    catch(error){
        return error.message
    }
}


module.exports = interfaceProvider