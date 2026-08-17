const cpuProvider = require("../providers/cpuProvider")
const { osInfoProvider } = require("../providers/osInfo")


// service for getting systeminfo
const sysInfoService = async()=>{

    try{
        // call provider to get the system info
        const systemInfo =  await osInfoProvider()
        console.log(systemInfo)

    }
    catch(error){
        return error.message
    }
}

// service for getting the CPU info
const cpuInfoService = async()=>{
    try{

        const cpuInfo1 = await cpuProvider()
        console.log(cpuInfo1)
        const {totalUsage:t1,idleValue:id1,cpuModel} = cpuInfo1
   

        await new Promise(resolve => setTimeout(resolve , 5000))

        const cpuInfo2 = await cpuProvider()
        const {totalUsage:t2,idleValue:id2} = cpuInfo2
        const total = t2 - t1
        const idle = id2 - id1

        const cpuPercent = (total - idle / total) * 100

        console.log(cpuPercent)

        return {
            cpuPercent,
            cpuModel
        }


    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}


module.exports = {sysInfoService,cpuInfoService}