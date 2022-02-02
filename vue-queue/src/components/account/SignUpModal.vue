<template>
    <div :id="id" class="modal blue-grey darken-4 white-text">
        <div class="modal-content">
            <h5 class="center">Sign Up</h5>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input v-model="User.name" id="name" type="text" placeholder="Eduard" class="white-text" />
                            <label for="name">Name</label>
                        </div>
                        <div class="input-field col s12">
                            <input v-model="User.surname" id="surname" type="text" placeholder="Chikrii" class="white-text" />
                            <label for="surname">Surname</label>
                        </div>
                        <div class="input-field col s12">
                            <input v-model="User.email" id="email" type="email" placeholder="sergey_s@queue.com" class="white-text" />
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="center">
                        <button @click.prevent="signUp()" class="btn btn-large blue-grey darken-1 white-text center">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer blue-grey darken-1">
            <a href="#" class="modal-close waves-effect white-text waves-dark btn-flat">Close</a>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ["id"],
    data() {
        return {
            User: {
                name: "",
                surname: "",
                email: ""
            },
            err: ""
        };
    },
    methods: {
        cleanFields() {
            this.User.name = "";
            this.User.surname = "";
            this.User.email = "";
        },
        async signUp() {
            try {
                if (this.formValidate(this.User.name, this.User.surname, this.User.email)) {
                    const user = {
                        name: this.User.name,
                        surname: this.User.surname,
                        email: this.User.email
                    };

                    const responseFromQueueCreation = await axios.post("http://localhost:3030/api/user", user);

                    const { success, error, data } = responseFromQueueCreation.data;
                    if (!success) {
                        window.M.toast({
                            html: `<span class="black-text">${error} Try again later or contact <a href="/support">support</a>.</span>`,
                            classes: "red lighten-3"
                        });
                        return null;
                    }

                    if (data && data.userId) {
                        localStorage.setItem("userId", data.userId);
                        this.$store.state.isSignedUp = true;
                    }

                    window.M.toast({
                        html: `<span class="black-text">User successfully created!</span>`,
                        classes: "green lighten-3"
                    });
                    this.cleanFields();
                    const instance = window.M.Modal.getInstance(document.getElementById(`${this.id}`));
                    return instance.close();
                } else {
                    window.M.toast({ html: `<span class="black-text">${this.err}</span>`, classes: "red lighten-1" });
                    return null;
                }
            } catch (e) {
                console.log(e);
                return null;
            }
        },
        formValidate(name, surname, email) {
            //eslint-disable-next-line
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (name.length < 3) {
                this.err = "Enter a valid name!";
                return false;
            }
            if (surname.length < 3) {
                this.err = "Enter a valid surname!";
                return false;
            }
            if (email.length < 3 || email.length > 255 || !regex.test(email)) {
                this.err = "Enter a valid email";
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
