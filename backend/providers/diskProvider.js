const fs = require("fs/promises")
const {spawn} = require("child_process")
const runCommand = require("../utils/runCommand")


const diskProvider  = async()=>{
    try{

        const diskInfo = await runCommand("df",["-h"])
        if(!diskInfo.status){
            return diskInfo.error
        }

        return diskInfo

    } 
    catch(error){
        return error.message
    }
}

module.exports = diskProvider