const { sysInfoService, cpuInfoService, diskInfoService } = require("../services/sysService")


// get system details like RAM,CPU,DISK,OS-VERSION,PROCESSOR,
const getSystemInfo = async(req,res)=>{
    try{
        // call provider functions to get the system info
        const osInfo = await sysInfoService()
        if(!osInfo){
            return res.send({
                status:500,
                message:"OS information not available!",
                data:osInfo
            })
        }

        return res.send({
            status:200,
            message:"OS info retrieval succesful",
            data:osInfo
        })

    }
    catch(error){
        return res.send({
            status:500,
            message:"Filed to get system info"
        })
    }
}

// cpu info
const getCpuInfo = async(req,res)=>{
    try{

        const cpuInfo = await cpuInfoService()
        return res.send(cpuInfo)

    }
    catch(error){
        return res.send({
            status:500,
            message:"Failed to get CPU information",
            error:error
        })
    }
}

// get disk information
const getDiskInfo = async(req,res)=>{
    try{
        const diskInfo = await diskInfoService()
        return res.send(diskInfo)
    }
    catch(error){
        return res.send({
            status:500,
            message:"Filed to get the Disk information!",
            error
        })
    }
}

module.exports = {getSystemInfo,getCpuInfo,getDiskInfo}