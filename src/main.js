import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

import "@/assets/styles/main.scss";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";

const axiosInstance = axios.create({
    // withCredentials: true,
    withCredentials: false,
});

const app = createApp(App);
app.config.globalProperties.$axios = { ...axiosInstance };
app.mount("#app");