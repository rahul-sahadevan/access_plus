const interfaceService = require("../services/interfaceService")
const {netplanService,readNetplanService} = require("../services/netplanService")


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

const getNetplanInfo = async(req,res)=>{
    const netplanDetails = req.body
    try{
        const netplanInfo = await netplanService({netplanDetails})
        if(!netplanInfo.status){
            return res.send({
                status:500,
                message:"Netplan configuration failed!",
                data:netplanInfo
            })
        }
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

const readNetplanFile = async(req,res)=>{
    try{   
        const readNetplan = await readNetplanService()
        return res.send({
            status:200,
            message:"Netplan file read successful",
            data:readNetplan
        })
    }
    catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
}


module.exports = {getInterfaceInfo,getNetplanInfo,readNetplanFile}