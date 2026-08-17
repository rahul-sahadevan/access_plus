const runCommand = require("../../utils/runCommand")

const nginxRestartProvider = async()=>{
    try{

        const output = await runCommand("systemctl",["restart","nginx"])
        console.log(output,"nginx restart")

        return output

    }
    catch(error){
        console.log(error,message)
        return error.message
    }

}


module.exports = nginxRestartProvider