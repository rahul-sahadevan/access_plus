const pool = require("../db")

const createUser = async({email,username,password})=>{
    console.log(email,username,password)
    try{
        // add the user to db
        const addUser = await pool.query("INSERT INTO user_entries(email,username,password) VALUES($1,$2,$3) RETURNING *",[email,username,password])
        console.log(addUser.rows[0])
        return addUser.rows[0]
    }
    catch(error){
        console.log(error)
        return error
    }
}

const isUserExists = async({userId,password})=>{
    try{
        const userDb = await pool.query("SELECT * FROM user_entries  WHERE email = $1 OR username = $1 ",[userId])
        return userDb.rows[0]
    }
    catch(error){
        return error.message
    }
}   


const addLoginToDb = async({session_token,userId})=>{
    console.log(session_token,"session_token for db")
    try{
        const addLogin = await pool.query("INSERT INTO login_entries(session_token,user_id) VALUES($1,$2) RETURNING *",[session_token,userId])
        return addLogin.rows[0]
    }
    catch(error){
        return error.message
    }
}

const logoutSession = async({session_token})=>{
    try{

        if(!session_token){
            return "session is not present"
        }

        const removeSessionFromDb = await pool.query("DELETE FROM login_entries WHERE session_token=$1 RETURNING *",[session_token])
        console.log(removeSessionFromDb.rows[0])
        return removeSessionFromDb.rows[0]
    }
    catch(error){
        return error.message
    }
}




module.exports = {createUser,isUserExists,addLoginToDb,logoutSession}