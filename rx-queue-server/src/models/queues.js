const mongoose = require("mongoose");

const QueuesSchema = mongoose.Schema(
    {
        name: { type: String, index: true, unique: false, default: "Test queue" },
        description: { type: String, index: true, default: "Try out now!" },
        img: { type: String, index: true, default: "https://via.placeholder.com/1280x300" },
        maxMembers: { type: String, index: true, default: "Try out now!" },
        membersIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users", index: true, default: [] }]
    },
    { collection: "queues" }
);

module.exports.Queues = mongoose.model("Queues", QueuesSchema);
