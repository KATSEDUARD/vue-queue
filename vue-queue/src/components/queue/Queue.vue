<template>
    <div style="margin-top: 25px; margin-bottom: 100px">
        <div class="center">
            <img width="1063" :alt="queue.name" :src="queue.img" />
            <div id="data-wrapper">
                <div class="data">
                    <h4 class="white-text">{{ queue.name }}</h4>
                    <p class="white-text">{{ queue.description }}</p>
                </div>
                <div class="action">
                    <button
                        v-show="!queue.isUserInQueue && queue.membersIDs.length < queue.maxMembers"
                        @click="join"
                        class="btn btn-large blue-grey lighten-2"
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
        <table style="margin-top: 50px" class="striped centered blue-grey lighten-2">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.user }}</td>
                    <td v-show="user.id === userId">
                        <button @click="leaveQueue" class="btn btn-small red lighten-1">Leave</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";

export default {
    data() {
        return {
            queue: {
                name: "",
                maxMembers: "",
                membersIDs: [],
                description: "",
                img: "",
                isUserInQueue: false
            },
            users: [],
            userId: localStorage.getItem("userId"),
            socket: io("http://localhost:3030", { query: `userId=${localStorage.getItem("userId")}` })
        };
    },
    async mounted() {
        await this.getQueue();
        this.getStatus();
        this.isSignedUp();
        const interval = setInterval(this.startQueue, 5000);
        return () => clearInterval(interval);
    },
    methods: {
        startQueue() {
            try {
                const data = {
                    queueId: this.$route.params.id
                };
                this.socket.emit("start-queue", JSON.stringify(data));
                this.getStatus();
            } catch (e) {
                console.log(e);
                return null;
            }
        },
        async leaveQueue() {
            const data = {
                userId: this.userId,
                queueId: this.$route.params.id
            };

            const { data: response } = await axios.delete(`http://localhost:3030/api/queue/user?data=${JSON.stringify(data)}`);

            if (response.success) {
                this.queue.isUserInQueue = false;
                this.getStatus();
                window.M.toast({ html: `<span class="black-text">You successfully left this queue.</span>`, classes: "red lighten-3" });
            } else {
                console.log(response.error);
            }
        },
        getStatus() {
            try {
                if (this.userId) {
                    this.socket.emit("get-status", { queueId: this.$route.params.id });
                    this.socket.on("status", ({ queue }) => {
                        if (!queue.data.length) {
                            this.queue.isUserInQueue = false;
                        }
                        this.users = queue.data;
                    });
                }
            } catch (e) {
                console.log(e);
                return null;
            }
        },
        async getQueue() {
            const { data: responseFromQueueCreation } = await axios.get(
                `http://localhost:3030/api/queue?id=${this.$route.params.id}&userId=${this.userId}`
            );
            this.queue = responseFromQueueCreation.data;
        },
        isSignedUp() {
            if (!this.$store.state.isSignedUp) {
                this.$router.push("/");
            }
        },
        async join() {
            const data = {
                userId: this.userId
            };

            const { data: responseFromQueueCreation } = await axios.post(
                `http://localhost:3030/api/queue/user?queueId=${this.$route.params.id}`,
                data
            );

            if (responseFromQueueCreation.success) {
                this.getStatus();
                this.queue.isUserInQueue = true;
                window.M.toast({ html: `<span class="black-text">You successfully joined this queue.</span>`, classes: "green lighten-3" });
            } else {
                console.error(responseFromQueueCreation.error);
            }
        }
    }
};
</script>

<style>
#data-wrapper {
    display: flex;
    justify-content: space-between;
}

#data-wrapper div {
    display: flex;
}

.data {
    flex-flow: column nowrap;
    text-align: left;
}

.action {
    justify-content: center;
    align-items: center;
}
</style>
