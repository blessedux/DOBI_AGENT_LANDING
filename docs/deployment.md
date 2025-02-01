# Deployment Guide

1. Set up environment variables in production:

   - DATABASE_URL: PostgreSQL connection string
   - API_KEY: Secure random string for API authentication
   - UPSTASH_REDIS_REST_URL: Redis URL for rate limiting
   - UPSTASH_REDIS_REST_TOKEN: Redis authentication token
   - SENTRY_DSN: Sentry error tracking URL
   - ALLOWED_ORIGIN: Allowed CORS origin

2. Deploy database:

   ```bash
   npx prisma db push
   ```

3. Deploy to Vercel:
   ```bash
   vercel deploy
   ```
