# App Store submission kit

Everything needed to list Gym Log. Copy/paste the listing fields into
App Store Connect when the time comes.

## Build & submit commands (run once accounts exist)

```bash
cd gym-log
npm install -g eas-cli          # or use: npx eas-cli@latest <cmd>
eas login                       # your free Expo account
eas init                        # links this project to your Expo account
eas build --platform ios --profile production   # cloud build → .ipa (~15 min)
eas submit --platform ios --latest              # uploads to App Store Connect / TestFlight
```

EAS will offer to create the Apple certificates, provisioning profile, and the
App Store Connect app record for you — say yes to each. You'll sign in with your
Apple Developer account once and it handles the rest.

## Listing fields

**App name:** Gym Log

**Subtitle (30 chars max):** Simple workout & glute tracker

**Promotional text (170 chars):**
Log lifts in seconds, follow built-in routines like Bro Split, A/B and Booty
Builder, and watch your weights climb. Free, no account, no ads.

**Description:**
Gym Log is the no-nonsense way to track your training.

Pick a ready-made routine — Bro Split (5 days), A/B Day (3 days), or the
glute-focused Booty Builder (3 days) — or build your own. Start a workout and
your last weights are pre-filled, so progressive overload is just bumping the
number up.

• Fast set logging — weight × reps, tap to mark a set done
• Built-in routines, plus a full custom routine builder
• 40+ exercises by muscle group, add your own anytime
• Repeat any past workout in one tap
• Full history with volume, sets and duration
• Works in kg or lb
• Everything stored on your device — no account, no ads, no subscription

Free, forever.

**Keywords (100 chars):**
gym,workout,log,lifting,routine,glutes,booty,strength,exercise,tracker,sets,reps,progressive overload

**Support URL:** (a simple page or email link — e.g. a GitHub repo README)
**Privacy Policy URL:** (host PRIVACY.md — see below)
**Category:** Health & Fitness
**Price:** Free

## App privacy ("nutrition label") answers

When App Store Connect asks what data you collect, select:
**"Data Not Collected."** Gym Log stores everything locally and has no servers.

## Hosting the privacy policy (free)

Apple needs a public URL. Easiest free options:
1. Create a public GitHub repo, add PRIVACY.md, enable GitHub Pages → use that URL.
2. Or paste the text into a free GitHub Gist and use its raw URL.

## Screenshots

Apple requires screenshots for a 6.7" iPhone (1290×2796). Once the app is on
your phone via TestFlight, take screenshots of: Today, an active workout,
Routines (Booty Builder expanded), and History. I can help frame these.
