
const isAuthenticated = async(req,res,next)=>{
    try{
        const session_token = req.cookies.session_token
        if(!session_token){
            return res.send({
                status:401,
                message:"Please login first"
            })
        }

        next()


    }
    catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
}

module.exports = isAuthenticated