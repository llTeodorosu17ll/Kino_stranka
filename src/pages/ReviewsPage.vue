<template>
  <section class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <div class="rounded-3xl border border-white/10 bg-black/45 p-4 md:p-6">
      <div class="glass rounded-3xl p-4 md:p-6 space-y-6">
        <div>
          <h1 class="text-2xl font-semibold">Recenzie</h1>
          <p class="text-zinc-300 text-sm mt-1">
            Zanechaj hodnotenie a komentár (ukladá sa do localStorage).
          </p>
        </div>

        <div class="glass rounded-2xl p-5 border border-white/10 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm text-zinc-300">Hodnotenie (1–5)</label>
              <select
                  v-model="form.rating"
                  class="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 outline-none"
              >
                <option disabled value="">Vyber</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="text-sm text-zinc-300">Film (voliteľné)</label>
              <select
                  v-model="form.movieId"
                  class="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 outline-none"
              >
                <option value="">Všeobecná recenzia kina</option>
                <option v-for="m in movies" :key="m.id" :value="m.id">
                  {{ m.title }}
                </option>
              </select>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-zinc-300">Text</label>
            <textarea
                v-model="form.text"
                rows="4"
                class="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 outline-none resize-none"
                placeholder="Napíš svoju skúsenosť..."
            ></textarea>
          </div>

          <div v-if="error" class="text-sm text-red-300">{{ error }}</div>
          <div v-if="ok" class="text-sm text-emerald-300">Recenzia uložená.</div>

          <button
              class="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-medium transition"
              @click="submit"
          >
            Odoslať recenziu
          </button>

          <div class="text-xs text-zinc-400">
            Pozn.: Pre odoslanie musíš byť prihlásený v Profile.
          </div>
        </div>

        <div class="space-y-3">
          <div class="text-lg font-semibold">Najnovšie</div>

          <div v-if="sorted.length === 0" class="glass rounded-2xl p-6 border border-white/10 text-zinc-300">
            Zatiaľ žiadne recenzie.
          </div>

          <div v-else class="grid gap-4">
            <div
                v-for="r in sorted"
                :key="r.id"
                class="glass rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
            >
              <div class="space-y-2">
                <div class="flex items-center gap-3">
                  <div class="font-semibold">{{ r.userName }}</div>
                  <div class="text-xs text-zinc-400">{{ formatDate(r.createdAt) }}</div>
                </div>

                <div class="text-sm text-zinc-300">
                  <span class="text-white font-semibold">{{ stars(r.rating) }}</span>
                  <span v-if="r.movieId" class="ml-2 text-zinc-400">• {{ movieTitle(r.movieId) }}</span>
                  <span v-else class="ml-2 text-zinc-400">• Kino</span>
                </div>

                <div class="text-zinc-200/90">
                  {{ r.text }}
                </div>
              </div>

              <button
                  v-if="canDelete(r)"
                  class="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm"
                  @click="removeReview(r.id)"
              >
                Zmazať
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useReviewsStore } from "../stores/reviews";
import { useCinemaStore } from "../stores/cinema";
import { useAuthStore } from "../stores/auth";

export default {
  name: "ReviewsPage",

  data() {
    return {
      form: {
        rating: "",
        movieId: "",
        text: "",
      },
      error: "",
      ok: false,
    };
  },

  computed: {
    ...mapState(useReviewsStore, ["sorted"]),
    ...mapState(useCinemaStore, ["movies", "movieById"]),
    ...mapState(useAuthStore, ["currentUser", "isLoggedIn"]),
  },

  methods: {
    ...mapActions(useReviewsStore, ["addReview", "removeReview"]),

    submit() {
      this.error = "";
      this.ok = false;

      const res = this.addReview({
        rating: this.form.rating,
        text: this.form.text,
        movieId: this.form.movieId || null,
      });

      if (!res.ok) {
        this.error = res.message;
        return;
      }

      this.ok = true;
      this.form.rating = "";
      this.form.movieId = "";
      this.form.text = "";
    },

    movieTitle(id) {
      const m = this.movieById(id);
      return m ? m.title : "Unknown";
    },

    stars(n) {
      const full = "★".repeat(n);
      const empty = "☆".repeat(5 - n);
      return full + empty;
    },

    formatDate(iso) {
      try {
        return new Date(iso).toLocaleString();
      } catch {
        return iso;
      }
    },

    canDelete(r) {
      return this.isLoggedIn && this.currentUser && r.userId === this.currentUser.id;
    },
  },
};
</script>
