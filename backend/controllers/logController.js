
const {systemLogService} = require("../services/logService")

const getLogInformation = async(req,res)=>{
    const param = req.param
    console.log(param,"param for log")
    try{
       // check the which system log user requesting
       const findLog = await systemLogService({param})
        if(!findLog.status){
            return res.send({
                status:400,
                message:"Failed to get log!",
                data:findLog.stderr
            })
        }

        return{
            status:200,
            message:"Log retrieved successfully!",
            data:findLog.stdout
        }
    }
    catch(error){
        return res.send({
            status:500,
            message:"Filed to get system logs!",
            error
        })
    }
}


module.exports = {getLogInformation}