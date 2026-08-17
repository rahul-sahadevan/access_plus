const runCommand = require("../../utils/runCommand")

const nginxReloadProvider = async()=>{
    try{

        const output = await runCommand("systemctl",["reload","nginx"])
        console.log(output,"nginx restart")

        return output

    }
    catch(error){
        console.log(error,message)
        return error.message
    }

}


module.exports = nginxReloadProvider