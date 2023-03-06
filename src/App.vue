<template>
    <div class="container">
        <NavBar />
        <SvgRight />
        <ShortenerUrl />
    </div>
</template>

<script>
import NavBar from "./shared/NavBar.vue";
import SvgRight from "./components/SvgRight.vue";
import ShortenerUrl from "./components/ShortenerUrl.vue";

export default {
    name: "App",
    components: { 
        NavBar, 
        SvgRight, 
        ShortenerUrl 
    }
};
</script>