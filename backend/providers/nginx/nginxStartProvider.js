const runCommand = require("../../utils/runCommand")

const nginxStartProvider = async()=>{
    try{

        const output = await runCommand("systemctl",["start","nginx"])
        console.log(output,"nginx start")
        
        return output
    }
    catch(error){
        console.log(error,message)
        return error.message
    }

}


module.exports = nginxStartProvider