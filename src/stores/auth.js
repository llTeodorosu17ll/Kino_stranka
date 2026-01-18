// src/stores/auth.js
import { defineStore } from "pinia";

const KEY = "kino_auth_v1";

function load() {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch {
        return null;
    }
}

function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
}

export const useAuthStore = defineStore("auth", {
    state: () =>
        load() || {
            users: [
                // { id, name, email, password }
            ],
            currentUserId: null,
        },

    getters: {
        isLoggedIn(state) {
            return !!state.currentUserId;
        },
        currentUser(state) {
            return state.users.find((u) => u.id === state.currentUserId) || null;
        },
    },

    actions: {
        persist() {
            save({
                users: this.users,
                currentUserId: this.currentUserId,
            });
        },

        register({ name, email, password }) {
            const e = String(email || "").trim().toLowerCase();
            const n = String(name || "").trim();
            const p = String(password || "");

            if (!n || !e || !p) {
                return { ok: false, message: "Vyplň všetky polia." };
            }
            if (!e.includes("@") || e.length < 5) {
                return { ok: false, message: "Neplatný e-mail." };
            }
            if (p.length < 4) {
                return { ok: false, message: "Heslo musí mať aspoň 4 znaky." };
            }
            if (this.users.some((u) => u.email === e)) {
                return { ok: false, message: "Používateľ s týmto e-mailom už existuje." };
            }

            const user = {
                id: "u_" + Date.now(),
                name: n,
                email: e,
                password: p, // demo-only (bez backendu)
            };

            this.users.push(user);
            this.currentUserId = user.id;
            this.persist();
            return { ok: true };
        },

        login({ email, password }) {
            const e = String(email || "").trim().toLowerCase();
            const p = String(password || "");

            const user = this.users.find((u) => u.email === e && u.password === p);
            if (!user) {
                return { ok: false, message: "Zlý e-mail alebo heslo." };
            }

            this.currentUserId = user.id;
            this.persist();
            return { ok: true };
        },

        logout() {
            this.currentUserId = null;
            this.persist();
        },
    },
});
