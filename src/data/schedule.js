// src/data/schedule.js
export const halls = [
    { id: "hall1", name: "Sála 1" },
    { id: "hall2", name: "Sála 2" },
    { id: "vip", name: "VIP" },
];

// даты ISO: YYYY-MM-DD
export const sessions = [
    // Avatar
    { id: "s1", movieId: "avatar-2009", hallId: "hall1", date: "2026-01-17", time: "16:45", price: 7.9 },
    { id: "s2", movieId: "avatar-2009", hallId: "hall1", date: "2026-01-17", time: "19:30", price: 8.9 },
    { id: "s3", movieId: "avatar-2009", hallId: "vip",   date: "2026-01-18", time: "20:00", price: 11.9 },

    // Zootropolis
    { id: "s4", movieId: "zootopia-2016", hallId: "hall2", date: "2026-01-17", time: "18:10", price: 7.5 },
    { id: "s5", movieId: "zootopia-2016", hallId: "hall2", date: "2026-01-18", time: "15:30", price: 7.0 },
    { id: "s6", movieId: "zootopia-2016", hallId: "hall1", date: "2026-01-18", time: "17:50", price: 7.9 },

    // SpongeBob
    { id: "s7", movieId: "spongebob-run-2020", hallId: "hall2", date: "2026-01-17", time: "14:20", price: 6.9 },
    { id: "s8", movieId: "spongebob-run-2020", hallId: "hall1", date: "2026-01-17", time: "16:10", price: 7.2 },
    { id: "s9", movieId: "spongebob-run-2020", hallId: "hall1", date: "2026-01-18", time: "13:40", price: 6.9 },
];
