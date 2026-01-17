<template>
  <header class="sticky top-0 z-50">
    <div class="bg-zinc-950/80 backdrop-blur border-b border-white/10">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold shadow">
            KS
          </div>
          <div class="leading-tight">
            <div class="text-sm font-semibold tracking-wide group-hover:text-white">
              Kino Stránka
            </div>
            <div class="text-xs text-zinc-400 -mt-1">
              moderný kino web
            </div>
          </div>
        </router-link>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-2">
          <NavPill to="/schedule" label="Rozklad" />
          <NavPill to="/movies" label="Anonce" />
          <NavPill to="/about" label="O nás" />
        </nav>

        <!-- Right -->
        <div class="flex items-center gap-2">
          <router-link
              to="/profile"
              class="px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition"
          >
            Profil
          </router-link>

          <button
              class="md:hidden px-3 py-2 rounded-2xl bg-white/5 border border-white/10"
              @click="open = !open"
              aria-label="Menu"
          >
            ☰
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="open" class="md:hidden bg-zinc-950/95 border-b border-white/10">
      <div class="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
        <router-link class="px-3 py-2 rounded-xl hover:bg-white/5" to="/schedule" @click="open=false">Rozklad</router-link>
        <router-link class="px-3 py-2 rounded-xl hover:bg-white/5" to="/movies" @click="open=false">Anonce</router-link>
        <router-link class="px-3 py-2 rounded-xl hover:bg-white/5" to="/about" @click="open=false">O nás</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import NavPill from "./NavPill.vue";

export default {
  name: "AppHeader",
  components: { NavPill },
  data() {
    return { open: false };
  },
  watch: {
    $route() {
      this.open = false;
    },
  },
};
</script>
