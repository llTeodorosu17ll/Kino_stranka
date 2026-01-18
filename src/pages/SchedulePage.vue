<template>
  <section class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <div class="rounded-3xl border border-white/10 bg-black/45 p-4 md:p-6">
      <div class="glass rounded-3xl p-4 md:p-6 space-y-6">

        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-semibold">Filmy</h1>
            <p class="text-zinc-300 text-sm mt-1">
              Vyber film a klikni na „Kúpiť lístok“.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <div class="glass rounded-2xl p-2">
              <input
                  type="text"
                  placeholder="Hľadať..."
                  class="px-4 py-2 rounded-2xl bg-black/20 border border-white/10 outline-none"
                  :value="filters.query"
                  @input="setQuery($event.target.value)"
              />
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
              v-for="m in filteredMoviesLocal"
              :key="m.id"
              class="glass rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition"
          >
            <div class="flex gap-4">
              <div class="w-20 h-28 rounded-xl overflow-hidden border border-white/10 bg-black/20 shrink-0">
                <img :src="assetUrl(m.poster)" :alt="m.title" class="w-full h-full object-cover" />
              </div>

              <div class="min-w-0 flex-1">
                <div class="font-semibold text-base line-clamp-1">{{ m.title }}</div>
                <div class="text-xs text-zinc-400 line-clamp-1 mt-1">{{ m.genres.join(" • ") }}</div>

                <div class="mt-2 flex flex-wrap gap-2 text-[11px] text-zinc-200">
                  <span class="px-2 py-1 rounded-lg bg-black/25 border border-white/10">{{ m.age }}</span>
                  <span class="px-2 py-1 rounded-lg bg-black/25 border border-white/10">{{ m.durationMin }} min</span>
                </div>

                <div class="mt-3 flex items-center gap-2">
                  <button
                      class="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 font-medium transition text-sm"
                      @click="goToMovie(m.id)"
                  >
                    Kúpiť lístok
                  </button>

                  <div class="text-xs text-zinc-400">
                    {{ timesCountForMovie(m.id) }} časy
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredMoviesLocal.length === 0" class="glass rounded-2xl p-6 text-zinc-300 md:col-span-2 lg:col-span-3">
            Žiadne filmy.
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCinemaStore } from "../stores/cinema";

export default {
  name: "SchedulePage", // путь остаётся /schedule, но по смыслу это "Filmy"

  computed: {
    ...mapState(useCinemaStore, ["filters", "filteredSessions", "movies"]),
    filteredMoviesLocal() {
      const q = (this.filters.query || "").toLowerCase();
      return this.movies.filter(m => m.title.toLowerCase().includes(q));
    },
  },

  methods: {
    ...mapActions(useCinemaStore, ["setQuery"]),

    assetUrl(path) {
      if (!path) return "";
      const base = import.meta.env.BASE_URL || "/";
      const cleanBase = base.endsWith("/") ? base : base + "/";
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      return cleanBase + cleanPath;
    },

    timesCountForMovie(movieId) {
      return this.filteredSessions.filter(s => s.movieId === movieId).length;
    },

    goToMovie(movieId) {
      this.$router.push({ path: `/movie/${movieId}` });
    },
  },
};
</script>
