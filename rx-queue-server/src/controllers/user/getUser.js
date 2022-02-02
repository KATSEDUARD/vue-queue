const { Users } = require("../../models/users");

const getUser = async (req, res) => {
    const responseObj = {
        data: {},
        success: false,
        error: ""
    };

    try {
        const { id } = req.query;

        if (!id) {
            responseObj.error = "User ID is missing!";
            return res.status(500).send(responseObj);
        }

        responseObj.data = await Users.findById(id);
        responseObj.success = true;
        return res.status(200).send(responseObj);
    } catch (e) {
        console.log(`Error at getUser: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return res.status(500).send(responseObj);
    }
};

module.exports = getUser;
