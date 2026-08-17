const runCommand = require("../../utils/runCommand")


const nginxTestProvider = async()=>{
    try{
        const output = await runCommand("nginx",["-t"])
        console.log(output)

        return output
    }
    catch(error){
        console.log(error.message)
        return error
    }
}

module.exports = nginxTestProvider