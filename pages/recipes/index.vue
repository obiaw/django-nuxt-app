<template>
    <b-container class="mt-2">
        <b-row>
            <b-col cols="8">
                <h2>Welcome to La Recipes </h2>
            </b-col>
            <b-col cols=4>
                <a href="recipes/add" class="btn btn-outline-primary mr-0">
                    Add Recipe
                </a>
            </b-col>
        </b-row>
        <b-row class="mt-2 mb-5">
            <b-icon v-if="loading" icon="three-dots" class="mx-auto" variant="success" animation="cylon" font-scale="4"></b-icon>
            <template v-for="recipe in recipes">
                <b-col cols="4" :key="recipe.id" class="mb-5">
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
            async deleteRecipe(recipe_id) {
                try {
                    await this.$axios.delete(`recipes/${recipe_id}/`)
                    this.getRecipes()
                } catch (error) {
                    console.log(error)
                }
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
                        this.recipes = []
                        console.log('error', err)
                    })
                } catch (e) {
                    console.log(e)
                    this.loading = false
                    this.recipes = []
                }
            },
        },
        created: function() {
            this.getRecipes()
        },
    }
</script>