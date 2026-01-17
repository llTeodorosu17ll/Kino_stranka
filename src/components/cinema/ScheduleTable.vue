<template>
  <div class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-white/5 text-zinc-300">
      <tr>
        <th class="text-left p-3">Film</th>
        <th class="text-left p-3">Sála</th>
        <th class="text-left p-3">Dátum</th>
        <th class="text-left p-3">Čas</th>
        <th class="text-left p-3">Cena</th>
        <th class="p-3"></th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="s in sessions" :key="s.id" class="border-t border-white/10">
        <td class="p-3">
          <div class="font-medium">{{ movieTitle(s.movieId) }}</div>
        </td>
        <td class="p-3 text-zinc-300">{{ hallName(s.hallId) }}</td>
        <td class="p-3 text-zinc-300">{{ s.date }}</td>
        <td class="p-3 text-zinc-300">{{ s.time }}</td>
        <td class="p-3 text-zinc-300">{{ s.price.toFixed(2) }} €</td>
        <td class="p-3 text-right">
          <BaseButton variant="primary" @click="$emit('select', s.id)">
            Vybrať miesta
          </BaseButton>
        </td>
      </tr>

      <tr v-if="sessions.length === 0">
        <td class="p-4 text-zinc-400" colspan="6">Žiadne seansy pre zvolený filter.</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";

export default {
  name: "ScheduleTable",
  components: { BaseButton },
  props: {
    sessions: { type: Array, default: () => [] },
    movieTitle: { type: Function, required: true },
    hallName: { type: Function, required: true },
  },
  emits: ["select"],
};
</script>
