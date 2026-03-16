import React, { useEffect, useState, useCallback } from "react";

const BASE = import.meta.env.BASE_URL;
const F = "'Amazon Ember','Inter',system-ui,sans-serif";

// Color palette (matches existing)
const D = "#0c0820";
const P = "#6c3fa0";
const V = "#8b5cf6";
const A = "#c084fc";
const G = "#fbbf24";
const W = "rgba(255,255,255,0.9)";
const DIM = "rgba(255,255,255,0.55)";

const EVENT_DATE = "2026-03-17";
const STREAM_START = "18:00";
const GAME_START = "18:30";

function msUntil(t: string) {
  return Math.max(0, new Date(`${EVENT_DATE}T${t}:00`).getTime() - Date.now());
}
function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
    m: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    s: String(s % 60).padStart(2, "0"),
  };
}

// ── 53+ European AWS User Groups ──────────────────────────────────────────────
const USER_GROUPS = [
  { city: "London", country: "United Kingdom", flag: "🇬🇧", tz: "CET+0" },
  { city: "Berlin", country: "Germany", flag: "🇩🇪", tz: "CET" },
  { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", tz: "CET" },
  { city: "Paris", country: "France", flag: "🇫🇷", tz: "CET" },
  { city: "Madrid", country: "Spain", flag: "🇪🇸", tz: "CET" },
  { city: "Barcelona", country: "Spain", flag: "🇪🇸", tz: "CET" },
  { city: "Stockholm", country: "Sweden", flag: "🇸🇪", tz: "CET" },
  { city: "Oslo", country: "Norway", flag: "🇳🇴", tz: "CET" },
  { city: "Copenhagen", country: "Denmark", flag: "🇩🇰", tz: "CET" },
  { city: "Helsinki", country: "Finland", flag: "🇫🇮", tz: "CET+1" },
  { city: "Dublin", country: "Ireland", flag: "🇮🇪", tz: "CET+0" },
  { city: "Brussels", country: "Belgium", flag: "🇧🇪", tz: "CET" },
  { city: "Zurich", country: "Switzerland", flag: "🇨🇭", tz: "CET" },
  { city: "Geneva", country: "Switzerland", flag: "🇨🇭", tz: "CET" },
  { city: "Vienna", country: "Austria", flag: "🇦🇹", tz: "CET" },
  { city: "Warsaw", country: "Poland", flag: "🇵🇱", tz: "CET" },
  { city: "Prague", country: "Czech Republic", flag: "🇨🇿", tz: "CET" },
  { city: "Bucharest", country: "Romania", flag: "🇷🇴", tz: "CET+1" },
  { city: "Athens", country: "Greece", flag: "🇬🇷", tz: "CET+1" },
  { city: "Lisbon", country: "Portugal", flag: "🇵🇹", tz: "CET-1" },
  { city: "Porto", country: "Portugal", flag: "🇵🇹", tz: "CET-1" },
  { city: "Munich", country: "Germany", flag: "🇩🇪", tz: "CET" },
  { city: "Hamburg", country: "Germany", flag: "🇩🇪", tz: "CET" },
  { city: "Frankfurt", country: "Germany", flag: "🇩🇪", tz: "CET" },
  { city: "Cologne", country: "Germany", flag: "🇩🇪", tz: "CET" },
  { city: "Düsseldorf", country: "Germany", flag: "🇩🇪", tz: "CET" },
  { city: "Stuttgart", country: "Germany", flag: "🇩🇪", tz: "CET" },
  { city: "Utrecht", country: "Netherlands", flag: "🇳🇱", tz: "CET" },
  { city: "Rotterdam", country: "Netherlands", flag: "🇳🇱", tz: "CET" },
  { city: "Lyon", country: "France", flag: "🇫🇷", tz: "CET" },
  { city: "Toulouse", country: "France", flag: "🇫🇷", tz: "CET" },
  { city: "Manchester", country: "United Kingdom", flag: "🇬🇧", tz: "CET+0" },
  { city: "Edinburgh", country: "United Kingdom", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", tz: "CET+0" },
  { city: "Birmingham", country: "United Kingdom", flag: "🇬🇧", tz: "CET+0" },
  { city: "Budapest", country: "Hungary", flag: "🇭🇺", tz: "CET" },
  { city: "Bratislava", country: "Slovakia", flag: "🇸🇰", tz: "CET" },
  { city: "Ljubljana", country: "Slovenia", flag: "🇸🇮", tz: "CET" },
  { city: "Zagreb", country: "Croatia", flag: "🇭🇷", tz: "CET" },
  { city: "Sofia", country: "Bulgaria", flag: "🇧🇬", tz: "CET+1" },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷", tz: "CET+1" },
  { city: "Kyiv", country: "Ukraine", flag: "🇺🇦", tz: "CET+1" },
  { city: "Tallinn", country: "Estonia", flag: "🇪🇪", tz: "CET+1" },
  { city: "Riga", country: "Latvia", flag: "🇱🇻", tz: "CET+1" },
  { city: "Vilnius", country: "Lithuania", flag: "🇱🇹", tz: "CET+1" },
  { city: "Luxembourg City", country: "Luxembourg", flag: "🇱🇺", tz: "CET" },
  { city: "Antwerp", country: "Belgium", flag: "🇧🇪", tz: "CET" },
  { city: "Ghent", country: "Belgium", flag: "🇧🇪", tz: "CET" },
  { city: "Milan", country: "Italy", flag: "🇮🇹", tz: "CET" },
  { city: "Rome", country: "Italy", flag: "🇮🇹", tz: "CET" },
  { city: "Turin", country: "Italy", flag: "🇮🇹", tz: "CET" },
  { city: "Reykjavik", country: "Iceland", flag: "🇮🇸", tz: "CET-1" },
  { city: "Nicosia", country: "Cyprus", flag: "🇨🇾", tz: "CET+1" },
  { city: "Valletta", country: "Malta", flag: "🇲🇹", tz: "CET" },
];

// ── Slide definitions ─────────────────────────────────────────────────────────
// Each slide has: id, duration (seconds), component
// Total loop should fill ~30 minutes when all slides repeat

type Slide = {
  id: string;
  duration: number; // seconds
  type: string;
  data?: Record<string, unknown>;
};

function buildSlides(): Slide[] {
  const slides: Slide[] = [];
  let ugIdx = 0;

  // We create a repeating sequence that fills ~30 min
  // 1 hero (12s) → 1 what's happening (14s) → 2 UGs → 1 community info (14s) → 2 UGs → 1 UG leaders (14s) → 2 UGs → 1 meet linda (14s) → 2 UGs → 1 meet anda+jerome (14s) → 2 UGs → 1 schedule (14s) → 2 UGs → 1 how it works (14s) → 2 UGs → 1 audio check (10s) → repeat

  const pattern = [
    { type: "hero", duration: 12 },
    { type: "whats-happening", duration: 14 },
    { type: "ug-spotlight", duration: 10 },
    { type: "ug-spotlight", duration: 10 },
    { type: "community-info", duration: 14 },
    { type: "ug-spotlight", duration: 10 },
    { type: "ug-spotlight", duration: 10 },
    { type: "ug-leaders", duration: 14 },
    { type: "ug-spotlight", duration: 10 },
    { type: "meet-linda", duration: 14 },
    { type: "ug-spotlight", duration: 10 },
    { type: "ug-spotlight", duration: 10 },
    { type: "meet-organizers", duration: 14 },
    { type: "ug-spotlight", duration: 10 },
    { type: "ug-spotlight", duration: 10 },
    { type: "schedule", duration: 14 },
    { type: "ug-spotlight", duration: 10 },
    { type: "how-it-works", duration: 14 },
    { type: "ug-spotlight", duration: 10 },
    { type: "ug-spotlight", duration: 10 },
    { type: "audio-check", duration: 10 },
  ];

  // one pattern iteration = 12+14+10+10+14+10+10+14+10+14+10+10+14+10+10+14+10+14+10+10+10 = 250s ≈ 4.2 min
  // 30 min = 1800s → need ~7-8 loops of the pattern
  const loops = 8;
  for (let l = 0; l < loops; l++) {
    for (const p of pattern) {
      const slideId = `${p.type}-${slides.length}`;
      if (p.type === "ug-spotlight") {
        slides.push({ id: slideId, duration: p.duration, type: p.type, data: { group: USER_GROUPS[ugIdx % USER_GROUPS.length] } });
        ugIdx++;
      } else {
        slides.push({ id: slideId, duration: p.duration, type: p.type });
      }
    }
  }
  return slides;
}

const ALL_SLIDES = buildSlides();

// ── CSS keyframe injection ────────────────────────────────────────────────────
const CSS = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes pulse {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.45; }
}
@keyframes pulseBorder {
  0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.4); }
  50%      { box-shadow: 0 0 0 10px rgba(251,191,36,0); }
}
@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-8px); }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes scaleIn {
  from { opacity:0; transform:scale(0.88); }
  to   { opacity:1; transform:scale(1); }
}
@keyframes countdownPulse {
  0%,100% { transform: scale(1); }
  50%      { transform: scale(1.04); }
}
`;

// ── Mini countdown (always visible top-right) ─────────────────────────────────
const MiniCountdown: React.FC<{ targetTime: string; label: string }> = ({ targetTime, label }) => {
  const [, tick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(i);
  }, []);
  const ms = msUntil(targetTime);
  const t = fmt(ms);
  const live = ms === 0;

  return (
    <div style={{
      position: "fixed", top: 16, right: 16, zIndex: 1000,
      background: "rgba(12,8,32,0.88)", backdropFilter: "blur(12px)",
      border: `1px solid ${live ? "#22c55e" : V}55`,
      borderRadius: 14, padding: "10px 16px",
      display: "flex", flexDirection: "column", alignItems: "center",
      boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px ${live ? "#22c55e" : V}22`,
      animation: live ? "none" : "pulseBorder 2s ease-in-out infinite",
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>
        {label}
      </div>
      {live ? (
        <div style={{ fontSize: 18, fontWeight: 800, color: "#22c55e", fontFamily: "monospace" }}>LIVE</div>
      ) : (
        <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 800, color: G, letterSpacing: 2, animation: "countdownPulse 1s ease-in-out infinite" }}>
          {t.d > 0 ? `${t.d}d ` : ""}{t.h}:{t.m}:{t.s}
        </div>
      )}
    </div>
  );
};

