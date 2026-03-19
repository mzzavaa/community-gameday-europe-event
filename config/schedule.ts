/**
 * Event configuration for AWS Community GameDay Europe.
 *
 * This is the only file you need to change for a new edition.
 * It is merged into the stream template at build time by GitHub Actions.
 *
 * All times are CET (Europe/Vienna timezone).
 */

// ─── Event date (YYYY-MM-DD) ────────────────────────────────────────────────
export const EVENT_DATE = "2026-03-17"; // Tuesday, March 17, 2026

// ─── Schedule (CET 24h format "HH:MM") ─────────────────────────────────────
// Each segment has a start time. The player switches when the clock hits that time.
export const SCHEDULE = [
  { id: "preshow",   start: "17:30", label: "Pre-Show Loop",     desc: "Audio & stream test • Countdown to go-live" },
  { id: "mainevent", start: "18:00", label: "Live Stream",        desc: "Welcome, speakers & GameDay instructions" },
  { id: "gameplay",  start: "18:30", label: "GameDay",            desc: "2 hours of competitive cloud gaming across Europe" },
  { id: "closing",   start: "20:30", label: "Closing Ceremony",   desc: "Winners & wrap-up" },
  { id: "end",       start: "21:00", label: "Stream Ended",       desc: "" },
] as const;

// ─── Timezone ────────────────────────────────────────────────────────────────
export const TIMEZONE = "Europe/Vienna"; // CET/CEST

// ─── Composition metadata (must match Root.tsx in the stream repo) ───────────
export const COMPOSITIONS = {
  preshow:   { fps: 30, width: 1280, height: 720, durationInFrames: 54000  }, // 30 min
  mainevent: { fps: 30, width: 1280, height: 720, durationInFrames: 54000  }, // 30 min
  gameplay:  { fps: 30, width: 1280, height: 720, durationInFrames: 216000 }, // 120 min
  closing:   { fps: 30, width: 1280, height: 720, durationInFrames: 21000  }, // ~11.7 min
} as const;
