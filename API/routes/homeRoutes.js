const router = require("express").Router();
const { authorization } = require("../../middleware/authorization");
const {
    createHomeController,
    getAllHomesController,
    getOneHomeController,
} = require("../controllers/homeController");

router.get("/", getAllHomesController);

router.get("/:id", getOneHomeController);

router.post("/createhome", authorization, createHomeController);

// router.post("/delete/:id", authorization,);

module.exports = router;
