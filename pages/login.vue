<template>
    <div>
        <b-container class="bv-example-row">
            <b-row class="vh-100" align-v="center">
                <b-col cols="4" class="card p-2 mx-auto">
                    <h3 class="text-center">
                        Welcome back!
                    </h3>
                    <hr />
                    <b-form method="post" @submit.prevent="signin">
                        <b-alert show v-if="error" variant="danger">{{error}}</b-alert>
                        <b-form-group id="input-group-uname" label="Username" label-for="input-uname">
                            <b-form-input id="input-uname" v-model="user.username" type="text" placeholder="Username" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-password" label="Password" label-for="input-password">
                            <b-form-input id="input-password" v-model="user.password" type="password" placeholder="Password" required></b-form-input>
                        </b-form-group>
                        <b-button type="submit" size="md" block variant="outline-secondary">Login</b-button>
                        <p class="p-2">Don't have an account? <a href="/register">Register</a></p>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
                error: null
            }
        },
        methods: {
            async signin() {
                try {
                    await this.$auth.loginWith('local', {
                        data: this.user
                    })
                    this.$router.push('/')
                } catch (e) {
                    this.error = "Error, Invalid credentials, check and try again!"
                    this.$router.push('/login')
                }
            }
        },
    }
</script>