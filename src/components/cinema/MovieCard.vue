<template>
  <div
      class="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition"
      :class="small ? 'w-[140px]' : 'w-[170px]'"
  >
    <div
        class="aspect-[2/3] bg-center bg-cover"
        :style="{ backgroundImage: 'url(' + movie.poster + ')' }"
    ></div>

    <div class="p-3 space-y-1">
      <div class="flex items-start justify-between gap-2">
        <div class="text-sm font-medium leading-snug line-clamp-2 group-hover:text-white">
          {{ movie.title }}
        </div>
        <span class="text-[11px] px-2 py-1 rounded-lg bg-black/30 border border-white/10">
          {{ movie.age }}
        </span>
      </div>

      <div class="text-xs text-zinc-400 line-clamp-1">
        {{ movie.genres.join(" • ") }}
      </div>
      <div class="text-xs text-zinc-500">
        {{ movie.durationMin }} min
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: { type: Object, required: true },
    small: { type: Boolean, default: false },
  },
};
</script>
