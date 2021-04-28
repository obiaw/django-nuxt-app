<template>
    <b-container>
        <b-row>
            <b-col>
                <h2>Welcome to Django Nuxt App</h2>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        middleware: ['auth'],
        data() {
            return {

            }
        },
        computed: {
            ...mapState('auth', ['loggedIn'])
        },
    }
</script>