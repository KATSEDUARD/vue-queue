const { Queues } = require("../../models/queues");

const { ObjectId } = require("mongoose").Types;

const getQueue = async (req, res) => {
    const responseObj = {
        data: {},
        success: false,
        error: ""
    };

    try {
        const { id, userId } = req.query;

        if (!id || !userId) {
            responseObj.error = "Queue ID is missing!";
            return res.status(500).send(responseObj);
        }
        const queue = await Queues.findById(id).lean();
        responseObj.data = queue;
        responseObj.data.isUserInQueue = queue.membersIDs.some((val) => val.toString() === userId);
        responseObj.success = true;
        return res.status(200).send(responseObj);
    } catch (e) {
        console.log(`Error at getQueue: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return res.status(500).send(responseObj);
    }
};

module.exports = getQueue;
