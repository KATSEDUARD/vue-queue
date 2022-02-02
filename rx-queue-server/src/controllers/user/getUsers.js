const { Users } = require("../../models/users");

const getUsers = async (req, res) => {
    const responseObj = {
        data: [],
        success: false,
        error: ""
    };

    try {
        responseObj.data = await Users.find();
        responseObj.success = true;
        return res.status(200).send(responseObj);
    } catch (e) {
        console.log(`Error at getUsers: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return res.status(500).send(responseObj);
    }
};

module.exports = getUsers;
