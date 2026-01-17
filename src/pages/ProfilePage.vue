<template>
  <section class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <div>
      <h1 class="text-2xl font-semibold">Profil</h1>
      <p class="text-zinc-400 text-sm mt-1">Moje lístky (uložené v localStorage).</p>
    </div>

    <div v-if="tickets.length === 0" class="rounded-2xl border border-white/10 bg-white/5 p-6 text-zinc-300">
      Zatiaľ nemáš žiadne lístky. Choď do Rozklad a kúp si miesto.
    </div>

    <div class="grid gap-4" v-else>
      <div
          v-for="t in tickets"
          :key="t.id"
          class="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div class="space-y-1">
          <div class="font-medium">{{ titleForTicket(t) }}</div>
          <div class="text-sm text-zinc-400">
            {{ metaForTicket(t) }}
          </div>
          <div class="text-sm text-zinc-300">
            Miesta: <span class="font-medium">{{ t.seats.join(", ") }}</span>
          </div>
        </div>

        <div class="flex gap-2">
          <router-link to="/schedule" class="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm">
            Rozklad
          </router-link>
          <button class="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 text-sm" @click="removeTicket(t.id)">
            Zmazať
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCinemaStore } from "../stores/cinema";

export default {
  name: "ProfilePage",
  computed: {
    ...mapState(useCinemaStore, ["tickets", "sessionById", "movieById", "hallById"]),
  },
  methods: {
    ...mapActions(useCinemaStore, ["removeTicket"]),
    titleForTicket(t) {
      const s = this.sessionById(t.sessionId);
      const m = s ? this.movieById(s.movieId) : null;
      return m ? m.title : "Unknown movie";
    },
    metaForTicket(t) {
      const s = this.sessionById(t.sessionId);
      if (!s) return "";
      const h = this.hallById(s.hallId);
      return `${h ? h.name : "?"} • ${s.date} • ${s.time}`;
    },
  },
};
</script>
