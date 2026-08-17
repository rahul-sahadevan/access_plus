const cron = require("node-cron")
const pool = require("../db")


const sessionCron  = ()=>{

    cron.schedule("0 1 * * * *",async()=>{
        try{ 
            await pool.query("DELETE FROM login_entries WHERE expired_at < NOW() RETURNING *")
            console.log("Session got expired!")

        }
        catch(error){
            return error.message
        }
    })
}

module.exports = sessionCron