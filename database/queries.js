const User = require("./models/userModel");
const Home = require("./models/homeModel");

module.exports = {
    getUserByEmail: async (email) => await User.findOne({ email }),

    createUser: async (data) => {
        const user = await new User({ ...data });
        return await user.save();
    },

    getAllHomes: async () => await Home.find(),

    getOneHome: async (id) => await Home.findOne({ _id: id }),

    createHome: async (data) => {
        const home = await new Home({ ...data });
        return await home.save();
    },
};
