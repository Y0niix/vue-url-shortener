<template>
    <div class="row">
        <div class="col-12 col-lg-6">
            <h1 class="mt-5 lh-sm fw-bold display-1">
                Create your<br />
                <span class="gradient">short URL</span>
            </h1>
            <p class="info lead">
                Get a short URL to share for your social media
            </p>

            <div class="input-group mt-5">
                <input
                    v-model="longURL"
                    type="text"
                    name="url"
                    id="url"
                    class="form-control"
                    placeholder="Enter your url"
                    aria-label="Enter your url"
                />
                <button
                    class="btn btn-gradient"
                    @click="getShortUrl()"
                    :disabled="loading || !longURL || !isUrl"
                >
                    <template v-if="!loading">Short it!</template>
                    <template v-else>
                        <div class="spinner-border spinner-border-sm text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Load...
                    </template>
                </button>
            </div>

            <div class="fst-italic text-danger" v-if="error">
                {{ error }}
            </div>
        </div>

        <div class="col-12 col-lg-6 mt-5 d-flex justify-content-center align-items-center">
            <div class="card shadow-sm">
                <div class="card-body">
                    <DisplayLinks :links="links" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DisplayLinks from "./DisplayLinks.vue";
export default {
    name: "ShortenerUrl",
    components: { DisplayLinks },

    data() {
        return {
            loading: false,
            longURL: "",
            error: "",
            links: []
        };
    },
    computed: {
        isUrl() {
            //eslint-disable-next-line
            var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);
            return this.longURL.match(regex) ? true : false;
        },
    },

    methods: {
        async getShortUrl() {
            this.loading = true;
            this.error = "";
            this.links = [];

            await this.$axios
                .post(`https://api.shrtco.de/v2/shorten?url=${this.longURL}`)
                .then((response) => {
                    this.links.push(
                        response.data.result.full_short_link,
                        response.data.result.full_short_link2,
                        response.data.result.full_short_link3
                    );
                })
                .catch((error) => {
                    this.error = error.message;
                })
                .finally(() => {
                    this.loading = false;
                    this.longURL = "";
                });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
    max-width: 300px;
}
.gradient {
    background: -webkit-linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-color: #8bc6ec;
}
.info { 
    color: #6b7a90; 
}
.btn-gradient {
    background: #8b8ece;
    background: -webkit-linear-gradient(to right, #8bc6ec, #8b8ece);
    background: linear-gradient(to right, #8bc6ec, #8b8ece);
    color: #fff;
    border: solid 1px white;
}
.btn-gradient:hover {
    background: #8185ce;
    background: -webkit-linear-gradient(to right, #8ebedf, #8185ce);
    background: linear-gradient(to right, #8ebedf, #8185ce);
    color: #fff;
    border: solid 1px white;
}
.btn-gradient:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
}
.card {
    min-width: 300px;
    min-height: 155px;
}
</style>