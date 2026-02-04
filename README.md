# 🎵 Rafi.Live (The Rafi Room)

An interactive, real-time synchronized listening room dedicated to the legend, **Mohammed Rafi**. Built with Next.js 15+, Supabase Realtime, and the Web Audio API.

Live at: [rafi.anujoza.me](https://rafi.anujoza.me)

## 🚀 The Concept
Most music apps are solo experiences. **Rafi.Live** is social. Every visitor hears the exact same beat at the exact same millisecond. It uses a "Virtual DJ" logic to calculate time offsets, ensuring that whether you join from Instagram or a desktop, you are in sync with the global "Room."

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Database/Realtime:** Supabase (PostgreSQL + WebSockets)
- **Audio Engine:** Web Audio API (Custom Canvas Visualizer)
- **Hosting:** AWS Amplify
- **Domain:** Route 53 (`anujoza.me`)

## ⚡ Key Features
- **Global Sync:** Real-time state management ensures all users are synchronized.
- **Dynamic Visualizer:** A custom HTML5 Canvas "Rafi Ring" that reacts to audio frequencies in real-time.
- **Vibe Check (Coming Soon):** A community voting system to decide the next song's mood.
- **Mobile Optimized:** Designed specifically to be accessed via "Link-in-bio" on socials like Instagram.

## 🧠 How it Works (The "No BS" Version)
The app doesn't stream raw audio from a server (which is slow and expensive). Instead:
1. The **Supabase** "Single Source of Truth" stores the `start_time` of the current track.
2. When a user joins, the client calculates: `(CurrentTime - StartTime)`.
3. The `<audio>` element seeks to that exact second immediately.
4. The **Web Audio API** creates an `AnalyserNode` to extract frequency data for the circular visualizer.

## 🛠 Local Setup
1. Clone the repo: `git clone https://github.com/your-username/rafi-live.git`
2. Install dependencies: `npm install`
3. Set up your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
   ```

Built with ❤️ for the Rafi Sahab fan community.