<template>
    <p v-if="links.length == 0" class="text-muted">Links will appear here...</p>
    <p v-else v-for="link in links" :key="link">
        <a target="_blank" class="text-decoration-none" :href="link">
            {{ link }}
        </a>
    </p>
</template>

<script>
export default {
    name: "DisplayLinks",
    props: ["links"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
    color: #9599e2;
}
a:hover {
    color: #8b8ece;
}
p:last-child {
    margin-bottom: 0;
}
</style>
