const os = require("os")
const fs = require("fs/promises")



const interfaceProvider = async()=>{
    try{    

        // interface IP configuration data
        const iface = os.networkInterfaces()

        // interface traffic data
        const ifaceData = await fs.readFile("/proc/net/dev","utf-8")
        const interfaces = ifaceData
        .trim()
        .slice(2)
        .split("\n")
        .map(line =>{

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

            return {
                interface: name.trim(),
                interfaceIP: ifaceIP,
                rxBytes,
                rxPackets,
                rxErrors,
                rxDrops,
                txBytes,
                txPackets,
                txErrors,
                txDrops,
            }
        })

        console.log(interfaces)
        return interfaces

    }
    catch(error){
        return error.message
    }
}


module.exports = interfaceProvider