const router = require("express").Router();
const { authorization } = require("../../middleware/authorization");

const {
    registerValidationFields,
    loginValidationFields,
} = require("../../helpers");
const {
    loginController,
    registerController,
    updateController,
    loaduserController,
    myhomesController
} = require("../controllers/userControllers");

// ####################################################################

router.post("/login", loginValidationFields, loginController);

router.post("/register", registerValidationFields, registerController);

router.put("/update", authorization, updateController);

router.get("/loaduser", authorization, loaduserController);

router.get("/myhomes", authorization, myhomesController);

module.exports = router;