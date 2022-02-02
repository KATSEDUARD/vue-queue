<template>
    <div>
        <ul ref="queueInstance" class="collapsible expandable z-depth-4">
            <vue-queue-item
                v-for="queue in filteredQueues"
                :key="queue._id"
                :id="queue._id"
                :name="queue.name"
                :members="queue.membersIDs.length"
                :maxmembers="queue.maxMembers"
                :description="queue.description"
            ></vue-queue-item>
        </ul>
        <div class="center">
            <a href="#create-queue" class="waves-effect waves-dark blue-grey lighten-2 btn-large modal-trigger"
                ><i class="material-icons left">add</i>Create New Queue</a
            >
        </div>
        <vue-create-queue id="create-queue" :getQueues="getAllQueues"></vue-create-queue>
        <vue-sign-up id="sign-up"></vue-sign-up>
    </div>
</template>

<script>
import QueueItem from "./QueueItem.vue";
import CreateQueue from "./CreateQueue.vue";
import SignUpModal from "../account/SignUpModal";
import axios from "axios";

export default {
    components: {
        VueQueueItem: QueueItem,
        VueSignUp: SignUpModal,
        VueCreateQueue: CreateQueue
    },
    async mounted() {
        window.M.Collapsible.init(this.$refs["queueInstance"], {
            accordion: false
        });
        window.M.Modal.init(document.getElementById("create-queue"));
        window.M.Modal.init(document.getElementById("sign-up"));
        await Promise.all([...Array(2).keys()].map((val) => this.getAllQueues(+val * 50, (+val + 1) * 50)));
    },
    methods: {
        async getAllQueues(skip = 0, limit = 50) {
            const { data: responseFromQueueCreation } = await axios.get(`http://localhost:3030/api/queue/all?skip=${skip}&limit=${limit}`);
            this.queues = [...this.queues, ...responseFromQueueCreation.data];
            this.$store.state.queues = this.queues;
        }
    },
    computed: {
        filteredQueues() {
            if (this.$store.state.filteredQueues.length < 1) {
                return this.$store.state.queues;
            } else {
                return this.$store.state.filteredQueues;
            }
        }
    },
    data() {
        return {
            queues: []
        };
    }
};
</script>

<style scoped>
ul {
    border: none;
}
</style>
