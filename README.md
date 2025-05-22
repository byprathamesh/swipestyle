# SwipeStyle Monorepo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- Add a badge if you choose a license -->

**SwipeStyle is a fashion discovery platform that helps users find and create outfits they love.** This monorepo contains the frontend, backend, AI, and price comparison services.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Development Setup](#development-setup)
- [Key Features](#key-features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Free Tier Strategy](#free-tier-strategy)
- [Potential Upgrades & Paid Alternatives](#potential-upgrades--paid-alternatives)

## Quick Start

New to SwipeStyle? Here's how to get a local development environment running:

1.  **Clone the repository:** `git clone https://github.com/your-username/swipestyle-8.git` (Replace with your actual repo URL)
2.  **Navigate to the project directory:** `cd swipestyle-8`
3.  **Install dependencies for each service:**
    *   Frontend: `cd frontend && npm install`
    *   Backend (if using Node.js): `cd backend && npm install`
    *   AI & Price Compare: Set up Python virtual environments and install from `requirements.txt` in `ai/` and `price-compare/`.
4.  **Set up environment variables:** Create `.env` files in each service directory based on `.env.example` files (you may need to create these).
5.  **Run services:**
    *   Frontend: `cd frontend && npm run dev`
    *   Backend (Node.js): `cd backend && npm run dev`
    *   AI/Price Scripts: `cd ai && python your_script.py`

## Project Structure

The monorepo is organized as follows:

-   `/.github/workflows/`: CI/CD workflows (e.g., for automated testing and deployment).
-   `/ai/`: Python scripts for AI-powered features like outfit generation and virtual try-on.
-   `/backend/`: Node.js Express server / Supabase for backend logic and API.
-   `/frontend/`: Next.js application for the user interface.
    -   `frontend/public/`: Static assets for the frontend.
    -   `frontend/src/app/`: Core application code.
        -   `ai-stylist/`: Components related to the AI stylist feature.
        -   `api/proxy/`: API proxy routes.
        -   `list-item/`: Components for displaying list items.
        -   `login/`, `signup/`, `profile/`: User authentication and profile management pages.
        -   `preferences/`: User preference settings.
        -   `price-checker/`: Components for the price checking feature.
    -   `frontend/src/lib/`: Utility functions and libraries for the frontend.
-   `/price-compare/`: Python scripts for price scraping and comparison.
-   `/public/`: Global public assets (distinct from `frontend/public`).
-   `/shared/`: Shared utilities, types, and constants used across multiple services.
-   `/src/`: (Assuming this is for a potential shared UI library or another distinct module - clarify if needed)
    - `components/ui/`: Shared UI components.
    - `data/`: Shared data structures or mock data.
    - `hooks/`: Shared custom React hooks.
    - `lib/`: Shared utility functions.
    - `pages/api/`: API routes (if this `src` is for a separate Next.js app or similar).
    - `types/`: Shared TypeScript type definitions.

## Technologies Used

-   **Frontend:** Next.js, React, Tailwind CSS, TypeScript
-   **Backend:** Node.js with Express (optionally), Supabase (PostgreSQL, Auth, Edge Functions)
-   **AI:** Python, OpenArt AI, Flux AI, The New Black AI, Replicate
-   **Price Comparison:** Python, SerpAPI, Cuelinks
-   **CI/CD:** GitHub Actions
-   **Design:** Figma, Canva
-   **Development Tools:** Cursor Premium, Bun

## Development Setup

Follow these steps to set up your local development environment:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/swipestyle-8.git # Replace with your actual repo URL
    cd swipestyle-8
    ```

2.  **Install Dependencies:**
    *   **Frontend (Next.js):**
        ```bash
        cd frontend
        npm install
        # or yarn install or pnpm install or bun install
        ```
    *   **Backend (Node.js/Express - if applicable):**
        ```bash
        cd backend
        npm install
        # or yarn install or pnpm install or bun install
        ```
    *   **AI & Price Comparison (Python):**
        For each directory (`ai`, `price-compare`):
        ```bash
        cd ai  # or price-compare
        python -m venv venv
        source venv/bin/activate  # On Windows: venv\Scripts\activate
        pip install -r requirements.txt
        ```

3.  **Set Up Environment Variables:**
    *   Create `.env` files in the root of `frontend`, `backend`, `ai`, and `price-compare`.
    *   Populate these files with necessary API keys and configuration variables. Refer to any `.env.example` files or specific service documentation within their respective READMEs (if they exist).
    *   **Key variables might include:**
        *   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (for Frontend & Supabase)
        *   `DATABASE_URL` (for Backend if using a separate DB)
        *   API keys for OpenArt, Replicate, SerpAPI, Cuelinks, etc. (for AI & Price Compare).

4.  **Run Development Servers/Scripts:**
    *   **Frontend (Next.js):**
        ```bash
        cd frontend
        npm run dev
        ```
        (Usually accessible at `http://localhost:3000`)
    *   **Backend (Node.js/Express - if applicable):**
        ```bash
        cd backend
        npm run dev
        ```
        (Usually accessible at `http://localhost:3001`)
    *   **AI Scripts:**
        ```bash
        cd ai
        source venv/bin/activate # If not already active
        python your_script_name.py
        ```
    *   **Price Comparison Scripts:**
        ```bash
        cd price-compare
        source venv/bin/activate # If not already active
        python your_script_name.py
        ```

## Key Features

-   User authentication and management (Supabase)
-   Browse, search, and list clothing items.
-   AI-powered outfit suggestions and virtual try-on capabilities.
-   Affiliate links for purchasing similar items.
-   Mobile-first, responsive user interface.
-   Price comparison tools.

## Deployment

*(This section will be updated with detailed deployment instructions for services like Vercel (frontend) and Railway/Supabase Functions (backend/AI tasks).)*

Currently, the primary deployment targets are:
- **Frontend:** Vercel
- **Backend & Database:** Supabase
- **AI Scripts:** Potentially serverless functions (e.g., Supabase Edge Functions, Vercel Functions) or containerized services.

## Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to existing styling and linting configurations.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (if you add one).
*Consider adding an MIT or other open-source license file.*

## Free Tier Strategy

This project leverages free tiers of various services to minimize initial costs.

-   **Coding & Automation:** Cursor Premium
-   **Frontend Framework & Hosting:** Next.js on Vercel (Free Tier)
-   **Styling:** Tailwind CSS
-   **Backend & Database:** Supabase (Free Tier for Auth, Postgres DB, Edge Functions)
-   **AI/Virtual Try-On:** OpenArt AI, Flux AI, The New Black AI (Free Credits), Replicate.com (Pay-as-you-go with initial free credits)
-   **Price Scraping/Affiliate APIs:** SerpAPI (Free Tier/Credits), Cuelinks (Commission-based)
-   **CI/CD:** GitHub Actions (Free for public repos / generous free minutes for private)
-   **Design:** Figma, Canva
-   **Community & File Sharing:** Discord, Slack, Google Forms, Google Drive, Google Photos

**Tips for Staying Free & Maximizing Potential:**

-   **Monitor Free Tier Limits:** Keep a close watch on usage dashboards.
-   **Optimize Media:** Compress images and videos.
-   **Explore Open-Source AI:** Investigate self-hostable models for long-term AI features.
-   **Lean Feature Development:** Prioritize core features.
-   **Implement Caching:** Use CDN, server, and client-side caching.

## Potential Upgrades & Paid Alternatives

While free tiers are great for starting, consider these as your project scales:

### 1. Frontend Hosting
-   **Current:** Vercel (Free Tier)
-   **Paid Alternatives:** Vercel (Pro), Netlify (Paid), AWS Amplify, Google Cloud Hosting, Azure Static Web Apps.

### 2. Backend Hosting & Services
-   **Current:** Supabase (Free Tier)
-   **Paid Alternatives (if moving beyond Supabase or needing more for Node.js):** Railway (Paid), Heroku, Render, Fly.io, AWS (EC2, Lambda), Google Cloud (Cloud Run, App Engine), Azure App Service.
-   **Supabase Paid Tiers:** Offer higher limits and dedicated resources.

### 3. Database
-   **Current:** Supabase Postgres (Free Tier)
-   **Paid Alternatives:** Supabase (Paid Tiers), Amazon RDS/Aurora, Google Cloud SQL, Azure Database, PlanetScale, Neon, MongoDB Atlas.

### 4. Authentication
-   **Current:** Supabase Auth (Free Tier)
-   **Paid Alternatives:** Auth0/Okta, AWS Cognito, Firebase Auth, Clerk.dev, Microsoft Entra ID.

### 5. AI / Virtual Try-on APIs
-   **Current:** Free credits/tiers (OpenArt AI, Replicate, etc.)
-   **Paid Alternatives:** OpenAI API, Google Vertex AI, Amazon Bedrock/SageMaker, Replicate (Paid), Hugging Face Inference Endpoints.

### 6. Price Scraping & Affiliate APIs
-   **Current:** SerpAPI (Free Tier/Credits), Cuelinks.
-   **Paid Scraping Services:** SerpAPI (Paid), ScraperAPI, ScrapingBee, Zyte, Bright Data, Apify.

### 7. CI/CD
-   **Current:** GitHub Actions (Free Tier)
-   **Paid Alternatives:** GitHub Actions (Paid), CircleCI, GitLab CI/CD, Jenkins (Self-hosted), Buildkite.

This list provides a starting point. Always evaluate based on specific needs, budget, and scalability requirements. 