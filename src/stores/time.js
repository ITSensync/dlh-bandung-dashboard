import { defineStore } from "pinia";

export const useTimeStore = defineStore("time", {
  state: () => ({
    time: "",
    date: "",
  }),
  actions: {
    updateDateTime() {
      const now = new Date();

      // Format waktu: 00:00 (24 jam)
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      this.time = `${hours}:${minutes}`;

      // Format tanggal: 7 Feb 2025
      const day = now.getDate();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      this.date = `${day} ${month} ${year}`;
    },

    startClock() {
      this.updateDateTime();
      setInterval(this.updateDateTime, 1000);
    },
  },
});
