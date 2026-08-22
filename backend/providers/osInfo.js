const os = require("os")
const fs = require("fs/promises")


const osInfoProvider = async()=>{
    try{

        const staticInfo = {}
        // find os release, kernal release, disk space, uptime, processsor

        // 1 find os release
        const data = await fs.readFile("/etc/os-release",'utf8')
        const info = {}

        data.split("\n").forEach(line =>{
            if(!line.trim()) return 

            const [key,value] = line.split("=")
            info[key] = value.replace(/^"|"$/g, "");
        })

        // 2 find total RAM and free RAM

        const totalMemGb = (os.totalmem()/ (1024 * 1024 * 1024)).toFixed(2)
        const freeMemGb = (os.freemem()/ (1024 * 1024 * 1024)).toFixed(2)

        console.log(totalMemGb, freeMemGb)

        // find kernal version
        const kernalVersion = os.release()

        // find uptime
        const upTime = os.uptime()
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        return {
            osRelease: info.PRETTY_NAME,
            totalMemGb,
            freeMemGb,
            kernalVersion,
            uptime:{
                days,
                hours,
                minutes,
                seconds
            }
        }

    }
    catch(error){
        return error.message
    }
}

module.exports = {osInfoProvider}