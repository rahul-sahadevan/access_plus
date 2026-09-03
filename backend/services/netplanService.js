const {netplanProvider,readNetplanProvider} = require("../providers/netplanProvider")



const netplanService = async({netplanDetails})=>{
    try{
        const netplanInfo = await netplanProvider({netplanDetails})
        return netplanInfo
    }
    catch(error){
        return error
    }
}
const readNetplanService = async()=>{
    try{
        // call the provider
        const netplan = await readNetplanProvider()
        return netplan

    }
    catch(error){
        return error
    }
}


module.exports = {netplanService,readNetplanService}