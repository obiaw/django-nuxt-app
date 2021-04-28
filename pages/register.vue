<template>
    <b-container class="bv-example-row pt-5">
        <b-row>
            <b-col cols="6" class="card p-2 mx-auto">
                <h3 class="text-center">
                    Register
                </h3>
                <hr />
                <b-form method="post" @submit.prevent="register">
                    <b-alert show v-if="error" variant="danger">{{error}}</b-alert>
                    <b-form-group id="input-group-fname" label="First Name" label-for="input-lname">
                        <b-form-input id="input-fname" v-model="user.first_name" type="text" placeholder="First name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-lname" label="Last Name" label-for="input-lname">
                        <b-form-input id="input-lname" v-model="user.last_name" type="text" placeholder=" Last name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-uname" label="Username" label-for="input-uname">
                        <b-form-input id="input-uname" v-model="user.username" type="text" placeholder="Username" required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-email" label="Email address" label-for="input-email">
                        <b-form-input id="input-email" v-model="user.email" type="email" placeholder="Email" required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-password" label="Password" label-for="input-password">
                        <b-form-input id="input-password" v-model="user.password" type="password" placeholder="Password" required></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="dark">Register</b-button>
                    <p class="p-2">Already have an account? <a href="/login">Login</a></p>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    'first_name': '',
                    'last_name': '',
                    'username': '',
                    'email': '',
                    'password': ''
                },
                error: null
            }
        },
        methods: {
            async register() {
                try {
                    await this.$axios.post('users/', this.user)
                    this.$router.push('/login')
                } catch (e) {
                    this.error = e.response.data;
                    console.log('error here', this.error)
                }
            }
        },
    }
</script>