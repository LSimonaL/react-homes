const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

module.exports.authorization = (req, res, next) => {
    const token = req.header("auth-token");
    try {
        if (!token) throw new Error();

        const decode = jwt.verify(token, jwtSecret);
        req.owner_id = decode.id;

        next();
    } catch (error) {
        req.err = "Authorizaiton denied, please login and try again.";
        next();
    }
};