// ── Audio Reminder Banner (always visible bottom) ─────────────────────────────
const AudioBanner: React.FC = () => (
  <div style={{
    position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
    background: `linear-gradient(90deg, rgba(12,8,32,0.95) 0%, rgba(108,63,160,0.7) 50%, rgba(12,8,32,0.95) 100%)`,
    borderTop: `1px solid ${V}33`,
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 12, padding: "8px 20px",
  }}>
    <span style={{ fontSize: 16, animation: "pulse 1.4s ease-in-out infinite" }}>🔊</span>
    <span style={{ fontSize: 13, fontWeight: 700, color: W, letterSpacing: 1 }}>
      MAKE SURE YOUR AUDIO IS ON — Stream starts at <span style={{ color: G }}>18:00 CET</span>
    </span>
    <span style={{ fontSize: 10, color: DIM, marginLeft: 8 }}>
      · No audio during gameplay (18:30–20:30) · Audio returns for closing ceremony ·
    </span>
  </div>
);

// ── Progress bar ──────────────────────────────────────────────────────────────
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 1001,
    background: "rgba(255,255,255,0.08)",
  }}>
    <div style={{
      height: "100%",
      width: `${progress * 100}%`,
      background: `linear-gradient(90deg, ${V}, ${A}, ${G})`,
      transition: "width 0.5s linear",
      boxShadow: `0 0 8px ${A}88`,
    }} />
  </div>
);

