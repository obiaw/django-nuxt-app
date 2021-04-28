<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light" v-if="loggedIn">
            <b-container>
                <b-navbar-brand href="#">Django Nuxt App</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Home</b-nav-item>
                        <b-nav-item href="#">Blog</b-nav-item>
                        <b-nav-item href="#">Products</b-nav-item>
                        <b-nav-item href="#">Category</b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <template #button-content>
                                My Account
                            </template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {

            }
        },
        methods: {
            async logout() {
                await this.$auth.logout()
                this.$router.push('/login')
            }
        },
        computed: {
            ...mapState('auth', ['loggedIn'])
        }
    }
</script>