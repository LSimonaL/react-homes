const JWT = require("jsonwebtoken");
const mime = require("mime-types");
const bcrypt = require("bcrypt");
const { v1: uuidV1 } = require("uuid");
const { jwtSecret, port } = require("../config");
const { check, validationResult } = require("express-validator");

module.exports.createJWT = async (userid) => {
    const payload = { id: userid };
    return await JWT.sign(payload, jwtSecret, { expiresIn: 360000 });
};

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports.checkPassword = async (password, hashPassword) =>
    await bcrypt.compare(password, hashPassword);

module.exports.registerValidationFields = [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check(
        "password",
        "Please enter password with 4 or more charecters"
    ).isLength({ min: 4 }),
];

module.exports.loginValidationFields = [
    check("email", "Please enter valid email").isEmail(),
    check(
        "password",
        "Please enter password with 4 or more charecters"
    ).isLength({ min: 4 }),
];

module.exports.validateData = (data) => validationResult(data);

module.exports.getImageName = (image) => {
    const ext = mime.extension(image.mimetype);
    return uuidV1() + "." + ext;
};

module.exports.moveImage = (image, name) => {
    image.mv(__dirname + "/../images/" + name, (err) => {
        if (err) throw new Error(`Image cannot move. ${err}`);
    });
};

module.exports.createImageLink = (imagename) =>
    `http://localhost:${port}/${imagename}`;
