import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import SchedulePage from "../pages/SchedulePage.vue";
import MoviesPage from "../pages/MoviesPage.vue";
import AboutPage from "../pages/AboutPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", name: "home", component: HomePage },
        { path: "/schedule", name: "schedule", component: SchedulePage },
        { path: "/movies", name: "movies", component: MoviesPage },
        { path: "/about", name: "about", component: AboutPage },
        { path: "/profile", name: "profile", component: ProfilePage },
    ],
    scrollBehavior() { return { top: 0 }; },
});
