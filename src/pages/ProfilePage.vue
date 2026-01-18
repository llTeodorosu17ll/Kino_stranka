<template>
  <section class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <div class="rounded-3xl border border-white/10 bg-black/45 p-4 md:p-6">
      <div class="glass rounded-3xl p-4 md:p-6 space-y-6">

        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-semibold">Profil</h1>
            <p class="text-zinc-300 text-sm mt-1">
              Prihlásenie / registrácia + uložené lístky (localStorage).
            </p>
          </div>

          <button
              v-if="isLoggedIn"
              class="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm"
              @click="logout"
          >
            Odhlásiť sa
          </button>
        </div>

        <div v-if="!isLoggedIn" class="grid md:grid-cols-2 gap-6">
          <div class="glass rounded-2xl p-5 border border-white/10 space-y-4">
            <div class="text-lg font-semibold">Prihlásenie</div>

            <div class="space-y-2">
              <label class="text-sm text-zinc-300">E-mail</label>
              <input
                  v-model="loginForm.email"
                  type="email"
                  class="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 outline-none"
                  placeholder="email@example.com"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm text-zinc-300">Heslo</label>
              <input
                  v-model="loginForm.password"
                  type="password"
                  class="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 outline-none"
                  placeholder="••••"
              />
            </div>

            <div v-if="loginError" class="text-sm text-red-300">
              {{ loginError }}
            </div>

            <button
                class="w-full px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-medium transition"
                @click="doLogin"
            >
              Prihlásiť sa
            </button>
          </div>

          <div class="glass rounded-2xl p-5 border border-white/10 space-y-4">
            <div class="text-lg font-semibold">Registrácia</div>

            <div class="space-y-2">
              <label class="text-sm text-zinc-300">Meno</label>
              <input
                  v-model="regForm.name"
                  type="text"
                  class="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 outline-none"
                  placeholder="Tvoje meno"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm text-zinc-300">E-mail</label>
              <input
                  v-model="regForm.email"
                  type="email"
                  class="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 outline-none"
                  placeholder="email@example.com"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm text-zinc-300">Heslo</label>
              <input
                  v-model="regForm.password"
                  type="password"
                  class="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 outline-none"
                  placeholder="min. 4 znaky"
              />
            </div>

            <div v-if="regError" class="text-sm text-red-300">
              {{ regError }}
            </div>

            <button
                class="w-full px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition font-medium"
                @click="doRegister"
            >
              Vytvoriť účet
            </button>
          </div>
        </div>

        <div v-else class="space-y-6">
          <div class="glass rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div class="text-sm text-zinc-400">Prihlásený používateľ</div>
              <div class="text-lg font-semibold">{{ currentUser.name }}</div>
              <div class="text-sm text-zinc-300">{{ currentUser.email }}</div>
            </div>

            <router-link
                to="/schedule"
                class="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-medium transition text-center"
            >
              Kúpiť nový lístok
            </router-link>
          </div>

          <div class="space-y-3">
            <div class="text-lg font-semibold">Moje lístky</div>

            <div v-if="tickets.length === 0" class="glass rounded-2xl p-6 border border-white/10 text-zinc-300">
              Zatiaľ nemáš žiadne lístky.
            </div>

            <div v-else class="grid gap-4">
              <div
                  v-for="t in tickets"
                  :key="t.id"
                  class="glass rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div class="space-y-1">
                  <div class="font-semibold text-lg">{{ t.movieTitle }}</div>
                  <div class="text-sm text-zinc-300">
                    {{ hallName(t.hallId) }} • {{ t.date }} • {{ t.time }}
                  </div>
                  <div class="text-sm text-zinc-200">
                    Miesta: <span class="font-semibold">{{ t.seats.join(", ") }}</span>
                  </div>
                  <div class="text-sm text-zinc-300">
                    Cena: {{ t.pricePerSeat.toFixed(2) }} € × {{ t.seats.length }} =
                    <span class="font-semibold">{{ t.total.toFixed(2) }} €</span>
                  </div>
                  <div class="text-xs text-zinc-400">
                    Zakúpené: {{ formatDate(t.createdAt) }}
                  </div>
                </div>

                <div class="flex gap-2">
                  <router-link
                      :to="`/movie/${t.movieId}`"
                      class="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm"
                  >
                    Detail filmu
                  </router-link>

                  <button
                      class="px-4 py-2 rounded-2xl bg-black/30 hover:bg-black/45 border border-white/10 transition text-sm"
                      @click="removeTicket(t.id)"
                  >
                    Zmazať
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../stores/auth";
import { useCinemaStore } from "../stores/cinema";

export default {
  name: "ProfilePage",

  data() {
    return {
      loginForm: { email: "", password: "" },
      regForm: { name: "", email: "", password: "" },
      loginError: "",
      regError: "",
    };
  },

  computed: {
    ...mapState(useAuthStore, ["isLoggedIn", "currentUser"]),
    ...mapState(useCinemaStore, ["ticketsForUser", "hallById"]),

    tickets() {
      if (!this.currentUser) return [];
      return this.ticketsForUser(this.currentUser.id);
    },
  },

  methods: {
    ...mapActions(useAuthStore, ["login", "register", "logout"]),
    ...mapActions(useCinemaStore, ["removeTicket"]),

    doLogin() {
      this.loginError = "";
      const res = this.login(this.loginForm);
      if (!res.ok) this.loginError = res.message;
    },

    doRegister() {
      this.regError = "";
      const res = this.register(this.regForm);
      if (!res.ok) this.regError = res.message;
    },

    hallName(id) {
      const h = this.hallById(id);
      return h ? h.name : "Unknown";
    },

    formatDate(iso) {
      try {
        const d = new Date(iso);
        return d.toLocaleString();
      } catch {
        return iso;
      }
    },
  },
};
</script>
