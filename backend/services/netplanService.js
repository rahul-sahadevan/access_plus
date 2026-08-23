const netplanProvider = require("../providers/netplanProvider")



const netplanService = async({netplanDetails})=>{
    try{
        const netplanInfo = await netplanProvider({netplanDetails})
        return netplanInfo
    }
    catch(error){
        return error
    }
}


module.exports = netplanService