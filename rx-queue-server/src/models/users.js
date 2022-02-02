const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
    {
        name: { type: String, index: true, default: "John" },
        surname: { type: String, index: true, default: "Doe" },
        email: { type: String, index: true, default: "johndoe@mail.com" }
    },
    { collection: "users" }
);

module.exports.Users = mongoose.model("Users", UsersSchema);
