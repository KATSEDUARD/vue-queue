const { Queues } = require("../../models/queues");

const deleteUserFromQueue = async (req, res) => {
    const responseObj = {
        success: false,
        error: ""
    };

    try {
        const { data } = req.query;
        const { queueId, userId } = JSON.parse(data);

        if (!queueId || !userId) {
            responseObj.error = "Parameters are missing!";
            return res.status(500).send(responseObj);
        }

        const queue = await Queues.findById(queueId);

        await Queues.updateOne(
            { _id: queueId },
            {
                $set: {
                    membersIDs: queue.membersIDs.filter(value => value.toString() !== userId)
                }
            }
        )

        responseObj.success = true;
        return res.status(200).send(responseObj);
    } catch (e) {
        console.log(`Error at deleteUserFromQueue: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return res.status(500).send(responseObj);
    }
};

module.exports = deleteUserFromQueue;
