# SwipeStyle Monorepo

This monorepo contains the frontend, backend, AI, and price comparison services for SwipeStyle.

## Project Structure

- **/frontend**: Next.js application for the user interface.
- **/backend**: Node.js Express server / Supabase for backend logic and API.
- **/ai**: Python scripts for AI-powered features like outfit generation and virtual try-on.
- **/price-compare**: Python scripts for price scraping and comparison.
- **/shared**: Shared utilities, types, and constants.

## Development

To get started with local development:

1.  **Clone the repository.**
2.  **Install dependencies for each service:**
    *   Frontend: `cd frontend && npm install`
    *   Backend: `cd backend && npm install` (if you set up a Node.js backend)
    *   AI & Price Compare: Set up Python virtual environments and install dependencies from `requirements.txt` in their respective folders (`ai/requirements.txt`, `price-compare/requirements.txt`).

3.  **Set up environment variables:**
    *   Create `.env` files in `frontend`, `backend`, `ai`, and `price-compare` directories as needed, based on their respective `README.md` files or example `.env.example` files (you may need to create these).
    *   For AI and Price Comparison scripts, you'll typically need API keys for services like OpenArt, Replicate, SerpAPI, Cuelinks, etc.

4.  **Run the development servers/scripts:**
    *   Frontend (Next.js): `cd frontend && npm run dev` (usually runs on `http://localhost:3000`)
    *   Backend (Node.js/Express): `cd backend && npm run dev` (usually runs on `http://localhost:3001`)
    *   AI Scripts: `cd ai && python your_script_name.py`
    *   Price Comparison Scripts: `cd price-compare && python your_script_name.py`

## Deployment

(Details about deployment to Vercel and Railway will be added here)

## MVP Features

- User authentication (Supabase)
- List, browse, and search clothing swaps
- Request swaps and basic messaging
- AI-powered outfit suggestions/virtual try-on (OpenArt AI, Flux AI, The New Black)
- Affiliate links for shopping similar looks (Cuelinks, Amazon, Myntra, etc.)
- Minimal, mobile-first UI

## Free Tools & Services

- **Coding & Automation:** Cursor Premium
- **Frontend:** Next.js, Tailwind CSS
- **Backend & Auth:** Supabase (free tier)
- **AI/Virtual Try-On:** OpenArt AI Clothes Changer, Flux AI, The New Black AI (free credits)
- **Affiliate:** Cuelinks, Amazon Associates India, Myntra Affiliate, Ajio Affiliate, Flipkart Affiliate
- **Design:** Figma, Canva
- **Hosting:** Vercel (free), Netlify (free)
- **Community:** Discord, Slack, Google Forms
- **File Sharing:** Google Drive, Google Photos

This setup will let you build, launch, and iterate on your MVP with almost zero upfront cost.
Copy-paste this into your README and update as you add more features or tools! 

## Tips for Staying Free & Maximizing Potential

- **Monitor Free Tier Limits:** Keep a close watch on usage dashboards for services like Supabase, Vercel, and Netlify to avoid unexpected costs. Understand the limitations of their free offerings.
- **Optimize Media:** Compress images and videos to save on storage and bandwidth. Consider client-side image resizing before uploads.
- **Explore Open-Source AI:** For long-term AI features, investigate open-source models (e.g., from Hugging Face) that you might be able to self-host or integrate, as free credits on proprietary services may expire.
- **Leverage Community:** Engage your users for feedback, beta testing, and potentially contributions if you open-source components.
- **Lean Feature Development:** Prioritize core features to manage complexity and resource consumption effectively.
- **Implement Caching:** Use caching strategies (CDN, server, client-side) to improve performance and reduce load on backend services, helping you stay within free tier limits. 

## Tools & Services (Initial Free Tier Focus)

- **Coding & Automation:** Cursor Premium
- **Frontend Framework:** Next.js
- **Frontend Hosting:** Vercel (Free Tier)
- **Styling:** Tailwind CSS
- **Backend Framework (Option 1):** Node.js with Express
- **Backend Hosting (Option 1 - Node.js):** Railway (Free Tier - to be configured)
- **Backend & DB (Option 2 - Integrated):** Supabase (Free Tier - Auth, Postgres DB, Edge Functions)
- **AI/Virtual Try-On:** OpenArt AI, Flux AI, The New Black AI (Free Credits), Replicate.com (Pay-as-you-go with initial free credits)
- **Price Scraping/Affiliate APIs:** SerpAPI (Free Tier/Credits), Cuelinks (Commission-based)
- **CI/CD:** GitHub Actions (Free for public repos / generous free minutes for private)
- **Design:** Figma, Canva
- **Community:** Discord, Slack, Google Forms
- **File Sharing:** Google Drive, Google Photos

## Potential Upgrades & Paid Alternatives

While the free-tier services listed above are excellent for starting and scaling to a certain point, you might consider these paid alternatives as your project grows or requires more advanced features/higher limits:

### 1. Frontend Hosting
-   **Current:** Vercel (Free Tier)
-   **Paid Alternatives:**
    -   **Vercel (Pro/Enterprise):** Higher limits (bandwidth, build minutes, serverless function execution), more concurrent builds, advanced analytics, DDoS mitigation, observability, team collaboration features, faster builds, premium support.
    -   **Netlify (Paid Tiers):** Similar to Vercel, offers robust CI/CD, edge functions, and good DX. Paid tiers increase limits and add features.
    -   **AWS Amplify / Cloudfront + S3:** Highly scalable, integrates with the AWS ecosystem. Can be more complex to configure but offers fine-grained control.
    -   **Google Cloud Hosting / Firebase Hosting (Paid Tiers):** Scalable hosting options within the Google Cloud ecosystem.
    -   **Azure Static Web Apps (Paid Tiers):** Good for integration with other Azure services.

