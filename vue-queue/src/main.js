import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import "materialize-css/dist/css/materialize.css";
import "materialize-css";
import { createStore } from "vuex";

import Queue from "./components/queue/Queue.vue";
import QueueList from "./components/queue/QueueList.vue";
import Help from "./components/help/Help.vue";

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/:id", component: Queue },
        { path: "/", component: QueueList },
        { path: "/help", component: Help }
    ]
});

const store = createStore({
    state() {
        return {
            queues: [],
            filteredQueues: [],
            isSignedUp: localStorage.getItem("userId"),
            showRefresh: false
        };
    }
});

app.use(store);

app.use(router);

app.mount("#app");
