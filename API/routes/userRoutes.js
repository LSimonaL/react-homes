const router = require("express").Router();
const {
    registerValidationFields,
    loginValidationFields,
} = require("../../helpers");
const {
    loginController,
    registerController,
} = require("../controllers/userControllers");

// ####################################################################

router.post("/login", loginValidationFields, loginController);

router.post("/register", registerValidationFields, registerController);

module.exports = router;