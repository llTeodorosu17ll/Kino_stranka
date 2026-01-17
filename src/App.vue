<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from "./components/layout/AppHeader.vue";

export default {
  name: "App",
  components: { AppHeader },
};
</script>
