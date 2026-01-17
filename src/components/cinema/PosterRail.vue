<template>
  <div class="rounded-3xl overflow-hidden border border-white/10">
    <Swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 4500, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
    >
      <SwiperSlide v-for="m in items" :key="m.id">
        <div
            class="relative h-[420px] md:h-[520px] bg-center bg-cover"
            :style="{ backgroundImage: 'url(' + m.backdrop + ')' }"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10"></div>
          <div class="absolute inset-0 bg-black/15"></div>

          <div class="relative h-full p-6 md:p-10 grid md:grid-cols-2 gap-6 items-end md:items-center">
            <!-- left info -->
            <div class="space-y-4">
              <div class="flex flex-wrap gap-2 text-xs text-zinc-200">
                <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ m.age }}</span>
                <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ m.durationMin }} min</span>
                <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ m.genres.join(" • ") }}</span>
              </div>

              <h1 class="text-3xl md:text-5xl font-semibold leading-tight">
                {{ m.title }}
              </h1>

              <p class="text-zinc-200/90 max-w-xl line-clamp-3">
                {{ m.description }}
              </p>

              <div class="flex flex-wrap gap-3 pt-2">
                <button
                    class="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-medium transition"
                    @click="$emit('buy', m.id)"
                >
                  Kúpiť lístok
                </button>

                <router-link
                    to="/movies"
                    class="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition"
                >
                  Viac info
                </router-link>
              </div>
            </div>

            <!-- right mini schedule card -->
            <div class="md:justify-self-end w-full md:w-[360px]">
              <div class="rounded-2xl bg-white/10 border border-white/10 backdrop-blur p-4">
                <div class="flex items-center justify-between">
                  <div class="text-sm font-medium">Najbližšie časy</div>
                  <div class="text-xs text-zinc-200/70">Dnes</div>
                </div>

                <div class="mt-3 grid grid-cols-3 gap-2">
                  <button
                      v-for="t in times"
                      :key="t"
                      class="py-2 rounded-xl bg-black/20 hover:bg-black/30 border border-white/10 text-sm transition"
                      @click="$emit('openSchedule')"
                  >
                    {{ t }}
                  </button>
                </div>

                <div class="mt-3 text-xs text-zinc-200/60">
                  Klikni na čas → otvorí Rozklad.
                </div>
              </div>
            </div>

          </div>

        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default {
  name: "MovieCarousel",
  components: { Swiper, SwiperSlide },
  props: {
    items: { type: Array, default: () => [] },
  },
  emits: ["buy", "openSchedule"],
  data() {
    return {
      modules: [Autoplay, Pagination],
      times: ["16:45", "18:10", "19:30", "20:00", "21:50", "23:10"],
    };
  },
};
</script>
