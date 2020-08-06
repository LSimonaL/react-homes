const {
    loginService,
    registerService,
} = require("../../services/userServices");

module.exports.loginController = async (req, res) => {
    try {
        // const errors = validateData(req);
        // if (!errors.isEmpty())
        //   return res.status(400).send({ errors: errors.array() });
        const result = await loginService(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.registerController = async (req, res) => {
    try {
        // const errors = validateData(req);
        // if (!errors.isEmpty())
        //   return res.status(400).send({ errors: errors.array() });
        const result = await registerService(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};