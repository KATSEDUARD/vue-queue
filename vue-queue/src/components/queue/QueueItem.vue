<template>
    <li>
        <div class="collapsible-header blue-grey darken-1 white-text">
            <div class="row valign-wrapper">
                <div class="col s4">{{ name }}</div>
                <div class="col s4 center vertical-wrapper">{{ members }}/{{ maxmembers }} members</div>
                <div class="col s4">
                    <a v-if="!$store.state.isSignedUp" href="#sign-up" class="modal-trigger waves-effect waves-dark btn-small right blue-grey lighten-2">View</a>
                    <router-link v-else class="waves-effect waves-dark btn-small right blue-grey lighten-2" :to="`/${id}`">View</router-link>
                </div>
            </div>
        </div>
        <div class="collapsible-body blue-grey lighten-2 black-text">
            <p>{{ description }}</p>
        </div>
        <vue-sign-up-modal id="sign-up"></vue-sign-up-modal>
    </li>
</template>

<script>
import SignUpModal from '../account/SignUpModal.vue';

export default {
    props: ["id", "name", "members", "description", "maxmembers"],
    components: {
        VueSignUpModal: SignUpModal
    },
    mounted() {
        window.M.AutoInit();
    }
};
</script>

<style scoped>
.row {
    margin: 0 !important;
}

.collapsible-header {
    display: block;
    border-bottom: 1px solid #263238;
}

.collapsible-body {
    border: none;
}

.collapsible-body p {
    color: #263238;
}

.queue-link:hover {
    text-decoration: underline;
}

a {
    color: white;
}

.btn-small {
    color: #263238;
}
</style>
