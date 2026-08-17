const validator = require("validator")
const bcrypt = require("bcrypt")
const {createUser,isUserExists,addLoginToDb,logoutSession} = require("../models/userModel")
const crypto = require("crypto")

const userService = async({email,username,password})=>{
    try{
        // validate the inputs
        if(!email || !username || !password){
            return {status:400,message:"All fields are required"}
        }
        if(!validator.isEmail(email)){
            return {status:400,message:"Invalid email format"}
        }
        if(!validator.isLength(username,{min:3,max:50})){
            return {status:400,message:"Username must be between 3 and 50 characters"}
        }
        if(!validator.isLength(password,{min:6,max:50})){
            return {status:400,message:"Password must be between 6 and 50 characters"}
        }

        // create a hashed password
        const bcryptPassword = await bcrypt.hash(password,10)

        // create a new user object
        const newUser = {
            email,
            username,
            password:bcryptPassword
        }

        // add the user to database
        const userDb = await createUser(newUser)

        return {
            status:201,
            message:"User created succesfully",
            data:userDb
        }

    }
    catch(error){
        return error
    }
}


// login service function
const loginService = async({userId,password})=>{
    console.log(userId,password, "user details for login")
    try{

        if(!userId || !password){
            return {
                status:400,
                message:"All fields are required"
            }
        }

        // find the user from the database
        const userEntryCheck = await isUserExists({userId,password})
        if(!userEntryCheck){
            return {
                status:404,
                message:"User not found"
            }
        }

        console.log(userEntryCheck, "user entry check")

        // check the username and password is matching or not
        const isPasswordMatch = await bcrypt.compare(password,userEntryCheck.password)
        if(!isPasswordMatch){
            return {
                status:401,
                message:"Invalid credentials"
            }
        }

        // if username and password is matching, create a session for the user login
        // create session token using crypto module
        const session_token = crypto.randomUUID()

        // add the login details to db
        const loginDetails = await addLoginToDb({session_token,userId:userEntryCheck.user_id})

        if(!loginDetails){
            return {
                status: 500,
                message:"Internal server error",
            }
        }
        

        return {session_token}

        
    }
    catch(error){
        return error
    }
}


// logout user service
const logoutService = async({session_token})=>{
    try{

        if(!session_token){
            return {
                status:400,
                message:"Session not found, Please login"
            }
        }
        console.log(session_token,"session token from cookies")

        // remove the session token entry from db
        const removeUserFromDb = await logoutSession({session_token})

        return {
            status:201,
            message:"Logout successfull"
        }
    }
    catch(error){
        return error.message
    }
}

module.exports = {userService,loginService,logoutService}