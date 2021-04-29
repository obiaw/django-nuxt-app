<template>
    <b-container class="bv-example-row mt-5">
        <b-row>
            <b-col cols="12">
                <h2 v-if="isAuthenticated">Welcome back <span class="text-primary text-capitalize">{{loggedInUser.username}}!</span>
                </h2>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        middleware: ['auth'],
        data() {
            return {}
        },
        computed: {
            ...mapGetters(['isAuthenticated', 'loggedInUser'])
        },
    }
</script>