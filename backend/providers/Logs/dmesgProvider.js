const runCommand = require("../../utils/runCommand")


const dmesgProvider = async()=>{
    try{

        const output = runCommand("dmesg",[])
        console.log(output,"dmesg log")

        return output

    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}

module.exports = dmesgProvider