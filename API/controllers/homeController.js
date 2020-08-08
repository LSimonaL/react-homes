const {
    getAllHomesService,
    getOneHomeService,
    createHomeService,
    deleteHomeService
} = require("../../services/homeService");

module.exports.getAllHomesController = async (req, res) => {
    try {
        const result = await getAllHomesService();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.getOneHomeController = async (req, res) => {
    try {
        const result = await getOneHomeService(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.createHomeController = async (req, res) => {
    try {
        if (req.err) throw new Error(req.err);
        const homeData = { ...req.body, owner_id: req.owner_id };
        const { images } = req.files;

        const result = await createHomeService(homeData, images);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports.deleteHomeControler = async (req, res) => {
    try {
        if (req.err) throw new Error(req.err);

        const result = await deleteHomeService(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

