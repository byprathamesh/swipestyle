# Backend

This directory contains the Node.js Express server (or Supabase configuration) for the SwipeStyle API.

## Getting Started (Node.js/Express)

To run the backend server locally:

```bash
npm install
npm run dev
```

The server will typically start on `http://localhost:3001`.

## Alternative: Supabase

As an alternative to a self-hosted Node.js backend, you can use [Supabase](https://supabase.io) for your backend needs. Supabase provides a Postgres database, authentication, instant APIs, edge functions, real-time subscriptions, and storage, often with a generous free tier.

To use Supabase:
1. Create a project on Supabase.
2. Configure your frontend to use the Supabase client library for authentication and data fetching.
3. You might create Edge Functions on Supabase for custom backend logic instead of an Express server.
   The files in this `backend` directory might then be replaced or supplemented by Supabase function configurations or local development tools for Supabase functions. 