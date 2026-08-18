const netplanProvider = require("../providers/netplanProvider")



const netplanService = async()=>{
    try{
        const netplanInfo = await netplanProvider()
        return netplanInfo
    }
    catch(error){
        return error
    }
}


module.exports = netplanService