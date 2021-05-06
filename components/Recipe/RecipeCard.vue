<template>
    <b-card :title="recipe.name" :img-src="recipe.picture" img-alt="recipe.name" img-top class="mb-2">
        <b-card-text>
            <b>Ingredients </b>
            <p>{{recipe.ingredients}} </p>
        </b-card-text>
        <nuxt-link :to="`/recipes/${recipe.id}/`" class="btn btn-outline-secondary btn-sm">Read More</nuxt-link>
        <nuxt-link :to="`/recipes/${recipe.id}/edit/`" class="btn btn-outline-success btn-sm">Update</nuxt-link>
        <b-button type="button" size="sm" variant="outline-danger" @click="onDelete(recipe.id)">
            Remove
        </b-button>
    </b-card>
</template>

<script>
    export default {
        props: ['recipe', 'onDelete']
    }
</script>

<style scoped>
    .card-img-top {
        height: 230px !important;
    }

    .card-title {
        text-transform: capitalize;
    }
</style>