// ── Slide: Hero ───────────────────────────────────────────────────────────────
const SlideHero: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 28, animation: "scaleIn 0.7s ease-out" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      <img src={`${BASE}img/community.png`} style={{ height: 110, filter: "drop-shadow(0 0 20px rgba(139,92,246,0.5))", animation: "float 4s ease-in-out infinite" }} />
      <div style={{ width: 2, height: 80, background: `linear-gradient(180deg, transparent, ${V}, transparent)` }} />
      <img src={`${BASE}img/gameday.png`} style={{ height: 160, filter: "drop-shadow(0 0 24px rgba(251,191,36,0.4))", animation: "float 4s ease-in-out infinite 0.5s" }} />
    </div>

    <div style={{ textAlign: "center", animation: "fadeInUp 0.8s ease-out 0.3s both" }}>
      <div style={{
        fontSize: 52, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1,
        background: `linear-gradient(135deg, ${W} 0%, ${A} 50%, ${G} 100%)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        The First-Ever
      </div>
      <div style={{
        fontSize: 52, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1,
        background: `linear-gradient(135deg, ${G} 0%, ${A} 100%)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        AWS Community GameDay Europe
      </div>
    </div>

    <div style={{ display: "flex", gap: 32, animation: "fadeInUp 0.8s ease-out 0.6s both" }}>
      {[
        { label: "User Groups", value: "53+" },
        { label: "Countries", value: "20+" },
        { label: "Timezones", value: "4+" },
        { label: "Competitors", value: "500+" },
      ].map((stat) => (
        <div key={stat.label} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: G, lineHeight: 1 }}>{stat.value}</div>
          <div style={{ fontSize: 13, color: A, marginTop: 4, textTransform: "uppercase", letterSpacing: 2 }}>{stat.label}</div>
        </div>
      ))}
    </div>

    <div style={{ fontSize: 16, color: DIM, letterSpacing: 2, animation: "fadeInUp 0.8s ease-out 0.9s both" }}>
      Tuesday, March 17, 2026 · Starting 18:00 CET
    </div>
  </div>
);

