<template>
    <b-container>
        <b-row class="mt-2">
            <b-col cols="12">
                <h2>Add New Recipe</h2>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <b-col cols="5">
                <b-img v-if="preview" class="img-fluid" :src="preview" alt="recipe.name">
                </b-img>
                <b-img v-else class="img-fluid" src="https://picsum.photos/1025/1025/?image=58" alt="Right image"></b-img>
            </b-col>
            <b-col cols="7">
                <h2>
                    {{recipe.name}}
                </h2>
                <b-form method="post" @submit.prevent="addRecipe" class="mb-5">
                    <b-form-group id="input-group-rname" label-for="input-rname">
                        <b-form-input id="input-rname" v-model="recipe.name" type="text" required placeholder="Recipe Name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-spices" label-for="input-spices">
                        <b-form-input id="input-spices" v-model="recipe.ingredients" required type="text" placeholder="Recipe Ingredients"></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-picture" label-for="input-picture">
                        <b-form-file id="input-picture" name="input-picture" required @change="onRecipePictureChange" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
                    </b-form-group>
                    <b-form-group id="input-group-difficult-level" label-for="input-difficult-level">
                        <b-form-select class="mb-3" v-model="recipe.difficulty" required>
                            <b-form-select-option value="Easy">Easy</b-form-select-option>
                            <b-form-select-option value="Medium">Medium</b-form-select-option>
                            <b-form-select-option value="Hard">Hard</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group id="input-group-time" label-for="input-time">
                        <b-form-input id="input-time" v-model="recipe.prep_time" required type="text" placeholder="Preparation time (mins)">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-prepguide" label-for="input-prepguide">
                        <b-form-textarea id="input-prepguide" v-model="recipe.prep_guide" required placeholder="Preparation guide" rows="3" max-rows="6"></b-form-textarea>
                    </b-form-group>
                    <b-button type="submit" size="md" v-on:click="changeButtonText" block variant="outline-secondary">{{ button.text }}</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    export default {
        middleware: ['auth'],
        head() {
            return {
                title: "Add Recipe"
            };
        },
        data() {
            return {
                recipe: {
                    name: "",
                    picture: "",
                    ingredients: "",
                    difficulty: "",
                    prep_time: null,
                    prep_guide: "",
                    user: this.$auth.$storage.state.user.id,
                },
                preview: null,
                loading: false,
                button: {
                    text: 'Add Recipe'
                },
            };
        },
        methods: {
            onRecipePictureChange(e) {
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) {
                    return
                }
                this.recipe.picture = files[0]
                this.createRecipePicture(files[0])

            },
            createRecipePicture(file) {
                let reader = new FileReader()
                let vm = this
                reader.onload = e => {
                    vm.preview = e.target.result
                }
                reader.readAsDataURL(file)
            },

            async addRecipe() {
                const config = {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                };
                let formData = new FormData();
                for (let data in this.recipe) {
                    formData.append(data, this.recipe[data]);
                }
                this.loading = true
                try {
                    await this.$axios.$post("recipes/", formData, config);
                    this.$router.push("/recipes");
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    console.log(error)
                }
            },
            changeButtonText() {
                this.button.text = this.loading ? "Adding Recipe..." : "Add Recipe"
            }
        },

    }
</script>