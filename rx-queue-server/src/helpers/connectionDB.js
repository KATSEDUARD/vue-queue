const mongoose = require("mongoose");

const mongooseConnect = () => {
    mongoose.connect("mongodb://localhost:27017/RP").then(
        () => {
            console.info("Mongo successfully connected");
            const { connection } = mongoose;
            connection.on("error", (error) => {
                console.error(`Mongo error: ${error}`);
            });
            connection.on("disconnected", () => {
                console.error("Mongo disconnected");
                process.exit(1);
            });
        },
        (err) => {
            if (err) {
                console.log(`Mongo connection error ${err}`);
                process.exit(1);
            }
        }
    );
};

module.exports = mongooseConnect;
