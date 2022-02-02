<template>
    <div class="container-fluid">

        <vue-nav></vue-nav>
        <div class="container">
            <main>
                <router-view></router-view>
                <div class="center"></div>
            </main>
        </div>
        <vue-sign-up-modal id="sign-up"></vue-sign-up-modal>
    </div>
</template>

<script>
import Navbar from "./components/nav/Navbar.vue";
import SignUpModal from './components/account/SignUpModal.vue';

export default {
    components: {
        VueNav: Navbar,
        VueSignUpModal: SignUpModal
    }
};
</script>

<style>
body {
    background-color: #263238;
}

a.btn-large {
    color: #263238;
    font-weight: bold;
}
</style>
