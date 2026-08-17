const runCommand = require("../../utils/runCommand")


const journalLogProvider = async()=>{
    try{

        const output = runCommand("journalctl",["-n","100"])
        console.log(output,"journal log")

        return output

    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}

module.exports = journalLogProvider