const interfaceService = require("../services/interfaceService")
const netplanService = require("../services/netplanService")


const getInterfaceInfo = async(req,res)=>{
    try{
        const ifaceInfo = await interfaceService()

        if(!ifaceInfo){
            return res.send(ifaceInfo)
        }

        return res.send({
            status:200,
            message:"Interface information retrived successfully!",
            data:ifaceInfo
        })
    }
    catch(error){
        return res.send({
            status:500,
            message:"Filed to get interface information!",
            error
        })
    }
}

const getNetplanInfo = async()=>{
    try{
        const netplanInfo = await netplanService()
        return res.send({
            status:200,
            message:"Netplan applied successfully!",
            data:netplanInfo
        })
    }
    catch(error){
        return res.send({
            status:500,
            message:"Netplan apply failed!",
            error
        })
    }
}


module.exports = {getInterfaceInfo,getNetplanInfo}