<template>
    <b-container class="mt-5">
        <b-row>
            <b-col cols="12">
                <h2>Welcome to La Recipes</h2>
                <hr />
            </b-col>
        </b-row>
        <b-row class="mt-1">
            <span v-if="loading">Fetching Recipes...
                <b-icon icon="three-dots" animation="cylon" font-scale="2"></b-icon>
            </span>
            <template v-for="recipe in recipes">
                <b-col cols="4" :key="recipe.id">
                    <recipe-card :onDelete="deleteRecipe" :recipe="recipe"></recipe-card>
                </b-col>
            </template>

        </b-row>
    </b-container>
</template>

<script>
    import RecipeCard from '~/components/Recipe/RecipeCard.vue'
    export default {
        middleware: ['auth'],
        head() {
            return {
                title: "Recipes list"
            };
        },
        components: {
            RecipeCard
        },
        data() {
            return {
                recipes: [],
                user: this.$auth.$storage.state.user,
                loading: false
            }
        },

        methods: {
            deleteRecipe(recipe_id) {
                console.log('deleted')
            },
            getRecipes() {
                try {
                    let user_id = this.user.id
                    this.loading = true
                    this.$axios.get(`recipes/?user=${user_id}`).then((res) => {
                        this.loading = false
                        this.recipes = res.data.results
                    }).catch(err => {
                        this.loading = false
                        console.log('error', err)
                    })
                } catch (e) {
                    console.log(e)
                    this.loading = false
                }
            },
        },
        created: function() {
            this.getRecipes()
        },
    }
</script>