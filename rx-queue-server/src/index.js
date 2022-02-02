require("dotenv").config();
require("./helpers/connectionDB")();
require("./helpers/initDb")();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routesApi = require("./routes");
const getQueueStatus = require("./controllers/queue/getQueueStatus");
const { Queues } = require("./models/queues");

const server = express();

server.use(cors());
server.use(bodyParser.json({ limit: "20mb" }));
server.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
server.use("/api", routesApi);

server.use((_, res) => {
    res.status(404);
    res.json({ message: "404 - Not Found" });
});

const http = require("http").Server(server);
const io = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
});
const PORT = process.env.PORT;

io.on("connection", (socket) => {
    try {
        console.log("A user connected.");

        socket.on("get-status", async (queueId) => {
            socket.emit("status", { queue: await getQueueStatus(queueId) });
        });

        socket.on("start-queue", async (data) => {
            console.log(data)
            try {
                const { queueId } = JSON.parse(data);

                if (!queueId) {
                    return null;
                }

                const queue = await Queues.findById(queueId);

                if(!queue.membersIDs.length) {
                    return null;
                }

                await Queues.updateOne(
                    { _id: queueId },
                    {
                        $set: {
                            membersIDs: queue.membersIDs.slice(1)
                        }
                    }
                )
            } catch (e) {
                console.log(`Error at deleteUserFromQueue: ${e}`);
                console.log(e);
                return null;
            }
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });

        socket.on("error", (error) => {
            console.log(socket.id + ":" + error);
        });
    } catch (e) {
        console.log(`Error with Socket.io: ${e}`);
        console.log(e);
    }
});
http.listen(PORT, () => console.log(`REST API server is listening on port ${PORT}`));
