
const fs = require("fs/promises")
const yaml = require("yaml")
const {spawn, exec} = require("child_process")



// create a json netplan file for testing
const testNetplan = {
  "network": {
    "version": 2,
    "ethernets": {
      "eno1": {
        "dhcp4": true
      },
      "eno2": {
        "dhcp4": false,
        "dhcp6": false,
        "addresses": [
          "192.168.7.41/24"
        ],
        "nameservers": {
          "addresses": [
            "8.8.8.8",
            "8.8.4.4",
            "1.1.1.1"
          ]
        },
        "routes": [
          {
            "to": "default",
            "via": "192.168.7.1"
          }
        ]
      },
      "eno3": {
        "dhcp4": true
      },
      "eno4": {
        "dhcp4": true
      }
    }
  }
}

// function to run the commands
const runCommands = (command,args)=>{
  return new Promise((resolve,reject)=>{
    const process = spawn(command,args)

    let stdout = ''
    let stderr = ''
    let status = false

    process.stdout.on("data",(data)=>{
      stdout +=  data.toString()
    })
    process.stderr.on("data",(data)=>{
      stderr += data.toString()
    })

    process.on("error",(error)=>{
      console.log(error)
      reject(error)
    })

    process.on("close",(code)=>{
      if(code === 0){
        resolve({
          status:true,
          stderr,
          stdout
        })
      }
      else{
        resolve({
          status:false,
          stderr,
          stdout
        })
      }
    })

  })
}


const netplanProvider = async()=>{
    try{

      // read the netplan dir
        const readYaml = await fs.readdir("/etc/netplan")
        console.log(readYaml,"netplan directory")


        let netplanFile;

        // find the netplan file
        for(let i=0;i<readYaml.length;i++){
            if(readYaml[i].endsWith(".yaml")){
                netplanFile = readYaml[i]
                break
            }
        }
        console.log(netplanFile,"yaml file for netplan")
        if(!netplanFile){
          throw new Error ("Not able to finf netplan file")
        }

        // create a new directory to save the backup
        const backupDir = '/var/lib/access_plus/netplan-backup'
        const backupPath = `${backupDir}/${netplanFile}.bak`

        // create a backup dir
        await fs.mkdir(backupDir,{recursive:true})

        // copy the backup file to the original file =
        await fs.copyFile(`/etc/netplan/${netplanFile}`,backupPath)
  
        // get the json input from the user end
        // ip address,subnet,routes,dns - get all these form user end using form
        // convert the JSON file to yaml 
        const newNetplan = yaml.stringify(testNetplan)
        console.log(newNetplan,"modified netplan")



        // now write the new netplan file into /etc/netplan/
        const writeNetplan = await fs.writeFile(`/etc/netplan/${netplanFile}`,newNetplan,"utf-8")

        // now validate the netplan file----------------------------------------------
        const netplanGen = await runCommands("netplan",["generate"])
        if(!netplanGen.status){
          console.log(netplanGen.stderr)
          await fs.copyFile(backupPath,`/etc/netplan/${netplanFile}`)
          await runCommands("netplan",["apply"])
          return {
            status:false,
            stage:"generate",
            message:"Netplan validation failed",
            error:netplanGen.stderr
          }
        }


        // napply the netplan after validation ---------------------------------------
        const netplanApply = await runCommands("netplan",["apply"])
        if(!netplanApply.status){
          console.log(netplanApply.stderr)
          await fs.copyFile(backupPath,`/etc/netplan/${netplanFile}`)
          await runCommands("netplan",["apply"])
          return {
            status:false,
            stage:"apply",
            message:"Netplan apply failed",
            error:netplanApply.stderr
          }
        }

        return {
          status: 200,
          message:"Netplan applied succesfully!"
        }

    }
    catch(error){
        return error.message
    }
}


module.exports = netplanProvider