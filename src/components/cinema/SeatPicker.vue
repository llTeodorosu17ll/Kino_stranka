<template>
  <div class="space-y-4">
    <div class="text-sm text-zinc-300">
      Vyber si miesta (kliknutím). Vybrané: <span class="text-white font-medium">{{ selectedSeats.length }}</span>
    </div>

    <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div class="mx-auto w-full max-w-md">
        <div class="text-center text-xs text-zinc-400 mb-3">PLÁTNO</div>
        <div class="h-2 rounded-full bg-white/10 mb-4"></div>

        <div class="grid grid-cols-8 gap-2">
          <button
              v-for="seat in seats"
              :key="seat"
              class="h-9 rounded-xl border text-xs transition"
              :class="isSelected(seat)
              ? 'bg-red-600 border-red-500/40 text-white'
              : 'bg-white/10 border-white/10 hover:bg-white/15 text-zinc-200'"
              @click="$emit('toggle', seat)"
          >
            {{ seat }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="text-sm text-zinc-400">
        Cena: <span class="text-white font-medium">{{ priceText }}</span>
      </div>

      <BaseButton
          variant="primary"
          :disabled="selectedSeats.length === 0"
          @click="$emit('buy')"
      >
        Kúpiť
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";

export default {
  name: "SeatPicker",
  components: { BaseButton },
  props: {
    selectedSeats: { type: Array, default: () => [] },
    pricePerSeat: { type: Number, default: 0 },
  },
  emits: ["toggle", "buy"],
  computed: {
    seats() {
      // 5 radov x 8 miest = 40
      const out = [];
      const rows = ["A", "B", "C", "D", "E"];
      for (const r of rows) for (let i = 1; i <= 8; i++) out.push(`${r}${i}`);
      return out;
    },
    priceText() {
      const total = this.selectedSeats.length * this.pricePerSeat;
      return `${total.toFixed(2)} €`;
    },
  },
  methods: {
    isSelected(seat) {
      return this.selectedSeats.includes(seat);
    },
  },
};
</script>
