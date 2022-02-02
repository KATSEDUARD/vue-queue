const getUsers = require("./getUsers");
const getUser = require("./getUser");
const postAddUser = require("./postAddUser");

const user = {};

user.getUser = getUser;
user.getUsers = getUsers;
user.postAddUser = postAddUser;

module.exports = user;
