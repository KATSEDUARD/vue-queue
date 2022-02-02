const { Users } = require("../../models/users");

const postAddUser = async (req, res) => {
    const responseObj = {
        data: {},
        success: false,
        error: ""
    };
    try {
        const { name, surname, email } = req.body;

        if (!name || !surname || !email) {
            responseObj.error = "Parameters are missing!";
            return res.status(500).send(responseObj);
        }

        const searchedUser = await Users.findOne({ name, surname, email });
        
        if (searchedUser) {
            responseObj.data.userId = searchedUser._id;
            responseObj.success = true;
            return res.status(200).send(responseObj);
        }

        const newUser = await Users.create({ name, surname, email });
        responseObj.data.userId = newUser._id;
        responseObj.success = true;
        return res.status(200).send(responseObj);
    } catch (e) {
        console.log(`Error at postAddUser: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return res.status(500).send(responseObj);
    }
};

module.exports = postAddUser;
