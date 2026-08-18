const dfhProvider = require("../providers/Logs/dfhProvider")
const dmesgProvider = require("../providers/Logs/dmesgProvider")
const journalLogProvider = require("../providers/Logs/journalLogProvider")
const runCommand = require("../utils/runCommand")


const systemLogService =  async({param})=>{
    try{
        let logInfo;
        if(param === "dfh"){
            logInfo = await dfhProvider()
        }
        if(param === "dmesg"){
            logInfo = await dmesgProvider()
        }
        if(param === "journal"){
            logInfo = await journalLogProvider()
        }
        return logInfo
    }
    catch(error){
        return error
    }
}


module.exports = {systemLogService}