### 2. Backend Hosting & Services
-   **Current (Node.js option):** Railway (Free Tier planned)
-   **Current (Integrated option):** Supabase (Free Tier for Auth, DB, Functions)
-   **Paid Alternatives:**
    -   **Railway (Paid Tiers):** More resources (CPU, RAM, disk), higher uptime, dedicated resources, auto-scaling.
    -   **Supabase (Paid Tiers):** Higher limits on database size, function executions, MAUs for auth, dedicated resources, better support.
    -   **Heroku (Paid Dynos):** Mature PaaS with a good developer experience, but can be pricier for comparable resources.
    -   **Render:** Similar to Heroku/Railway, offers auto-scaling, managed databases, and a good DX.
    -   **Fly.io:** Deploy application servers close to your users, good for global low-latency.
    -   **AWS (EC2, Lambda, Fargate, Elastic Beanstalk):** Extremely scalable and flexible, vast service ecosystem. Requires more operational overhead.
    -   **Google Cloud (Cloud Run, App Engine, Compute Engine, GKE):** Powerful and scalable options similar to AWS.
    -   **Microsoft Azure (App Service, Azure Functions, VMs):** Comprehensive cloud platform.

### 3. Database
-   **Current (with Supabase):** Supabase Postgres (Free Tier)
-   **Paid Alternatives:**
    -   **Supabase (Paid Tiers):** Larger storage, more connections, Point-In-Time-Recovery (PITR), higher performance, read replicas.
    -   **Amazon RDS / Aurora (PostgreSQL, MySQL, etc.):** Highly scalable, reliable, feature-rich managed databases.
    -   **Google Cloud SQL:** Managed MySQL, PostgreSQL, and SQL Server.
    -   **Azure Database (for PostgreSQL, MySQL, MariaDB):** Managed database services on Azure.
    -   **PlanetScale:** MySQL-compatible serverless database platform with branching and excellent scalability.
    -   **Neon:** Serverless Postgres with features like branching.
    -   **MongoDB Atlas:** Managed NoSQL document database, if your data model fits.

### 4. Authentication
-   **Current (with Supabase):** Supabase Auth (Free Tier)
-   **Paid Alternatives:**
    -   **Auth0 / Okta Customer Identity Cloud:** Highly feature-rich, enterprise-grade, extensive integrations, advanced security features. Can be expensive at scale.
    -   **AWS Cognito (Paid for higher limits/features):** Scalable, integrates with AWS.
    -   **Firebase Auth (Paid for higher limits):** Good DX, integrates with Google Cloud.
    -   **Clerk.dev:** Modern authentication with pre-built UI components and strong developer focus.
    -   **Microsoft Entra ID (formerly Azure AD B2C):** For customer identity and access management.

### 5. AI / Virtual Try-on APIs
-   **Current:** Free credits/tiers on OpenArt AI, Replicate, etc.
-   **Paid Alternatives:**
    -   **OpenAI API (GPT-4, DALL-E 3, etc.):** Access to state-of-the-art models for various tasks. Pay-as-you-go.
    -   **Google Vertex AI / Google AI Studio (Gemini API):** Powerful models from Google, with various MLOps tools.
    -   **Amazon Bedrock / SageMaker:** Access to a range of foundation models and comprehensive ML development tools.
    -   **Replicate (Paid Tiers/Usage):** Wider model selection, faster inference, higher rate limits.
    -   **Hugging Face (Inference Endpoints / Enterprise Hub):** Deploy open-source or custom models.
    -   **Dedicated Fashion AI Platforms (if available with premium tiers):** Look for services specializing in virtual try-on or outfit generation that offer paid plans for higher quality, speed, or custom model training.

### 6. Price Scraping & Affiliate APIs
-   **Current:** SerpAPI (Free Tier/Credits), Cuelinks (Commission-based).
-   **Paid Alternatives for Scraping:**
    -   **SerpAPI (Paid Plans):** Significantly more API calls, faster results, more SERP features.
    -   **ScraperAPI, ScrapingBee, Zyte (formerly Scrapinghub), Bright Data:** Robust scraping services that handle proxies, CAPTCHA solving, and JavaScript rendering for complex websites. Essential for reliable large-scale scraping.
    -   **Apify:** Platform for web scraping and automation, offers actors (pre-built scrapers) and tools to build your own.
-   **Note on Cuelinks:** While free to join, effective use and higher earnings depend on your ability to drive converting traffic. Paid marketing or SEO tools could indirectly enhance its value.

### 7. CI/CD
-   **Current:** GitHub Actions (Free Tier)
-   **Paid Alternatives:**
    -   **GitHub Actions (Paid Tiers - GitHub Team/Enterprise):** More build minutes, larger/faster runners, more concurrent jobs.
    -   **CircleCI (Paid Plans):** Popular, flexible, and performant CI/CD.
    -   **GitLab CI/CD (Paid Tiers - if using GitLab):** Tightly integrated and powerful.
    -   **Jenkins (Self-hosted - "paid" via infrastructure/maintenance):** Highly customizable.
    -   **Buildkite:** Hybrid model, run build agents on your own infrastructure for control and speed.

This list provides a starting point for exploring paid services. The best choice always depends on your specific requirements, budget, team expertise, and scalability needs. It's often wise to start with free tiers and upgrade as your application proves its value and outgrows the free offerings. 