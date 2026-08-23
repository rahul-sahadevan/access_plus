const nginxStatusProvider = require("../providers/nginx/nginxStatusProvider")



const nginxStatusService  = async()=>{
    try{

        const nginxStatus =  await nginxStatusProvider()
        console.log(nginxStatus)
        return nginxStatus

    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}



module.exports = {nginxStatusService}