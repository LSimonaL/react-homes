const router = require("express").Router();
const { authorization } = require("../../middleware/authorization");
const {
    createHomeController,
    getAllHomesController,
    getOneHomeController,
    deleteHomeControler,
    updateHomeController
} = require("../controllers/homeController");

router.get("/", getAllHomesController);

router.get("/:id", getOneHomeController);

router.post("/createhome", authorization, createHomeController);

router.put("/update/:id", authorization, updateHomeController);

router.delete("/delete/:id", authorization, deleteHomeControler);


module.exports = router;
