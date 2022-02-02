const { Queues } = require("../../models/queues");

const postAddUserToQueue = async (req, res) => {
    const responseObj = {
        success: false,
        error: ""
    };

    try {
        const { queueId } = req.query;
        const { userId } = req.body;

        if (!userId || !queueId) {
            responseObj.error = "Parameters are missing!";
            return res.status(500).send(responseObj);
        }

        await Queues.findByIdAndUpdate(queueId, { $push: { membersIDs: userId } });
        responseObj.success = true;
        return res.status(200).send(responseObj);
    } catch (e) {
        console.log(`Error at postAddUserToQueue: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return res.status(500).send(responseObj);
    }
};

module.exports = postAddUserToQueue;
