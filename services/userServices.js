const Query = require("../database/queries");
const helpMethods = require("../helpers");

// #########################################################################
// Login Service.
exports.loginService = async (data) => {
    try {
        const user = await Query.getUserByEmail(data.email);
        if (!user) throw new Error("User does not exist. Please register.");

        const isPassMatch = await helpMethods.checkPassword(
            data.password,
            user.password
        );
        if (!isPassMatch)
            throw new Error("Invalid credentials. Please login again.");

        user.password = undefined;
        const token = await helpMethods.createJWT(user._id);

        return { user, token };
    } catch (error) {
        console.log("ErrorIn: LoginService :", error);
        return { error: error.message };
    }
};

// ##########################################################################
// Register Service
module.exports.registerService = async (data) => {
    try {
        const existingUser = await Query.getUserByEmail(data.email);
        if (existingUser) throw new Error("User already exist. Please login.");

        data.password = await helpMethods.hashPassword(data.password);

        const newUser = await Query.createUser(data);
        newUser.password = undefined;

        const token = await helpMethods.createJWT(newUser._id);

        return { user: newUser, token };
    } catch (error) {
        console.log("ErrorIn: RegisterService :", error);
        return { error: error.message };
    }
};
