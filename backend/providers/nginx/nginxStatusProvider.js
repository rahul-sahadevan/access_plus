const runCommand = require("../../utils/runCommand")

const nginxStatusProvider =  async()=>{
    try{
  
        const nginxStatus = await runCommand("systemctl",["show","nginx","--no-page","--property=ActiveState,SubState,MainPID,LoadState,UnitFileState"])
        console.log(nginxStatus)

        if(!nginxStatus.status){
            return {
                status:false,
                error:nginxStatus.stderr
            }
        }

        let output = {}
        nginxStatus.data
        .trim()
        .split("\n")
        .forEach(line => {
            const [key,...value] = line.split("=")
            output[key] = value.join("=")
        })

        console.log(output)


        return {
            status:true,
            service: "nginx",
            loadState: output.LoadState,
            activeState: output.ActiveState,
            subState: output.SubState,
            pid: Number(output.MainPID),
            enabled: output.UnitFileState === "enabled"
        }
    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}


module.exports = nginxStatusProvider