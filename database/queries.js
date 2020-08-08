const User = require("./models/userModel");
const Home = require("./models/homeModel");

module.exports = {
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


    getAllHomes: async () => await Home.find(),

    getOneHome: async (id) => await Home.findOne({ _id: id }),

    createHome: async (data) => {
        const home = await new Home({ ...data });
        return await home.save();
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
