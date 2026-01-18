<template>
  <section class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <div class="rounded-3xl border border-white/10 bg-black/45 p-4 md:p-6">
      <div class="glass rounded-3xl p-4 md:p-8 space-y-8">

        <div>
          <h1 class="text-3xl font-semibold">O nás</h1>
          <p class="text-zinc-300 mt-2 max-w-3xl">
            Kino Stránka je moderná webová stránka pre kamenné kino – prehľad filmov, anonce,
            detail filmu a jednoduchý nákup lístkov.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="glass rounded-2xl p-5 border border-white/10">
            <div class="text-lg font-semibold">Adresa</div>
            <div class="text-zinc-300 mt-2 text-sm">
              Hlavná 12, 949 01 Nitra<br />
              Slovensko
            </div>
          </div>

          <div class="glass rounded-2xl p-5 border border-white/10">
            <div class="text-lg font-semibold">Kontakt</div>
            <div class="text-zinc-300 mt-2 text-sm">
              +421 900 000 000<br />
              info@kinostranka.sk
            </div>
          </div>

          <div class="glass rounded-2xl p-5 border border-white/10">
            <div class="text-lg font-semibold">Otváracie hodiny</div>
            <div class="text-zinc-300 mt-2 text-sm">
              Po–Pi: 14:00 – 22:30<br />
              So–Ne: 12:00 – 23:00
            </div>
          </div>
        </div>

        <div class="glass rounded-2xl p-6 border border-white/10">
          <div class="text-lg font-semibold">Ako funguje táto verzia</div>
          <p class="text-zinc-300 mt-2 text-sm max-w-4xl">
            Projekt je zameraný na Vue.js (Router + Pinia). Údaje o filmoch a seansách sú v lokálnych dátach.
            Prihlásenie a lístky sa ukladajú do localStorage – bez backendu (demo).
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>
