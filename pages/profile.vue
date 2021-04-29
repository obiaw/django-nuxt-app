<template>
    <div>
        <b-container class="mt-5">
            <h2>My Account Information</h2>
            <b-row>
                <b-col cols="6 mt-4">
                    <b-list-group>
                        <b-list-group-item>First Name: <span>{{loggedInUser.first_name}}</span></b-list-group-item>
                        <b-list-group-item>Last Name: <span>{{loggedInUser.last_name}}</span> </b-list-group-item>
                        <b-list-group-item>Username: <span>{{loggedInUser.username}}</span></b-list-group-item>
                        <b-list-group-item>Email: <span>{{loggedInUser.email}}</span></b-list-group-item>
                        <b-list-group-item>Last Login: <span>{{$moment(loggedInUser.last_login).format('MMMM Do YYYY, H:MM A')}}</span></b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        middleware: ['auth'],
        computed: {
            ...mapGetters(['loggedInUser'])
        },
    }
</script>