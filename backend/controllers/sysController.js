const { sysInfoService } = require("../services/sysService")


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

module.exports = {getSystemInfo}