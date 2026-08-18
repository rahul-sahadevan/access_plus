const {spawn} = require("child_process")

const runCommand = (command,args)=>{
    return new Promise((resolve,reject)=>{
        const process = spawn(command,args)

        let stdout = ''
        let stderr = ''

        process.stdout.on("data",(data)=>{
            stdout += data
        })

        process.stderr.on("data",(data)=>{
            stderr += data
        })

        process.on("error",(error)=>{
            reject(error)
        })


        process.on("close",(code)=>{
            if(code === 0){
                resolve({
                    status:true,
                    message:'Command executed succesfully!',
                    data:stdout
                })
            }
            else{
                resolve({
                    status:false,
                    message:'Command execution failed!',
                    error:stderr
                })
            }
        })
    })
}

module.exports = runCommand