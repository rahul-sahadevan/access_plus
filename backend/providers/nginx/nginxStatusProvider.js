const rumCommand = require("../../utils/runCommand")

const nginxProvider =  async()=>{
    try{
  
        const nginxStatus = await runCommand("systemctl",["status","nginx"])
        console.log(nginxStatus)

        return nginxStatus
    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}


module.exports = nginxProvider