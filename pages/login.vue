<template>
    <b-container>
        <b-row class="vh-100" align-v="center">
            <b-col cols="4" class="card p-2 mx-auto">
                <h3 class="text-center">
                    Welcome back!
                </h3>
                <hr />
                <b-form method="post" @submit.prevent="signin">
                    <b-alert show v-if="error" variant="danger">{{error}}</b-alert>
                    <b-form-group id="input-group-uname" label-for="input-uname">
                        <b-form-input id="input-uname" v-model="user.username" type="text" placeholder="Username" required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-password" label-for="input-password">
                        <b-form-input id="input-password" v-model="user.password" type="password" placeholder="Password" required></b-form-input>
                    </b-form-group>
                    <b-button type="submit" size="md" block variant="outline-success">Login</b-button>
                    <p class="p-2">Don't have an account? <a href="/register">Register</a></p>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        middleware: ['guest'],
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
                error: null
            }
        },
        layout(context) {
            return 'auth-layout'
        },
        methods: {
            async signin() {
                await this.$auth.loginWith('local', {
                    data: this.user
                }).then(res => {
                    const user = res.data.user
                    this.$auth.setUser(user)
                    this.$auth.$storage.setUniversal('user', user, true)
                    this.$router.push('/')
                }).catch(err => {
                    this.error = "Error, Invalid credentials, check and try again!"
                    this.$router.push('/login')
                })
            }
        },
    }
</script>