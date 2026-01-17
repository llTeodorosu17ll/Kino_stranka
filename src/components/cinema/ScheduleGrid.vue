<template>
  <div class="space-y-6">
    <div
        v-for="movie in moviesToShow"
        :key="movie.id"
        class="rounded-3xl overflow-hidden border border-white/10"
    >
      <div class="relative p-6 md:p-10">
        <!-- BLUR BACKGROUND FROM POSTER -->
        <div
            class="absolute inset-0 bg-center bg-cover scale-110 blur-2xl"
            :style="{ backgroundImage: 'url(' + movie.poster + ')' }"
        ></div>

        <div class="absolute inset-0 bg-black/60"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10"></div>

        <div class="relative grid md:grid-cols-2 gap-6 items-end md:items-center">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2 text-xs text-zinc-200">
              <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ movie.age }}</span>
              <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ movie.durationMin }} min</span>
              <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ movie.genres.join(" • ") }}</span>
            </div>

            <h2 class="text-3xl md:text-4xl font-semibold">{{ movie.title }}</h2>
            <p class="text-zinc-200/90 max-w-xl">{{ movie.description }}</p>

            <div class="flex gap-3 pt-1">
              <BaseButton variant="primary" @click="$emit('hintSelectTime')">Kúpiť lístok</BaseButton>
              <router-link to="/movies" class="px-5 py-3 rounded-2xl glass hover:bg-white/10 transition">
                Viac info
              </router-link>
            </div>
          </div>

          <div class="md:justify-self-end w-full md:w-[380px]">
            <div class="glass rounded-2xl p-4">
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium">Seansy</div>
                <div class="text-xs text-zinc-200/70">{{ dateLabel }}</div>
              </div>

              <div class="mt-3 grid grid-cols-3 gap-2">
                <button
                    v-for="s in (sessionsByMovie[movie.id] || [])"
                    :key="s.id"
                    class="py-2 rounded-xl bg-black/25 hover:bg-black/35 border border-white/10 text-sm transition"
                    @click="$emit('selectSession', s.id)"
                >
                  {{ s.time }}
                </button>
              </div>

              <div v-if="(sessionsByMovie[movie.id] || []).length === 0" class="mt-3 text-sm text-zinc-300">
                Žiadne seansy pre filter.
              </div>

              <div class="mt-3 text-xs text-zinc-200/60">
                Klikni na čas → vyber miesta.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";

export default {
  name: "ScheduleGrid",
  components: { BaseButton },
  props: {
    moviesToShow: { type: Array, default: () => [] },
    sessionsByMovie: { type: Object, default: () => ({}) },
    dateLabel: { type: String, default: "Dnes" },
  },
  emits: ["selectSession", "hintSelectTime"],
};
</script>
