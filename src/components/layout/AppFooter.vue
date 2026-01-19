<template>
  <footer class="mt-10">
    <div class="max-w-6xl mx-auto px-4 pb-8">
      <div class="rounded-3xl border border-white/10 bg-black/35 backdrop-blur">
        <div class="p-5 md:p-6 space-y-6">
          <!-- TOP -->
          <div class="grid lg:grid-cols-3 gap-6">
            <!-- Column 1 -->
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-red-600 grid place-items-center font-bold">KS</div>
                <div class="leading-tight">
                  <div class="font-semibold">Kino Stránka</div>
                  <div class="text-xs text-zinc-300">kamenné kino • moderný web</div>
                </div>
              </div>

              <p class="text-sm text-zinc-300 max-w-sm">
                Prehľad filmov, anonce, detail filmu a nákup lístkov (demo bez backendu).
                Údaje sa ukladajú do localStorage.
              </p>

              <div class="flex flex-wrap gap-2">
                <router-link
                    to="/schedule"
                    class="px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 font-medium transition text-sm"
                >
                  Kúpiť lístok
                </router-link>

                <router-link
                    to="/reviews"
                    class="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm"
                >
                  Zanechať recenziu
                </router-link>
              </div>
            </div>

            <!-- Column 2 -->
            <div class="glass rounded-2xl p-5 border border-white/10 space-y-3">
              <div class="font-semibold">Otváracie hodiny</div>

              <div class="text-sm text-zinc-300 grid gap-2">
                <div class="flex items-center justify-between">
                  <span>Po–Št</span><span class="text-white/90">14:00 – 22:30</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Pia</span><span class="text-white/90">14:00 – 23:00</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>So</span><span class="text-white/90">12:00 – 23:30</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Ne</span><span class="text-white/90">12:00 – 22:30</span>
                </div>
              </div>

              <div class="text-xs text-zinc-400">
                Pokladňa zatvára 15 min pred posledným predstavením.
              </div>
            </div>

            <!-- Column 3 -->
            <div class="glass rounded-2xl p-5 border border-white/10 space-y-3">
              <div class="font-semibold">Kontakt & info</div>

              <div class="text-sm text-zinc-300">
                Hlavná 12, 949 01 Nitra<br />
                +421 900 000 000<br />
                info@kinostranka.sk
              </div>

              <div class="text-sm text-zinc-300">
                <span class="text-white/90">Doprava:</span> MHD zastávka 2 min pešy<br />
                <span class="text-white/90">Parkovanie:</span> 3h zdarma pri nákupe lístka
              </div>

              <!-- Newsletter (demo) -->
              <div class="pt-2">
                <div class="text-xs text-zinc-400 mb-2">Newsletter (demo)</div>
                <div class="flex gap-2">
                  <input
                      type="email"
                      class="flex-1 px-4 py-2 rounded-2xl bg-black/20 border border-white/10 outline-none text-sm"
                      placeholder="email@example.com"
                      v-model="email"
                  />
                  <button
                      class="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm"
                      @click="subscribe"
                  >
                    OK
                  </button>
                </div>
                <div v-if="msg" class="text-xs text-zinc-400 mt-2">
                  {{ msg }}
                </div>
              </div>
            </div>
          </div>

          <!-- BOTTOM -->
          <div class="pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div class="text-xs text-zinc-400">
              © {{ year }} Kino Stránka • Vue 3 • Vite • Pinia • Tailwind • LocalStorage
            </div>

            <div class="flex gap-2 flex-wrap">
              <span class="text-xs px-3 py-1 rounded-2xl bg-white/10 border border-white/10 text-zinc-300">Demo</span>
              <span class="text-xs px-3 py-1 rounded-2xl bg-white/10 border border-white/10 text-zinc-300">No backend</span>
              <span class="text-xs px-3 py-1 rounded-2xl bg-white/10 border border-white/10 text-zinc-300">Tickets saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      email: "",
      msg: "",
    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
  methods: {
    subscribe() {
      const e = String(this.email || "").trim();
      if (!e || !e.includes("@")) {
        this.msg = "Zadaj platný e-mail (demo).";
        return;
      }
      this.msg = "Ďakujeme! (demo – bez odosielania)";
      this.email = "";
      setTimeout(() => (this.msg = ""), 2500);
    },
  },
};
</script>
