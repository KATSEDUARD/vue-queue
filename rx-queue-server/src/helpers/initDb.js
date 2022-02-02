const { ObjectId } = require("mongoose").Types;
const faker = require("faker");
const { Queues } = require("../models/queues");
const { Users } = require("../models/users");

const _USERS_OBJECT_IDS = [...Array(20)].map(() => new ObjectId());

const _USERS = _USERS_OBJECT_IDS.map((_id) => ({
    _id,
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: faker.internet.email()
}));

const _QUEUES = [...Array(20)].map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    img: faker.image.imageUrl(),
    maxMembers: 20,
    membersIDs: [...Array(10)].map(() => _USERS_OBJECT_IDS[Math.floor(Math.random() * _USERS_OBJECT_IDS.length)])
}));

module.exports = async () => {
    try {
        await Users.collection.drop();
        await Queues.collection.drop();
        await Users.insertMany([
            ..._USERS,
            {
                name: "TEST",
                surname: "TEST",
                email: "test@test.co"
            }
        ]);
        await Queues.insertMany(_QUEUES);
        console.info("Successful DB initialization.");
    } catch (e) {
        console.error(`Error while initializing the DB: ${e}`);
        console.error(e);
        process.exit(0);
    }
};