// ── Slide: What's Happening ───────────────────────────────────────────────────
const SlideWhatsHappening: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 10%", gap: 32, animation: "fadeInUp 0.7s ease-out" }}>
    <SectionLabel icon="📡" text="What's Happening Right Now" />

    <div style={{ fontSize: 28, fontWeight: 800, color: W, textAlign: "center", lineHeight: 1.4, animation: "fadeInUp 0.7s ease-out 0.1s both" }}>
      You are watching a <span style={{ color: G }}>live pre-show stream</span>
      <br />shared simultaneously across <span style={{ color: A }}>53 cities in Europe</span>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%", maxWidth: 820, animation: "fadeInUp 0.7s ease-out 0.2s both" }}>
      {[
        { icon: "🌍", title: "One Stream, 53 Cities", body: "Right now, AWS User Groups all over Europe are gathered in their local venues watching this exact stream. You're part of something huge." },
        { icon: "🎮", title: "The Competition", body: "At 18:30 CET, the game begins. All 53 groups will compete in a 2-hour AWS cloud challenge. Your local organizer will give you team codes." },
        { icon: "🔇", title: "No Audio During Gameplay", body: "The stream goes mute at 18:30 when GameDay starts. Your organizer will guide you locally. Audio returns at 20:30 for the Winners Ceremony." },
        { icon: "🏆", title: "Closing Ceremony at 20:30", body: "After 2 hours, we come back live to announce the winners. Stick around — you don't want to miss the celebration!" },
      ].map((card) => (
        <InfoCard key={card.title} icon={card.icon} title={card.title} body={card.body} />
      ))}
    </div>
  </div>
);

// ── Slide: Community Info ─────────────────────────────────────────────────────
const SlideCommunityInfo: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 10%", gap: 28, animation: "fadeInUp 0.7s ease-out" }}>
    <SectionLabel icon="☁️" text="About the AWS Community" />

    <div style={{ fontSize: 30, fontWeight: 800, color: W, textAlign: "center", lineHeight: 1.3, animation: "fadeInUp 0.7s ease-out 0.1s both" }}>
      What is the <span style={{ color: A }}>AWS Community</span>?
    </div>

    <div style={{ display: "flex", gap: 20, width: "100%", maxWidth: 900, animation: "fadeInUp 0.7s ease-out 0.2s both" }}>
      <BigTextCard
        icon="🤝"
        title="Community — Not AWS"
        body="The AWS Community is made up of regular developers, architects, and cloud enthusiasts — people who are NOT employed by Amazon. They're passionate volunteers who organize events, share knowledge, and build connections across Europe."
      />
      <BigTextCard
        icon="🏙️"
        title="Local User Groups"
        body="AWS User Groups are local communities in cities around the world. They meet regularly to share knowledge about cloud computing, AWS services, and real-world projects. Your event today is hosted by one of these groups."
      />
    </div>

    <div style={{ width: "100%", maxWidth: 900, background: `linear-gradient(135deg, ${P}22, ${V}15)`, border: `1px solid ${V}33`, borderRadius: 16, padding: "18px 24px", animation: "fadeInUp 0.7s ease-out 0.35s both" }}>
      <div style={{ fontSize: 15, color: W, lineHeight: 1.7, textAlign: "center" }}>
        💡 <strong style={{ color: G }}>Fun fact:</strong> This entire GameDay was organized by community volunteers — people who do this <em style={{ color: A }}>completely in their free time</em>, just like your local User Group leader who set up today's event in your city.
      </div>
    </div>
  </div>
);

// ── Slide: UG Leaders ─────────────────────────────────────────────────────────
const SlideUGLeaders: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 10%", gap: 28, animation: "fadeInUp 0.7s ease-out" }}>
    <SectionLabel icon="👥" text="AWS User Group Leaders" />

    <div style={{ fontSize: 30, fontWeight: 800, color: W, textAlign: "center", lineHeight: 1.3, animation: "fadeInUp 0.7s ease-out 0.1s both" }}>
      The people who made <span style={{ color: G }}>today possible</span>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, width: "100%", maxWidth: 920, animation: "fadeInUp 0.7s ease-out 0.2s both" }}>
      {[
        { icon: "🗓️", title: "They organize", body: "User Group leaders plan and run local meetups, finding venues, speakers, and sponsors — all voluntarily." },
        { icon: "📚", title: "They educate", body: "They share knowledge about AWS, cloud architecture, DevOps, AI/ML, and more with their local community." },
        { icon: "🌐", title: "They connect", body: "They create local networks of tech professionals, opening doors for career growth, mentorship, and collaboration." },
      ].map((card) => (
        <InfoCard key={card.title} icon={card.icon} title={card.title} body={card.body} />
      ))}
    </div>

    <div style={{ width: "100%", maxWidth: 920, background: `linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05))`, border: "1px solid rgba(34,197,94,0.25)", borderRadius: 16, padding: "16px 24px", animation: "fadeInUp 0.7s ease-out 0.35s both" }}>
      <div style={{ fontSize: 15, color: W, lineHeight: 1.7, textAlign: "center" }}>
        👏 <strong style={{ color: "#4ade80" }}>A huge thank-you</strong> to the leaders of all <strong style={{ color: G }}>53 User Groups</strong> participating today. Without them, this event wouldn't exist.
      </div>
    </div>
  </div>
);

