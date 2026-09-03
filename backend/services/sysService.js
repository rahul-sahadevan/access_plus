const cpuProvider = require("../providers/cpuProvider")
const diskProvider = require("../providers/diskProvider")
const { osInfoProvider } = require("../providers/osInfo")


// service for getting systeminfo
const sysInfoService = async()=>{

    try{
        // call provider to get the system info
        const systemInfo =  await osInfoProvider()
        console.log(systemInfo)
        return systemInfo

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

        const cpuPercent = (((total - idle) / total) * 100).toFixed(2)

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


// service for disk info
const diskInfoService = async()=>{
    try{
        const output = await diskProvider()
        console.log(output)

        if(!output){
            return {
                status:500,
                message:"Failed to get CPU information!",
                data:output
            }
        }

        // disk usage percentage
        const {totalGB,freeGB,usedGB} = output
        const diskUsagePercent = ((usedGB/totalGB) * 100).toFixed(2)

        return {
            status:200,
            message:"Disk status retrieved succesfully!",
            data:{
                totalGB,
                freeGB,
                usedGB,
                diskUsagePercent
            }
        }


    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}


module.exports = {sysInfoService,cpuInfoService,diskInfoService}