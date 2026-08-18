const interfaceProvider = require("../providers/interfaceProvider")



const interfaceService =  async()=>{
    try{
        const ifaceInfo = await interfaceProvider()
        console.log(ifaceInfo,"interface information")
        return ifaceInfo
    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}


module.exports = interfaceService