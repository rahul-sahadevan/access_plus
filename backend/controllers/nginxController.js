const nginxReloadProvider = require("../providers/nginx/nginxReloadProvider")
const nginxRestartProvider = require("../providers/nginx/nginxRestartProvider")
const nginxStartProvider = require("../providers/nginx/nginxStartProvider")
const nginxStopProvider = require("../providers/nginx/nginxStopProvider")
const nginxTestProvider = require("../providers/nginx/nginxTestProvider")
const { nginxStatusService } = require("../services/nginxService")

const successResp = {
    status:200,
    message:"Nginx oepration performed succssfully!"
}

// get nginx status
const getNginxStatus =  async(req,res)=>{
    try{
        const nginxStatus = await nginxStatusService()
        if(!nginxStatus.status){
            return res.send({
                status:500,
                message:"Nginx service failed",
                data:nginxStatus
            })
        }

        return res.send({
            status:200,
            message:"Nginx status retrieved succesfully!",
            data:nginxStatus
        })

    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}

// nginx operations

const performNginxOp = async (req,res)=>{
    const operation = req.query.op
    try{
        if(operation === "reload"){
            await nginxReloadProvider()
            return res.send(successResp)
        }

        if(operation === "restart"){
            await nginxRestartProvider()
            return res.send(successResp)
        }
        if(operation === "stop"){
            await nginxStopProvider()
            return res.send(successResp)
        }
        if(operation === "start"){
            await nginxStartProvider()
            return res.send(successResp)
        }
        if(operation === "test"){
            const nginxTest = await nginxTestProvider()
            return res.send({
                status:200,
                message:"Nginx test done succesfully",
                data:nginxTest.err
            })
        }

    }
    catch(error){
        return res.send({
            status:500,
            message:`Nginx ${operation} operation failed`,
            error
        })
    }
}



module.exports = {getNginxStatus,performNginxOp}