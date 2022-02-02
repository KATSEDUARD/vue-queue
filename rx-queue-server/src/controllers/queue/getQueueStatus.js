const { Queues } = require("../../models/queues");

const getQueueStatus = async (id) => {
    const responseObj = {
        data: [],
        success: false,
        error: ""
    };

    try {
        if (!id) {
            responseObj.error = "Queue ID is missing!";
            return responseObj;
        }

        const queuePopulated = await Queues.findById(id.queueId, { membersIDs: true }).populate("membersIDs");

        responseObj.data = queuePopulated.membersIDs.reduce((acc, val) => [...acc, {id: val._id, user: `${val.name} ${val.surname}`}], []);
        responseObj.success = true;
        return responseObj;
    } catch (e) {
        console.log(`Error at getQueueStatus: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return responseObj;
    }
};

module.exports = getQueueStatus;
