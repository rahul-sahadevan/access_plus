const runCommand = require("../../utils/runCommand")


const dfhProvider = async()=>{
    try{

        const output = runCommand("df",["-h"])
        console.log(output,"df -h")

        return output

    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}

module.exports = dfhProvider