const runCommand = require("../../utils/runCommand")

const nginxStopProvider = async()=>{
    try{

        const output = await runCommand("systemctl",["stop","nginx"])
        console.log(output,"nginx restart")

        return output

    }
    catch(error){
        console.log(error,message)
        return error.message
    }

}


module.exports = nginxStopProvider