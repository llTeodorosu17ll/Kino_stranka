<template>
  <section class="max-w-6xl mx-auto px-4 py-8 space-y-6" v-if="movie">
    <div class="rounded-3xl border border-white/10 bg-black/45 p-4 md:p-6 overflow-hidden">
      <div class="relative rounded-3xl overflow-hidden border border-white/10">
        <div
            class="absolute inset-0 bg-center bg-cover"
            :style="{ backgroundImage: 'url(' + assetUrl(movie.backdrop || movie.poster) + ')' }"
        ></div>
        <div class="absolute inset-0 bg-black/65"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15"></div>

        <div class="relative p-6 md:p-10 grid md:grid-cols-[240px_1fr] gap-6 items-start">
          <div class="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
            <div class="aspect-[2/3]">
              <img :src="assetUrl(movie.poster)" :alt="movie.title" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex flex-wrap gap-2 text-xs text-zinc-200">
              <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ movie.age }}</span>
              <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ movie.durationMin }} min</span>
              <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ movie.genres.join(" • ") }}</span>
              <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ movie.year }}</span>
              <span
                  class="px-2 py-1 rounded-lg border border-white/10"
                  :class="movie.status === 'soon' ? 'bg-sky-500/20 text-sky-200' : 'bg-emerald-500/20 text-emerald-200'"
              >
                {{ movie.status === "soon" ? "Anonce" : "V premiére" }}
              </span>
            </div>

            <h1 class="text-3xl md:text-5xl font-semibold">{{ movie.title }}</h1>
            <p class="text-zinc-200/90 max-w-3xl">{{ movie.description }}</p>

            <div v-if="movie.status === 'soon'" class="glass rounded-2xl p-4 border border-white/10">
              <div class="text-sm font-medium">Zatiaľ bez lístkov</div>
              <div class="text-sm text-zinc-300 mt-1">
                Tento film je v anonce. Rozklad a predaj lístkov bude dostupný neskôr.
              </div>

              <div class="mt-4 flex gap-3">
                <router-link
                    to="/movies"
                    class="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition"
                >
                  Späť na Anonce
                </router-link>

                <router-link
                    to="/schedule"
                    class="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-medium transition"
                >
                  Pozrieť Filmy
                </router-link>
              </div>
            </div>

            <div v-else class="glass rounded-2xl p-4 border border-white/10">
              <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                  <div class="text-sm font-medium">Vyber čas</div>
                  <div class="text-xs text-zinc-300 mt-1">Klikni na čas → vyber miesta.</div>
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

              <div class="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2">
                <button
                    v-for="s in sessionsForMovie"
                    :key="s.id"
                    class="py-2 rounded-xl bg-black/25 hover:bg-black/35 border border-white/10 text-sm transition"
                    @click="openSession(s.id)"
                >
                  {{ s.time }}
                </button>
              </div>

              <div v-if="sessionsForMovie.length === 0" class="mt-3 text-sm text-zinc-300">
                Žiadne seansy pre zvolený filter.
              </div>
            </div>

            <router-link v-if="movie.status !== 'soon'" to="/schedule" class="inline-block text-sm text-zinc-300 hover:text-white">
              ← Späť na Filmy
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <BaseModal v-if="movie.status !== 'soon' && selectedSession" title="Výber miest" @close="closeModal">
      <div class="space-y-3">
        <div class="text-sm text-zinc-300">
          <div class="font-medium">{{ movie.title }}</div>
          <div class="text-zinc-400">
            {{ hallName(selectedSession.hallId) }} • {{ selectedSession.date }} • {{ selectedSession.time }} • {{ selectedSession.price.toFixed(2) }} €
          </div>
        </div>

        <div v-if="buyError" class="text-sm text-red-300">
          {{ buyError }}
        </div>

        <SeatPicker
            :selectedSeats="selectedSeats"
            :pricePerSeat="selectedSession.price"
            @toggle="toggleSeat"
            @buy="tryBuy"
        />
      </div>
    </BaseModal>
  </section>

  <section v-else class="max-w-6xl mx-auto px-4 py-10 text-zinc-300">
    Film neexistuje.
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCinemaStore } from "../stores/cinema";
import { useAuthStore } from "../stores/auth";

import BaseModal from "../components/ui/BaseModal.vue";
import SeatPicker from "../components/cinema/SeatPicker.vue";

export default {
  name: "MovieDetailPage",
  components: { BaseModal, SeatPicker },
  props: { id: { type: String, required: true } },

  data() {
    return { buyError: "" };
  },

  computed: {
    ...mapState(useCinemaStore, [
      "filters", "halls", "filteredSessions",
      "movieById", "sessionById", "selectedSessionId", "selectedSeats", "hallById"
    ]),
    ...mapState(useAuthStore, ["isLoggedIn"]),

    movie() {
      return this.movieById(this.id);
    },
    selectedSession() {
      return this.selectedSessionId ? this.sessionById(this.selectedSessionId) : null;
    },
    sessionsForMovie() {
      return this.filteredSessions
          .filter((s) => s.movieId === this.id)
          .slice()
          .sort((a, b) => a.time.localeCompare(b.time));
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

    hallName(id) {
      const h = this.hallById(id);
      return h ? h.name : "Unknown";
    },

    closeModal() {
      this.buyError = "";
      this.openSession(null);
    },

    tryBuy() {
      this.buyError = "";
      const res = this.buyTickets();
      if (!res.ok) {
        this.buyError = res.message;
        if (String(res.message).toLowerCase().includes("prihlás")) {
          this.openSession(null);
          this.$router.push("/profile");
        }
        return;
      }
      this.openSession(null);
      this.$router.push("/profile");
    },
  },
};
</script>