// ── Slide: Meet Linda ─────────────────────────────────────────────────────────
const SlideMeetLinda: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 10%", gap: 28, animation: "scaleIn 0.7s ease-out" }}>
    <SectionLabel icon="🎙️" text="Your Host Today" />

    <div style={{ display: "flex", alignItems: "center", gap: 48, width: "100%", maxWidth: 900, animation: "fadeInUp 0.7s ease-out 0.15s both" }}>
      {/* Avatar placeholder */}
      <div style={{ flexShrink: 0, width: 180, height: 180, borderRadius: "50%", background: `linear-gradient(135deg, ${P}, ${V})`, border: `3px solid ${A}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, boxShadow: `0 0 40px ${V}44`, animation: "float 4s ease-in-out infinite" }}>
        🎙️
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 42, fontWeight: 900, color: W, lineHeight: 1 }}>Linda Mohamed</div>
        <div style={{ fontSize: 18, color: A, marginTop: 6, fontWeight: 600 }}>AWS Community Builder · Host & Co-Organizer</div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "AWS Community Builder and passionate cloud advocate",
            "One of the key organizers behind the first-ever AWS Community GameDay Europe",
            "Passionate about connecting people through the power of cloud technology",
            "Brings together AWS enthusiasts from 53 cities across Europe",
          ].map((point, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: W, animation: `fadeSlideIn 0.5s ease-out ${0.2 + i * 0.1}s both` }}>
              <span style={{ color: G, flexShrink: 0, marginTop: 1 }}>▸</span>
              <span style={{ lineHeight: 1.5 }}>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{ width: "100%", maxWidth: 900, background: `linear-gradient(135deg, ${P}22, ${V}15)`, border: `1px solid ${V}33`, borderRadius: 16, padding: "16px 24px", animation: "fadeInUp 0.7s ease-out 0.6s both" }}>
      <div style={{ fontSize: 15, color: DIM, textAlign: "center", lineHeight: 1.7 }}>
        Linda will introduce you to the event, the organizers, and the special guest — then the GameDay begins!
      </div>
    </div>
  </div>
);

// ── Slide: Meet Organizers ────────────────────────────────────────────────────
const SlideMeetOrganizers: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 10%", gap: 28, animation: "scaleIn 0.7s ease-out" }}>
    <SectionLabel icon="🏆" text="The Minds Behind This Event" />

    <div style={{ fontSize: 28, fontWeight: 800, color: W, textAlign: "center", lineHeight: 1.3, animation: "fadeInUp 0.7s ease-out 0.1s both" }}>
      Meet <span style={{ color: G }}>Anda & Jerome</span>
      <br /><span style={{ fontSize: 16, color: DIM, fontWeight: 400 }}>The visionaries who initiated and made this GameDay a reality</span>
    </div>

    <div style={{ display: "flex", gap: 32, width: "100%", maxWidth: 860, animation: "fadeInUp 0.7s ease-out 0.2s both" }}>
      <PersonCard
        emoji="✨"
        name="Anda"
        role="AWS Community GameDay Initiator"
        color={A}
        points={[
          "Pioneered the vision for the first pan-European AWS Community GameDay",
          "AWS Community figure who saw the potential for uniting 53 User Groups",
          "Dedicated countless volunteer hours to make this event possible",
        ]}
      />
      <PersonCard
        emoji="🚀"
        name="Jerome"
        role="AWS Community GameDay Co-Founder"
        color={G}
        points={[
          "Co-architected the event structure and competition framework",
          "AWS Community leader driving cross-border collaboration and knowledge sharing",
          "Key force behind the logistics that connected 20+ countries",
        ]}
      />
    </div>

    <div style={{ width: "100%", maxWidth: 860, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: "14px 24px", animation: "fadeInUp 0.7s ease-out 0.4s both" }}>
      <div style={{ fontSize: 14, color: W, textAlign: "center", lineHeight: 1.7 }}>
        🙌 <strong style={{ color: "#4ade80" }}>None of this is their job.</strong> Anda and Jerome organized this entirely as <em style={{ color: A }}>community volunteers</em> — in their free time, out of passion for the AWS Community.
      </div>
    </div>
  </div>
);

// ── Slide: Schedule ───────────────────────────────────────────────────────────
const SlideSchedule: React.FC = () => {
  const [, tick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(i);
  }, []);

  const milestones = [
    { time: "17:30", label: "Pre-Show Loop", desc: "Stream is live & looping — test your audio now!", icon: "📡", muted: true, id: "pre" },
    { time: "18:00", label: "Live Stream Begins", desc: "Welcome, introductions & special guest", icon: "🎙️", muted: false, id: "live" },
    { time: "18:30", label: "GameDay Starts!", desc: "2 hours of competitive AWS cloud challenges", icon: "🎮", muted: true, id: "game", highlight: true },
    { time: "20:30", label: "Closing Ceremony", desc: "Winners announced — stay in the stream!", icon: "🏆", muted: false, id: "close" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 10%", gap: 24, animation: "fadeInUp 0.7s ease-out" }}>
      <SectionLabel icon="🗓️" text="Today's Schedule (CET)" />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 780, animation: "fadeInUp 0.7s ease-out 0.1s both" }}>
        {milestones.map((ms, i) => {
          const remaining = msUntil(ms.time);
          const isLive = remaining === 0;
          const t = fmt(remaining);
          return (
            <div key={ms.id} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "16px 24px", borderRadius: 16,
              background: isLive ? "rgba(34,197,94,0.12)" : ms.highlight ? `${G}0a` : "rgba(255,255,255,0.04)",
              border: `1px solid ${isLive ? "rgba(34,197,94,0.4)" : ms.highlight ? `${G}25` : "rgba(255,255,255,0.08)"}`,
              animation: `fadeSlideIn 0.5s ease-out ${i * 0.08}s both`,
            }}>
              <div style={{ fontSize: 28, flexShrink: 0, width: 36, textAlign: "center" }}>{ms.icon}</div>
              <div style={{ width: 64, flexShrink: 0 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: isLive ? "#22c55e" : W }}>{ms.time}</div>
                <div style={{ fontSize: 11, color: ms.muted ? "#f87171" : "#4ade80", marginTop: 2, fontWeight: 600 }}>
                  {ms.muted ? "🔇 muted" : "🔊 audio"}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: isLive ? "#22c55e" : ms.highlight ? G : W }}>{ms.label}</div>
                <div style={{ fontSize: 13, color: DIM, marginTop: 2 }}>{ms.desc}</div>
              </div>
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                {isLive ? (
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.15)", padding: "4px 10px", borderRadius: 8 }}>LIVE NOW</span>
                ) : (
                  <span style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: ms.highlight ? G : A }}>
                    {t.d > 0 ? `${t.d}d ` : ""}{t.h}:{t.m}:{t.s}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 14, color: DIM, animation: "fadeInUp 0.7s ease-out 0.4s both" }}>
        All times in CET · Stream is broadcast simultaneously to all 53 participating User Groups
      </div>
    </div>
  );
};

// ── Slide: How It Works ───────────────────────────────────────────────────────
const SlideHowItWorks: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 10%", gap: 28, animation: "fadeInUp 0.7s ease-out" }}>
    <SectionLabel icon="🎮" text="How the GameDay Works" />

    <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 960, animation: "fadeInUp 0.7s ease-out 0.1s both" }}>
      {[
        { num: "1", icon: "👥", title: "Form Your Team", body: "Before the stream starts, gather your team locally. Your organizer will tell you the team size. Teams compete together at your venue." },
        { num: "2", icon: "📋", title: "Get Instructions", body: "At 18:00, the live stream begins. Linda and the speakers will explain the rules. Watch carefully — this is important!" },
        { num: "3", icon: "🔑", title: "Receive Your Code", body: "At 18:30 your local organizer gives your team an AWS access code. This is your gateway into the competitive AWS environment." },
        { num: "4", icon: "⚡", title: "Compete!", body: "You have 2 hours to complete AWS challenges. Earn points for your team and your User Group. The best team across Europe wins!" },
        { num: "5", icon: "🏆", title: "Watch the Results", body: "At 20:30 the stream comes back live. Winners are announced globally. Stay in the stream and celebrate together!" },
      ].map((step, i) => (
        <div key={step.num} style={{
          flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${V}25`,
          borderRadius: 16, padding: "20px 16px", textAlign: "center",
          animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both`,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${P}, ${V})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 14, fontWeight: 800, color: W }}>{step.num}</div>
          <div style={{ fontSize: 26, marginBottom: 8 }}>{step.icon}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: W, marginBottom: 6 }}>{step.title}</div>
          <div style={{ fontSize: 12, color: DIM, lineHeight: 1.5 }}>{step.body}</div>
        </div>
      ))}
    </div>
  </div>
);

// ── Slide: Audio Check ────────────────────────────────────────────────────────
const SlideAudioCheck: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 32, animation: "scaleIn 0.5s ease-out" }}>
    <div style={{ fontSize: 96, animation: "pulse 1.2s ease-in-out infinite" }}>🔊</div>

    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 52, fontWeight: 900, color: G, lineHeight: 1, animation: "pulse 1.5s ease-in-out infinite" }}>
        AUDIO CHECK!
      </div>
      <div style={{ fontSize: 24, color: W, marginTop: 12, fontWeight: 600 }}>
        Can you hear this stream?
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 600, animation: "fadeInUp 0.7s ease-out 0.3s both" }}>
      {[
        { icon: "✅", text: "Make sure your venue audio is connected to this stream", color: "#4ade80" },
        { icon: "🎧", text: "Test audio NOW — the live stream starts soon at 18:00 CET", color: "#4ade80" },
        { icon: "📱", text: "If audio fails, use the backup video link provided by your organizer", color: G },
        { icon: "🔇", text: "Note: stream goes mute during gameplay (18:30–20:30 CET)", color: A },
      ].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
          <span style={{ fontSize: 16, color: item.color, fontWeight: 500 }}>{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Slide: User Group Spotlight ───────────────────────────────────────────────
const SlideUGSpotlight: React.FC<{ group: { city: string; country: string; flag: string; tz: string } }> = ({ group }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 20, animation: "scaleIn 0.6s ease-out" }}>
    <div style={{ fontSize: 16, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 4 }}>
      Competing Today
    </div>

    {/* Flag huge */}
    <div style={{ fontSize: 140, lineHeight: 1, filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))", animation: "float 3s ease-in-out infinite" }}>
      {group.flag}
    </div>

    <div style={{ textAlign: "center", animation: "fadeInUp 0.5s ease-out 0.2s both" }}>
      <div style={{
        fontSize: 64, fontWeight: 900, lineHeight: 1.1,
        background: `linear-gradient(135deg, ${W}, ${A})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        AWS UG {group.city}
      </div>
      <div style={{ fontSize: 24, color: A, marginTop: 6, fontWeight: 500 }}>{group.country}</div>
    </div>

    <div style={{ display: "flex", gap: 24, marginTop: 8, animation: "fadeInUp 0.5s ease-out 0.35s both" }}>
      <div style={{ textAlign: "center", padding: "12px 24px", background: `${V}18`, border: `1px solid ${V}33`, borderRadius: 12 }}>
        <div style={{ fontSize: 12, color: A, textTransform: "uppercase", letterSpacing: 2 }}>Timezone</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: W, marginTop: 4 }}>{group.tz}</div>
      </div>
      <div style={{ textAlign: "center", padding: "12px 24px", background: `${G}12`, border: `1px solid ${G}30`, borderRadius: 12 }}>
        <div style={{ fontSize: 12, color: A, textTransform: "uppercase", letterSpacing: 2 }}>Part of</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: G, marginTop: 4 }}>53+ Groups</div>
      </div>
      <div style={{ textAlign: "center", padding: "12px 24px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 12 }}>
        <div style={{ fontSize: 12, color: A, textTransform: "uppercase", letterSpacing: 2 }}>Status</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#4ade80", marginTop: 4 }}>COMPETING</div>
      </div>
    </div>

    <div style={{ fontSize: 15, color: DIM, marginTop: 4, animation: "fadeInUp 0.5s ease-out 0.5s both" }}>
      One of <strong style={{ color: W }}>53+ AWS User Groups</strong> competing in the first-ever AWS Community GameDay Europe
    </div>
  </div>
);

// ── Helper components ─────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 3, animation: "fadeIn 0.5s ease-out" }}>
    <span style={{ fontSize: 18 }}>{icon}</span>
    {text}
  </div>
);

