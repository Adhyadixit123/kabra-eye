# Daily Scheduled Blog Publishing

This project has a cron-friendly publisher for releasing one queued blog per day to:

- Kabra Eye Hospital website database
- Blogger, when Google OAuth variables are configured

## Files

- `data/scheduled-blog-queue.json` contains scheduled posts.
- `data/.scheduled-blog-state.json` is generated locally and ignored by git.
- `scripts/scheduled-blog-publisher.mjs` publishes the next due post.
- `logs/scheduled-blog-publisher.log` stores cron output locally.

## Commands

Dry-run the next due post:

```bash
npm run blog:publish-due:dry
```

Publish the next due post:

```bash
npm run blog:publish-due
```

List queue state:

```bash
npm run blog:list
```

Backfill Blogger for website posts that were already published:

```bash
npm run blog:blogger-backfill
```

Install the daily macOS cron entry for 10:15 AM India time:

```bash
npm run blog:cron:install
```

## Required Environment

Website publishing uses:

```bash
DATABASE_URL=
```

Blogger publishing requires either a short-lived access token:

```bash
BLOGGER_BLOG_ID=
BLOGGER_ACCESS_TOKEN=
```

Or a refresh-token setup:

```bash
BLOGGER_BLOG_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
```

The current Blogger blog ID is available from the Blogger edit URLs. Keep these values in `.env.local` or the server cron environment; do not commit secrets.

## Cron Entry

The installer writes an idempotent cron line like this:

```cron
15 10 * * * cd /Users/a/Desktop/wordpress && /path/to/node scripts/scheduled-blog-publisher.mjs >> /Users/a/Desktop/wordpress/logs/scheduled-blog-publisher.log 2>&1 # kabra-eye-daily-blog-publisher
```
