const Query = require("../database/queries");
const helperMethods = require("../helpers");

module.exports.getAllHomesService = async () => {
    try {
        const results = await Query.getAllHomes();
        return results;
    } catch (error) {
        console.log("ErrorIn: getAllHomeService :", error);
        return error.message;
    }
};

module.exports.getOneHomeService = async (id) => {
    try {
        const results = await Query.getOneHome(id);
        return results;
    } catch (error) {
        console.log("ErrorIn: getAllHomeService :", error);
        return error.message;
    }
};

module.exports.createHomeService = async (homeData, images) => {
    try {
        homeData.images = images.map((image) => {
            const imageName = helperMethods.getImageName(image);
            helperMethods.moveImage(image, imageName);
            let imageLink = helperMethods.createImageLink(imageName);
            return { imageLink };
        });
        const results = await Query.createHome(homeData);
        return { message: "Home profile created successfully", homeData: results };
    } catch (error) {
        console.log("ErrorIn: CreateHomeService :", error);
        return error.message;
    }
};

module.exports.updateHomeService = async (homeData, homeId) => {
    try {
        const home = await Query.getOneHome(homeId);
        if (!home) throw new Error("Home not found");
        await Query.updateHome(homeId, homeData);
        return { data: "home updated succesfully" }
    } catch (error) {
        console.log("ErrorIn: updateHomeService :", error);
        return { error: error.message };
    }
};

module.exports.deleteHomeService = async (homeId) => {
    try {
        await Query.deleteHome(homeId);
        return { message: "housing deleted successfully" };
    } catch (error) {
        console.log("ErrorIn: deleteHomeService :", error);
        return error.message;
    }
};
