<template>
    <div>
        <b-navbar toggleable="lg" class="p-3" type="dark" variant="secondary" v-if="isAuthenticated">
            <b-container>
                <b-navbar-brand href="#">Django Nuxt App</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Home</b-nav-item>
                        <b-nav-item href="/recipes">Recipe</b-nav-item>
                        <b-nav-item href="#">Products</b-nav-item>
                        <b-nav-item href="#">Category</b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <template #button-content>
                                Hi <span class="text-capitalize"> {{loggedInUser.username}} </span> </template>
                            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
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
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {}
        },
        methods: {
            async logout() {
                await this.$auth.logout()
                this.$router.push('/login')
            }
        },
        computed: {
            ...mapGetters(['isAuthenticated', 'loggedInUser'])
        }
    }
</script>