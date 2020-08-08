const User = require("./models/userModel");
const Home = require("./models/homeModel");

module.exports = {

    //User queries

    getUserByEmail: async (email) => await User.findOne({ email }),
    getUserById: async (id) => await User.findOne({ _id: id }),

    createUser: async (data) => {
        const user = await new User({ ...data });
        return await user.save();
    },

    updateUser: async (userId, userData) => {
        const result = await User.update({ _id: userId }, userData);
        return result;
    },

    //Home queries

    getAllHomes: async () => await Home.find(),

    getOneHome: async (id) => await Home.findOne({ _id: id }),

    createHome: async (data) => {
        const home = await new Home({ ...data });
        return await home.save();
    },

    updateHome: async (homeId, userData) => {
        const result = await Home.update({ _id: homeId }, userData);
        return result;
    },

    deleteHome: async (homeId) => {
        const result = await Home.deleteOne({ _id: homeId });
        return result;
    },

    getHomeByUser: async (userId) => {
        const result = await Home.find({ owner_id: userId });
        return result;
    },
};
