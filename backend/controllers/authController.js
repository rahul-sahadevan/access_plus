const {userService,loginService,logoutService} = require("../services/authService")

const registerUser = async(req,res)=>{
    try{
        // call model function to create new user
        const newUser = await userService(req.body)
        return res.send({
            status:200,
            message:"User created successfully",
            data:newUser
        })

    }
    catch(error){
        console.log(error)
        return res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
}

// login user

const loginUser = async(req,res)=>{
    try{

        const loginUser = await loginService(req.body)
        console.log("login user details",loginUser)

        res.cookie("session_token",loginUser.session_token,{
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/"
        })

        return res.send({
            status:200,
            message:"User logged in succesfuly!",
        })

    }
    catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error: error.message
        })
    }
}

// logout user
const logoutUser = async(req,res)=>{

    try{
        const session_token = req.cookies.session_token

        // call function to remove the session_token from db
        const sessionRemovedFromDb = await logoutService({session_token})
        
        // clear the session token present in the browser cookie
        res.clearCookie("session_token",{
            httpOnly:true
        })

        return res.send(sessionRemovedFromDb)


    }
    catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
}
module.exports = {registerUser, loginUser,logoutUser}