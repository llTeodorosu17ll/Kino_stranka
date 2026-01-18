// src/stores/cinema.js
import { defineStore } from "pinia";
import { movies as moviesData } from "../data/movies";
import { halls as hallsData, sessions as sessionsData } from "../data/schedule";
import { useAuthStore } from "./auth";

const KEY = "kino_cinema_v3"; // новая версия ключа, чтобы точно не тянуло старое

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

export const useCinemaStore = defineStore("cinema", {
    state: () => {
        const persisted = load();

        return {
            // ✅ ДАННЫЕ КИНО: всегда из файлов (обновляются сразу)
            movies: moviesData,
            halls: hallsData,
            sessions: sessionsData,

            // ✅ UI фильтры и выбор (можно хранить)
            filters: persisted?.filters || { query: "", genre: "All", date: "", hallId: "all" },

            selectedSessionId: persisted?.selectedSessionId || null,
            selectedSeats: persisted?.selectedSeats || [],

            // ✅ Билеты по пользователю (храним)
            ticketsByUser: persisted?.ticketsByUser || {},
        };
    },

    getters: {
        nowPlaying(state) {
            return state.movies.filter((m) => m.status === "now");
        },

        movieById: (state) => (id) => state.movies.find((m) => m.id === id) || null,
        hallById: (state) => (id) => state.halls.find((h) => h.id === id) || null,
        sessionById: (state) => (id) => state.sessions.find((s) => s.id === id) || null,

        filteredSessions(state) {
            const { date, hallId } = state.filters;
            return state.sessions
                .filter((s) => (date ? s.date === date : true))
                .filter((s) => (hallId === "all" ? true : s.hallId === hallId));
        },

        ticketsForUser: (state) => (userId) => {
            if (!userId) return [];
            return state.ticketsByUser[userId] || [];
        },
    },

    actions: {
        persist() {
            // ✅ сохраняем ТОЛЬКО пользовательские данные, не movies/halls/sessions
            save({
                filters: this.filters,
                selectedSessionId: this.selectedSessionId,
                selectedSeats: this.selectedSeats,
                ticketsByUser: this.ticketsByUser,
            });
        },

        setQuery(v) {
            this.filters.query = v;
            this.persist();
        },
        setDate(v) {
            this.filters.date = v;
            this.persist();
        },
        setHall(v) {
            this.filters.hallId = v;
            this.persist();
        },

        openSession(id) {
            this.selectedSessionId = id;
            this.selectedSeats = [];
            this.persist();
        },

        toggleSeat(code) {
            const idx = this.selectedSeats.indexOf(code);
            if (idx >= 0) this.selectedSeats.splice(idx, 1);
            else this.selectedSeats.push(code);
            this.persist();
        },

        buyTickets() {
            const auth = useAuthStore();
            if (!auth.currentUserId) {
                return { ok: false, message: "Najprv sa prihlás." };
            }

            const s = this.sessionById(this.selectedSessionId);
            if (!s) return { ok: false, message: "Neplatný seans." };
            if (this.selectedSeats.length === 0) return { ok: false, message: "Vyber miesta." };

            const movie = this.movieById(s.movieId);

            const ticket = {
                id: "t_" + Date.now(),
                userId: auth.currentUserId,
                movieId: s.movieId,
                movieTitle: movie ? movie.title : "Unknown",
                hallId: s.hallId,
                date: s.date,
                time: s.time,
                pricePerSeat: s.price,
                seats: [...this.selectedSeats],
                total: Number((s.price * this.selectedSeats.length).toFixed(2)),
                createdAt: new Date().toISOString(),
            };

            if (!this.ticketsByUser[auth.currentUserId]) {
                this.ticketsByUser[auth.currentUserId] = [];
            }
            this.ticketsByUser[auth.currentUserId].unshift(ticket);

            this.selectedSessionId = null;
            this.selectedSeats = [];
            this.persist();

            return { ok: true, ticketId: ticket.id };
        },

        removeTicket(ticketId) {
            const auth = useAuthStore();
            const uid = auth.currentUserId;
            if (!uid) return;

            const list = this.ticketsByUser[uid] || [];
            this.ticketsByUser[uid] = list.filter((t) => t.id !== ticketId);
            this.persist();
        },
    },
});
