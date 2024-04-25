export default {
    checkSecret: (req,res,next) => {
        if (req.headers["authorization"] && process.env.secret === req.headers["authorization"]) {
            return next()
        } else {
            return res.status(401).json({
                status: 401,
                message: "You are not authorized to perform this action"
            })
        }
    }
}