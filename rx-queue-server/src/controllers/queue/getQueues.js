const { Queues } = require("../../models/queues");

const getQueues = async (req, res) => {
    const responseObj = {
        data: [],
        success: false,
        error: ""
    };

    try {
        let { skip, limit } = req.query;

        if (!+skip) {
            skip = 0;
        }
        if (!+limit) {
            limit = 10;
        }

        responseObj.data = await Queues.find().populate("membersIDs").skip(+skip).limit(+limit);
        responseObj.success = true;
        return res.status(200).send(responseObj);
    } catch (e) {
        console.log(`Error at getQueues: ${e}`);
        console.log(e);
        responseObj.error = "Something went wrong!";
        return res.status(500).send(responseObj);
    }
};

module.exports = getQueues;
