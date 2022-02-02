<template>
    <div>
        <div :id="id" class="modal blue-grey darken-4 white-text">
            <div class="modal-content">
                <h5 class="center">Create New Queue</h5>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <input v-model="Queue.name" id="name" type="text" class="white-text" />
                                <label for="name">Name</label>
                            </div>
                            <div class="input-field col s12">
                                <input v-model="Queue.description" id="description" type="text" class="white-text" />
                                <label for="description">Description</label>
                            </div>
                            <div class="input-field col s12">
                                <input v-model="Queue.img" id="img" type="text" class="white-text" />
                                <label for="img">Image URL</label>
                            </div>
                            <div class="input-field col s12">
                                <input v-model.number="Queue.maxMembers" id="members" type="number" min="2" class="white-text" />
                                <label for="members">Max Members</label>
                            </div>
                        </div>
                        <div class="center">
                            <button @click.prevent="create()" class="btn btn-large blue-grey darken-1 white-text center">
                                Create Queue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer blue-grey darken-1">
                <a href="#" class="modal-close waves-effect white-text waves-dark btn-flat">Close</a>
            </div>
        </div>
        <vue-sign-up-modal id="sign-up"></vue-sign-up-modal>
    </div>
</template>

<script>
import axios from "axios";
import SignUpModal from "../account/SignUpModal.vue";

export default {
    props: ["id", "getQueues"],
    components: {
        VueSignUpModal: SignUpModal
    },
    data() {
        return {
            Queue: {
                id: "",
                name: "",
                description: "",
                img: "",
                maxMembers: null,
                members: 0
            },
            err: ""
        };
    },
    methods: {
        cleanFields() {
            this.Queue.name = "";
            this.Queue.description = "";
            this.Queue.img = "";
            this.Queue.maxMembers = 0;
        },
        openModal() {
            const modal = window.M.Modal.getInstance(document.getElementById("sign-up"));
            modal.open();
        },
        async create() {
            if (!localStorage.getItem("userId")) {
                this.openModal();
                return;
            }
            if (this.formValidate(this.Queue.name, this.Queue.description, this.Queue.membersNum)) {
                const queue = {
                    userId: localStorage.getItem("userId"),
                    name: this.Queue.name,
                    img: this.Queue.img,
                    description: this.Queue.description,
                    maxMembers: this.Queue.maxMembers,
                    members: this.Queue.members
                };

                const { data: responseFromQueueCreation } = await axios.post("http://localhost:3030/api/queue", queue);

                const { success, error } = responseFromQueueCreation;

                if (!success) {
                    window.M.toast({
                        html: `<span class="black-text">${error} Try again later or contact <a href="/support">support</a>.</span>`,
                        classes: "red lighten-3"
                    });
                }

                window.M.toast({ html: `<span class="black-text">Queue has been created!</span>`, classes: "green lighten-3" });
                this.cleanFields();
                this.getQueues();
                const instance = window.M.Modal.getInstance(document.getElementById(`${this.id}`));
                instance.close();
            } else {
                window.M.toast({ html: `<span class="black-text">${this.err}</span>`, classes: "red lighten-1" });
            }
        },
        formValidate(name, description, maxMembers) {
            if (!name) {
                this.err = "Enter name of queue";
                return false;
            }
            if (!description) {
                this.err = "Enter description of queue";
                return false;
            }
            if (maxMembers < 1) {
                this.err = "Enter the maximum";
                return false;
            }
            return true;
        }
    },
    mounted() {
        window.M.AutoInit();
    }
};
</script>

<style scoped>
input:focus {
    border-bottom: white !important;
    box-shadow: 0 1px 0 0 white !important;
}

label.active {
    color: white !important;
}
</style>
