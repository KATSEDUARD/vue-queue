const getQueue = require("./getQueue");
const getQueues = require("./getQueues");
const postAddQueue = require("./postAddQueue");
const postAddUserToQueue = require("./postAddUserToQueue");
const deleteUserFromQueue = require("./deleteUserFromQueue");

const queue = {};

queue.getQueue = getQueue;
queue.getQueues = getQueues;
queue.postAddQueue = postAddQueue;
queue.postAddUserToQueue = postAddUserToQueue;
queue.deleteUserFromQueue = deleteUserFromQueue;

module.exports = queue;
