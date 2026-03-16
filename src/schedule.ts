/**
 * Schedule configuration for the GameDay stream.
 *
 * Edit the EVENT_DATE and times below to match your event.
 * All times are in CET (Europe/Vienna timezone).
 *
 * The player will automatically switch compositions based on the current time.
 */

// ─── Event date (YYYY-MM-DD) ────────────────────────────────────────
export const EVENT_DATE = "2026-03-17"; // Tuesday, March 17, 2026

// ─── Schedule (CET 24h format "HH:MM") ──────────────────────────────
// Each segment has a start time. The player switches when the clock hits that time.
export const SCHEDULE = [
  { id: "preshow",   start: "17:30", label: "Pre-Show Loop", desc: "Audio & stream test • Countdown to go-live" },
  { id: "mainevent", start: "18:00", label: "Live Stream", desc: "Welcome, speakers & GameDay instructions" },
  { id: "gameplay",  start: "18:30", label: "GameDay", desc: "2 hours of competitive cloud gaming across Europe" },
  { id: "closing",   start: "20:30", label: "Closing Ceremony", desc: "Winners & wrap-up" },
  { id: "end",       start: "21:00", label: "Stream Ended", desc: "" },
] as const;

// ─── Timezone ────────────────────────────────────────────────────────
export const TIMEZONE = "Europe/Vienna"; // CET/CEST

// ─── Composition metadata (must match Root.tsx) ──────────────────────
export const COMPOSITIONS = {
  preshow:   { fps: 30, width: 1280, height: 720, durationInFrames: 18000 }, // 10 min, loops 3×
  mainevent: { fps: 30, width: 1280, height: 720, durationInFrames: 54000 }, // 30 min
  gameplay:  { fps: 30, width: 1280, height: 720, durationInFrames: 216000 }, // 120 min
  closing:   { fps: 30, width: 1280, height: 720, durationInFrames: 21000 }, // ~11.7 min
} as const;
