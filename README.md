# Moxforge — Information, Technology & Internet

Official web portal and innovation platform for **Moxforge**: an Information, Technology, and Internet organisation uniting applied software and AI venture creation (**Moxforge Innovation Labs**) with an open developer ecosystem (**Moxforge Community**).

---

## 🚀 Features

- **Header & Navigation**: Features the official blue metallic Moxforge emblem lockup and direct page routing.
- **Projects & Ventures**: Showcases flagship software platforms including *SpectraIndex*, *ForgeFlow Orchestrator*, *AuraGrid OS*, *HyperNexus DB*, and *OmniSync SDK*.
- **Community & Chapters**: Campus developer guilds, open-source fellowships, and technology circles.
- **Research & Publications**: Applied AI systems, layout-aware knowledge indexing, and distributed internet gateway research.
- **Ecosystem & Partners**: Academic institutes, open-source foundries, and enterprise alliances.
- **Leadership & Engineering Roster**: Core members and executive team profiles.
- **Careers & Business Intake**: Direct candidate application system and private Google Sheets integration for partnership enquiries.
- **SEO & Search Indexing**: Full Schema.org JSON-LD structured data (`Organization` + `WebSite`), OpenGraph metadata, `sitemap.xml`, and `robots.txt` optimized to rank **Moxforge** #1 on search engines.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + custom brand typography (*Bricolage Grotesque*, *Plus Jakarta Sans*, *JetBrains Mono*)
- **Icons**: Lucide React + custom SVGs
- **Testing**: Node `tsx --test`
- **Deployment**: Vercel ready (`vercel.json`)

---

## 📦 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/moxforge-portal.git
   cd moxforge-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Vercel

### Method 1: Using GitHub & Vercel Dashboard (Recommended)

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Moxforge Information, Technology & Internet Portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/moxforge-portal.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Click **Import Repository** and select `moxforge-portal`.
   - Framework Preset: **Vite**.
   - Root Directory: `./`.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Click **Deploy**.

3. **Custom Domain Setup**:
   - In Vercel, navigate to **Project Settings > Domains**.
   - Add your custom domain (e.g. `moxforge.org` or `moxforge.com`).
   - Configure DNS CNAME / A records as indicated by Vercel.

---

## 🔍 Search Engine Optimization (Google Ranking)

To ensure **Moxforge** ranks #1 on Google when searched:
1. **Submit Sitemap to Google Search Console**:
   - Register your deployed site on [Google Search Console](https://search.google.com/search-console).
   - Add your sitemap: `https://YOUR-DOMAIN.vercel.app/sitemap.xml`.
2. **Request Indexing**: Click **URL Inspection** and request indexing for `https://YOUR-DOMAIN.vercel.app/`.
3. **Structured Data**: The included JSON-LD schema declares `Moxforge` as the authoritative Organization & WebSite entity.

---

© 2026 MOXFORGE — Information, Technology & Internet. All rights reserved.
