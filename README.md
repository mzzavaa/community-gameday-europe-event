# AWS Community GameDay Europe — Event Config

This repository holds the event-specific configuration for the
[AWS Community GameDay Europe](https://github.com/mzzavaa/community-gameday-europe-stream)
countdown page and web player.

All web-player and composition code lives in the stream template repo.
This repo contains only what changes between editions.

## How it works

On every push to `main`, GitHub Actions:
1. Checks out the [stream template repo](https://github.com/mzzavaa/community-gameday-europe-stream)
2. Injects all files from `config/` into the template
3. Merges face photos from `public/faces/` (if present)
4. Builds the web player
5. Deploys to GitHub Pages

## Adapting for a new edition

Edit the files in `config/`:

| File | What to change |
|------|---------------|
| `config/schedule.ts` | Event date, segment start times, timezone |
| `config/participants.ts` | Organizers, AWS supporters, participating user groups |
| `config/logos.ts` | User group logo URLs (Notion CDN, Meetup, or any public URL) |
| `config/inserts.md` | Insert schedule, team spotlight prep, city shoutout list |

Add organizer face photos to `public/faces/` (e.g. `firstname.jpg`, all lowercase).
They will be merged into the template's asset folder at build time.

Push to `main` — GitHub Pages updates automatically.

## Repository structure

```
config/
  schedule.ts      ← Event date, segment times, timezone
  participants.ts  ← Organizers, AWS supporters, user group list
  logos.ts         ← User group logo URLs for pre-show spotlight
  inserts.md       ← Insert schedule and operator prep for this edition
public/
  faces/           ← Organizer face photos (firstname.jpg)
.github/workflows/
  deploy.yml       ← Builds from stream template + deploys to GitHub Pages
LICENSE
README.md
```

## Schedule (CET)

| Time  | Segment           | Audio  | Description                                      |
|-------|-------------------|--------|--------------------------------------------------|
| 17:30 | Pre-Show Loop     | Muted  | Audio & stream test (optional)                   |
| 18:00 | Live Stream       | Audio  | Welcome, speakers & GameDay instructions         |
| 18:30 | GameDay           | Muted  | 2 hours of competitive cloud gaming              |
| 20:30 | Closing Ceremony  | Audio  | Winners & wrap-up                                |

All times are CET (Central European Time). The event spans 4+ timezones across 20+ countries.

## License

[CC BY-NC-SA 4.0](LICENSE) — built by community volunteers for non-commercial community use.
