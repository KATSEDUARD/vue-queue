<template>
    <div>
        <div class="navbar-fixed" ref="navbar">
            <vue-refresh></vue-refresh>
            <nav class="blue-grey lighten-2">
                <a href="#" data-target="slide-out" class="sidenav-trigger white-text"><i class="material-icons">menu</i></a>
                <div class="nav-wrapper container">
                    <a href="/" class="brand-logo">VueQueue</a>
                    <div class="hide-on-med-and-down">
                        <div id="form">
                            <div class="input-field">
                                <input
                                    ref="search-input"
                                    id="search"
                                    placeholder="Search"
                                    style="border-bottom: 1px solid white"
                                    type="search"
                                    name="search"
                                />
                                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                                <i @click="$refs['search-input'].value = ''" class="material-icons">close</i>
                            </div>
                        </div>
                    </div>
                    <ul class="right hide-on-med-and-down">
                        <li><router-link to="/">All Queues</router-link></li>
                        <li v-if="$store.state.isSignedUp"><a href="#sign-up" @click="logOut">Log Out</a></li>
                        <li v-else><a class="modal-trigger" href="#sign-up">Sign Up</a></li>
                        <li><a href="/help">Help</a></li>
                        <li><a href="#" @click="refresh">Refresh</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <ul id="slide-out" class="sidenav">
            <li>
                <a href="#"><i class="material-icons">cloud</i>First Link With Icon</a>
            </li>
            <li><a href="#">Second Link</a></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">Subheader</a></li>
            <li><a class="waves-effect" href="#">Third Link With Waves</a></li>
        </ul>
        <vue-sign-up-modal id="sign-up"></vue-sign-up-modal>
    </div>
</template>

<script>
import { fromEvent, from } from "rxjs";
import { debounceTime, map, filter, distinctUntilChanged, mergeMap, toArray } from "rxjs/operators";
import SignUpModal from "../account/SignUpModal.vue";
import Refresh from "./Refresh";

export default {
    data() {
        return {
            counter: 1
        };
    },
    components: {
        VueSignUpModal: SignUpModal,
        VueRefresh: Refresh
    },
    mounted() {
        this.filterQueue();
        window.M.AutoInit();
    },
    methods: {
        logOut() {
            localStorage.removeItem("userId");
            this.$store.state.isSignedUp = false;
        },
        refresh() {
            this.$store.state.showRefresh = !this.$store.state.showRefresh;
        },
        filterQueue() {
            const subscription = fromEvent(this.$refs["search-input"], "keyup").pipe(
                debounceTime(400),
                map((event) => event.target.value.trim().toLowerCase()),
                distinctUntilChanged(),
                mergeMap((value) =>
                    from(this.$store.state.queues).pipe(
                        filter(() => value.trim().length > 1),
                        filter(
                            (val) => val.name.trim().toLowerCase().includes(value) || val.description.trim().toLowerCase().includes(value)
                        ),
                        toArray()
                    )
                )
            );

            subscription.subscribe({
                next: (queues) => {
                    this.$store.state.filteredQueues = queues;
                },
                error: console.error
            });

            return () => subscription.unsubscribe();
        }
    }
};
</script>

<style scoped>
a,
.brand-logo {
    color: #263238;
}

nav {
    padding: 0 10px 0 10px;
}

nav .right {
    position: absolute;
    top: 0;
    right: 0;
}

.nav-wrapper #form {
    margin: auto;
    width: 35%;
}

.nav-wrapper .input-field {
    padding-top: 7px;
}

.nav-wrapper #form #search {
    height: 50px;
}
</style>