const InfoCard: React.FC<{ icon: string; title: string; body: string }> = ({ icon, title, body }) => (
  <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${V}25`, borderRadius: 16, padding: "20px 22px" }}>
    <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: W, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 13, color: DIM, lineHeight: 1.6 }}>{body}</div>
  </div>
);

const BigTextCard: React.FC<{ icon: string; title: string; body: string }> = ({ icon, title, body }) => (
  <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${V}25`, borderRadius: 16, padding: "24px 26px" }}>
    <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontSize: 18, fontWeight: 700, color: W, marginBottom: 10 }}>{title}</div>
    <div style={{ fontSize: 14, color: DIM, lineHeight: 1.7 }}>{body}</div>
  </div>
);

const PersonCard: React.FC<{ emoji: string; name: string; role: string; color: string; points: string[] }> = ({ emoji, name, role, color, points }) => (
  <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${V}25`, borderRadius: 18, padding: "28px 26px" }}>
    <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${P}, ${V})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, marginBottom: 14, animation: "float 4s ease-in-out infinite" }}>
      {emoji}
    </div>
    <div style={{ fontSize: 28, fontWeight: 900, color: W }}>{name}</div>
    <div style={{ fontSize: 14, color, marginTop: 4, marginBottom: 14, fontWeight: 600 }}>{role}</div>
    {points.map((p, i) => (
      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: DIM, marginBottom: 8, lineHeight: 1.5 }}>
        <span style={{ color, flexShrink: 0 }}>▸</span>
        <span>{p}</span>
      </div>
    ))}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
export const PreShowInfoV2: React.FC = () => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const currentSlide = ALL_SLIDES[slideIdx % ALL_SLIDES.length];

  const advance = useCallback(() => {
    setSlideIdx((i) => (i + 1) % ALL_SLIDES.length);
    setSlideProgress(0);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const dur = currentSlide.duration * 1000;
    const step = 100;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += step;
      setSlideProgress(elapsed / dur);
      if (elapsed >= dur) {
        clearInterval(interval);
        advance();
      }
    }, step);
    return () => clearInterval(interval);
  }, [slideIdx, currentSlide.duration, advance]);

  // Determine which stream countdown to show
  const streamMs = msUntil(STREAM_START);
  const gameMs = msUntil(GAME_START);
  const showStreamCountdown = streamMs > 0;

  function renderSlide() {
    const s = currentSlide;
    switch (s.type) {
      case "hero": return <SlideHero />;
      case "whats-happening": return <SlideWhatsHappening />;
      case "community-info": return <SlideCommunityInfo />;
      case "ug-leaders": return <SlideUGLeaders />;
      case "meet-linda": return <SlideMeetLinda />;
      case "meet-organizers": return <SlideMeetOrganizers />;
      case "schedule": return <SlideSchedule />;
      case "how-it-works": return <SlideHowItWorks />;
      case "audio-check": return <SlideAudioCheck />;
      case "ug-spotlight": {
        const g = s.data?.group as { city: string; country: string; flag: string; tz: string };
        return g ? <SlideUGSpotlight group={g} /> : <SlideHero />;
      }
      default: return <SlideHero />;
    }
  }

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", fontFamily: F, background: D, overflow: "hidden" }}>
      <style>{CSS}</style>

      {/* Background image */}
      <img src={`${BASE}img/bg.png`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />

      {/* Dark overlay with gradient */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${P}18 0%, ${D}cc 70%, ${D}f0 100%)` }} />

      {/* Hex grid overlay */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }}>
        <defs>
          <pattern id="hex2" width="70" height="60" patternUnits="userSpaceOnUse">
            <path d="M35 0 L70 17.5 L70 42.5 L35 60 L0 42.5 L0 17.5 Z" fill="none" stroke={V} strokeWidth={0.6} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex2)" />
      </svg>

      {/* Ambient glow orbs */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(${P}18, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(${V}12, transparent 70%)`, pointerEvents: "none" }} />

      {/* Progress bar */}
      <ProgressBar progress={slideProgress} />

      {/* Always-on countdown (top-right) */}
      <MiniCountdown
        targetTime={showStreamCountdown ? STREAM_START : GAME_START}
        label={showStreamCountdown ? "Stream Starts In" : "Game Starts In"}
      />

      {/* Slide content */}
      <div key={animKey} style={{ position: "absolute", inset: 0, paddingBottom: 50 }}>
        {renderSlide()}
      </div>

      {/* Audio banner (bottom) */}
      <AudioBanner />

      {/* Slide type indicator (bottom-left, subtle) */}
      <div style={{ position: "fixed", bottom: 44, left: 16, zIndex: 998, display: "flex", gap: 4, alignItems: "center" }}>
        {ALL_SLIDES.slice(0, Math.min(20, ALL_SLIDES.length)).map((_, i) => (
          <div key={i} style={{ width: i === slideIdx % ALL_SLIDES.length ? 16 : 4, height: 4, borderRadius: 2, background: i === slideIdx % ALL_SLIDES.length ? A : `${V}40`, transition: "all 0.3s ease" }} />
        ))}
        <span style={{ fontSize: 10, color: DIM, marginLeft: 6 }}>{((slideIdx % ALL_SLIDES.length) + 1)}/{ALL_SLIDES.length}</span>
      </div>

      {/* Pre-show label top-left */}
      <div style={{ position: "fixed", top: 16, left: 16, zIndex: 998, background: "rgba(12,8,32,0.8)", backdropFilter: "blur(8px)", border: `1px solid ${P}44`, borderRadius: 10, padding: "6px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f87171", animation: "pulse 1.5s ease-in-out infinite" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: DIM, textTransform: "uppercase", letterSpacing: 2 }}>Pre-Show Loop</span>
      </div>
    </div>
  );
};
