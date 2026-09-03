const os = require("os")


const cpuProvider = async()=>{
    try{

        const data = os.cpus()
        let cpuModel = data[0].model
        let totalUsage = 0
        let idleValue = 0
        let cpuCore  = data.length

        data.forEach(cpu =>{

            let {times} = cpu
            console.log(times)
            const {user,nice,sys,irq,idle} = times

            // add the user,nice,sys,irq to fine the total usage
            totalUsage += user + nice + sys + irq + idle
            idleValue += idle

        })


        console.log(totalUsage,idleValue)

        return {
            cpuModel,
            totalUsage,
            idleValue,
            cpuCore
        }

    }
    catch(error){
        return error.message
    }
}

module.exports = cpuProvider