const fs = require("fs/promises")
const {spawn} = require("child_process")


const diskProvider  = async()=>{
    try{

        return new Promise((resolve, reject) => {
            const output = spawn("df",["-h"])
    
            let stdout = ""
            let stderr = ""
    
            output.stdout.on("data",(data)=>{
                stdout +=  data.toString()
            })
    
            output.stderr.on("data",(data)=>{
                stderr += data.toString()
            })
    
            console.log(stdout)
    
            output.on("close",(code)=>{
                if(code === 0){
                    resolve(stdout)
                }
                else{
                    reject(stderr)
                }
            })
            

            process.on("error",reject)
        })

    } 
    catch(error){
        return error.message
    }
}

module.exports = diskProvider