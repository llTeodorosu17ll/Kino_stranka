<template>
  <section class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <!-- внешняя затемнённая подложка -->
    <div class="rounded-3xl border border-white/10 bg-black/40 p-4 md:p-6">
      <!-- внутри стекло -->
      <div class="glass rounded-3xl p-4 md:p-6 space-y-6">

        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-semibold">Rozklad</h1>
            <p class="text-zinc-300 text-sm mt-1">Vyber film → čas → miesta.</p>
          </div>

          <div class="flex flex-wrap gap-3">
            <input
                type="date"
                class="px-4 py-2 rounded-2xl bg-black/20 border border-white/10 outline-none"
                :value="filters.date"
                @input="setDate($event.target.value)"
            />
            <select
                class="px-4 py-2 rounded-2xl bg-black/20 border border-white/10 outline-none"
                :value="filters.hallId"
                @change="setHall($event.target.value)"
            >
              <option value="all">Všetky sály</option>
              <option v-for="h in halls" :key="h.id" :value="h.id">{{ h.name }}</option>
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-[360px_1fr] gap-5">
          <!-- LEFT -->
          <div class="glass rounded-2xl p-4 space-y-3">
            <div class="text-sm font-medium">Filmy</div>

            <div class="space-y-2">
              <MovieMiniCard
                  v-for="m in moviesToShow"
                  :key="m.id"
                  :movie="m"
                  :active="m.id === activeMovieId"
                  @select="selectMovie"
              />
            </div>

            <div v-if="moviesToShow.length === 0" class="text-sm text-zinc-300">
              Žiadne filmy pre zvolený filter.
            </div>
          </div>

          <!-- RIGHT -->
          <div class="rounded-2xl overflow-hidden border border-white/10" v-if="activeMovie">
            <div class="relative p-6">
              <div
                  class="absolute inset-0 bg-center bg-cover"
                  :style="{ backgroundImage: 'url(' + assetUrl(activeMovie.backdrop || activeMovie.poster) + ')' }"
              ></div>
              <div class="absolute inset-0 bg-black/60"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15"></div>

              <div class="relative glass rounded-2xl p-5">
                <div class="flex flex-col md:flex-row gap-6">
                  <div class="w-full md:w-[220px] rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                    <div class="aspect-[2/3]">
                      <img :src="assetUrl(activeMovie.poster)" :alt="activeMovie.title" class="w-full h-full object-cover"/>
                    </div>
                  </div>

                  <div class="flex-1 space-y-3">
                    <div class="flex flex-wrap gap-2 text-xs text-zinc-200">
                      <span class="px-2 py-1 rounded-lg bg-black/25 border border-white/10">{{ activeMovie.age }}</span>
                      <span class="px-2 py-1 rounded-lg bg-black/25 border border-white/10">{{ activeMovie.durationMin }} min</span>
                      <span class="px-2 py-1 rounded-lg bg-black/25 border border-white/10">{{ activeMovie.genres.join(" • ") }}</span>
                    </div>

                    <h2 class="text-2xl md:text-3xl font-semibold">{{ activeMovie.title }}</h2>
                    <p class="text-zinc-200/90">{{ activeMovie.description }}</p>

                    <div class="pt-3">
                      <div class="flex items-center justify-between">
                        <div class="text-sm font-medium">Časy</div>
                        <div class="text-xs text-zinc-200/70">{{ filters.date ? filters.date : "Dnes" }}</div>
                      </div>

                      <div class="mt-3 grid grid-cols-3 md:grid-cols-4 gap-2">
                        <button
                            v-for="s in sessionsForActiveMovie"
                            :key="s.id"
                            class="py-2 rounded-xl bg-black/25 hover:bg-black/35 border border-white/10 text-sm transition"
                            @click="openSession(s.id)"
                        >
                          {{ s.time }}
                        </button>
                      </div>

                      <div v-if="sessionsForActiveMovie.length === 0" class="mt-3 text-sm text-zinc-300">
                        Žiadne seansy pre tento film.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="glass rounded-2xl p-6 text-zinc-300" v-else>
            Vyber film vľavo, aby sa zobrazili časy.
          </div>
        </div>

      </div>
    </div>

    <!-- seat modal -->
    <BaseModal v-if="selectedSession" title="Výber miest" @close="closeModal">
      <div class="space-y-3">
        <div class="text-sm text-zinc-300">
          <div class="font-medium">{{ movieTitle(selectedSession.movieId) }}</div>
          <div class="text-zinc-400">
            {{ hallName(selectedSession.hallId) }} • {{ selectedSession.date }} • {{ selectedSession.time }} • {{ selectedSession.price.toFixed(2) }} €
          </div>
        </div>

        <SeatPicker
            :selectedSeats="selectedSeats"
            :pricePerSeat="selectedSession.price"
            @toggle="toggleSeat"
            @buy="buyTickets"
        />
      </div>
    </BaseModal>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCinemaStore } from "../stores/cinema";

import BaseModal from "../components/ui/BaseModal.vue";
import SeatPicker from "../components/cinema/SeatPicker.vue";
import MovieMiniCard from "../components/cinema/MovieMiniCard.vue";

export default {
  name: "SchedulePage",
  components: { BaseModal, SeatPicker, MovieMiniCard },

  data() {
    return { activeMovieId: null };
  },

  computed: {
    ...mapState(useCinemaStore, [
      "filters", "halls", "movies", "filteredSessions",
      "selectedSessionId", "selectedSeats",
      "sessionById", "movieById", "hallById"
    ]),

    selectedSession() {
      return this.selectedSessionId ? this.sessionById(this.selectedSessionId) : null;
    },

    moviesToShow() {
      const ids = new Set(this.filteredSessions.map(s => s.movieId));
      return this.movies.filter(m => ids.has(m.id));
    },

    activeMovie() {
      return this.activeMovieId ? this.movieById(this.activeMovieId) : null;
    },

    sessionsForActiveMovie() {
      if (!this.activeMovieId) return [];
      return this.filteredSessions
          .filter(s => s.movieId === this.activeMovieId)
          .slice()
          .sort((a, b) => a.time.localeCompare(b.time));
    },
  },

  watch: {
    moviesToShow: {
      immediate: true,
      handler(list) {
        if (!list || list.length === 0) { this.activeMovieId = null; return; }
        if (!list.some(m => m.id === this.activeMovieId)) this.activeMovieId = list[0].id;
      },
    },
  },

  methods: {
    ...mapActions(useCinemaStore, ["setDate", "setHall", "openSession", "toggleSeat", "buyTickets"]),

    assetUrl(path) {
      if (!path) return "";
      const base = import.meta.env.BASE_URL || "/";
      const cleanBase = base.endsWith("/") ? base : base + "/";
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      return cleanBase + cleanPath;
    },

    selectMovie(id) { this.activeMovieId = id; },

    movieTitle(id) {
      const m = this.movieById(id);
      return m ? m.title : "Unknown";
    },
    hallName(id) {
      const h = this.hallById(id);
      return h ? h.name : "Unknown";
    },

    closeModal() { this.openSession(null); },
  },
};
</script>
