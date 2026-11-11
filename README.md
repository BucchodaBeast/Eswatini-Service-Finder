# Eswatini Service & Product Finder (ESF)

A hyper-local digital marketplace and utility platform for Eswatini combining **reverse auctions**, **dual-spectrum provider registry** (informal micro-vendors & formal institutions), **geospatial financial-node mapping** (ATMs, CashPlus & MoMo agents), and the **Eswatini Informal Economic Index (EIE)**.

---

## Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons (Mobile-First responsive PWA).
- **Backend**: Node.js, Express, TypeScript.
- **Database & State**: In-memory high-performance data store out-of-the-box, with drop-in PostgreSQL/Prisma support via `DATABASE_URL`.
- **Eswatini Taxonomy**: 60+ curated categories across 10 sectors (Times of Eswatini classifieds, Swazi Yellow Pages, local informal trades like Chicken Dust, Bakkie Hire, Traditional Attire, Welding).
- **Zero WhatsApp API Cost**: Automatic generation of pre-filled `https://wa.me/<phone>` deep links and phone dialer triggers upon bid acceptance.

---

## 🚀 Quick Start (Local Run)

From the project root:

```bash
# 1. Install all dependencies (both client and server)
npm run install:all

# 2. Build the React frontend
npm run build:client

# 3. Build the TypeScript backend
npm run build:server

# 4. Start the server (serves both API & React UI on port 5000)
npm start
```

Visit: `http://localhost:5000`

---

## 🌐 Deploy to Render from GitHub

### Step 1: Push to your GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit of Eswatini Service & Product Finder"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** $\rightarrow$ **Web Service**.
3. Select **Build and deploy from a Git repository** and connect your GitHub repo.
4. Render will detect the settings from `render.yaml` automatically, or you can enter:
   - **Environment**: `Node`
   - **Build Command**: `npm run install:all && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **Create Web Service**.

Your app will be live on `https://<your-app-name>.onrender.com`!
