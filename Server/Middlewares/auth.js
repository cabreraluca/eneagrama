const jwt = require("../../Utils/jwt");

function auth(req, res, next) {
    if(!req.headers.authorization){
        res.status(403).send({msg: 'Token Invalido'})
    }

    const token = req.headers.authorization;

    try {
        const payload = jwt.decoded(token);

        const {exp} = payload;
        const currentData = new Date().getTime();

        if (exp <= currentData) {
            res.status(400).send({msg: "Sesión expirada"})
        }
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send({msg: "Token invalido"});
    }
}

module.exports =  {
    auth
}