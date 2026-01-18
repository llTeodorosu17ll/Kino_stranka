<template>
  <header class="sticky top-0 z-50">
    <div class="bg-black/35 border-b border-white/10 backdrop-blur">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <!-- LOGO -->
        <router-link to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-red-600 grid place-items-center font-bold">KS</div>
          <div class="leading-tight">
            <div class="font-semibold">Kino Stránka</div>
            <div class="text-xs text-zinc-300">moderný kino web</div>
          </div>
        </router-link>

        <!-- NAV -->
        <nav class="hidden md:flex items-center gap-2">
          <NavPill to="/schedule" label="Filmy" />
          <NavPill to="/movies" label="Anonce" />
          <NavPill to="/reviews" label="Recenzie" />
          <NavPill to="/about" label="O nás" />
        </nav>

        <!-- RIGHT -->
        <div class="flex items-center gap-2">
          <router-link
              to="/profile"
              class="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm"
          >
            Profil
          </router-link>

          <!-- mobile menu (simple) -->
          <button
              class="md:hidden px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm"
              @click="open = !open"
          >
            Menu
          </button>
        </div>
      </div>

      <!-- MOBILE NAV -->
      <div v-if="open" class="md:hidden border-t border-white/10">
        <div class="max-w-6xl mx-auto px-4 py-3 grid gap-2">
          <NavPill to="/schedule" label="Filmy" @click.native="open=false" />
          <NavPill to="/movies" label="Anonce" @click.native="open=false" />
          <NavPill to="/reviews" label="Recenzie" @click.native="open=false" />
          <NavPill to="/about" label="O nás" @click.native="open=false" />
        </div>
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
};
</script>
