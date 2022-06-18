
const auth = (req, res, next) => {
    if(req?.session?.username){
        req.session.resetMaxAge()
        next()
    }else{
        res.status(401).send("Unauthorized")
    }
}

export default auth