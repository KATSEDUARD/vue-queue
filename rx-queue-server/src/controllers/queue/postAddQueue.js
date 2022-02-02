const { Queues } = require("../../models/queues");

const postAddQueue = async (req, res) => {
    const responseObj = {
        success: false,
        error: ""
    };

    try {
        const { name, description, img, maxMembers, userId } = req.body;

        if (!name || !img || !description || !maxMembers || maxMembers < 2 || !userId) {
            responseObj.error = "Parameters are missing!";
            return res.status(500).send(responseObj);
        }

        responseObj.data = await Queues.create({ name, description, img, maxMembers, membersIDs: [userId] });
        responseObj.success = true;
        return res.status(200).send(responseObj);
    } catch (e) {
        console.log(`Error at postAddQueue: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return res.status(500).send(responseObj);
    }
};

module.exports = postAddQueue;
