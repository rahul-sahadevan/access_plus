const os = require("os")
const fs = require("fs/promises")
const runCommand = require("../utils/runCommand")



const interfaceProvider = async()=>{
    try{    

        // interface IP configuration data
        const iface = os.networkInterfaces()

        // interface traffic data
        const ifaceData = await fs.readFile("/proc/net/dev","utf-8")
        const interfaces = await Promise.all(
        ifaceData
        .trim()
        .slice(2)
        .split("\n")
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
            ] = stats.trim().split(/\s+/).map(Number);

            const ifaceIP = iface[name.trim()] ? iface[name.trim()][0].cidr : ""
            const ifaceStatus =  await runCommand("ip",["link","show",name.trim()])

            // rx and tx bytes into mbps
            const rxMb = Number((rxBytes / (1024 * 1024)).toFixed(2))
            const txMb = Number((txBytes / (1024 * 1024)).toFixed(2))
        

            return {
                interface: name.trim(),
                interfaceIP: ifaceIP,
                iterfaceStatus: ifaceStatus,
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