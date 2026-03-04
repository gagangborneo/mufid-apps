# Sentry Integration - Setup Complete ✅

This document summarizes the Complete Sentry integration for your Next.js 16 application following the official [Sentry SKILL.md](https://github.com/getsentry/sentry-for-ai/blob/main/skills/sentry-nextjs-sdk/SKILL.md) guide.

## 📋 What Was Set Up

### Configuration Files Created/Updated

| File | Purpose |
|------|---------|
| `instrumentation-client.ts` | Browser/Client runtime init with Session Replay |
| `sentry.server.config.ts` | Node.js server runtime with local variable tracing |
| `sentry.edge.config.ts` | Edge runtime config (Middleware, Edge Routes) |
| `instrumentation.ts` | Server-side registration hook (dispatches to runtime config) |
| `src/app/global-error.tsx` | App Router error boundary for root layout errors |
| `next.config.ts` | Wrapped with `withSentryConfig()` for source map upload |
| `.env.example` | Environment variables for Sentry configuration |
| `.gitignore` | Added `.env.sentry-build-plugin` |

### Features Included

- ✅ **Error Monitoring** - Captures server errors, client errors, server actions
- ✅ **Tracing** - Server-side request tracing + client-side navigation spans
- ✅ **Session Replay** - 10% of sessions, 100% of error sessions
- ✅ **Logging** - Structured logs via `Sentry.logger.*`
- ✅ **Source Maps** - Automatic upload on build (with auth token)
- ✅ **Tunnel Route** - `/monitoring` proxy to bypass ad-blockers

## 🔧 Environment Variables

Set in `.env.local` or CI secrets:

```bash
# Client-side (public)
NEXT_PUBLIC_SENTRY_DSN=https://your-public-dsn@sentry.io/projectid

# Server-side (secret)
SENTRY_DSN=https://your-secret-dsn@sentry.io/projectid

# Build-time (for source map upload)
SENTRY_AUTH_TOKEN=sntrys_eyJ...
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
```

### Get Your DSN

1. Go to [sentry.io](https://sentry.io/)
2. Create a project for JavaScript → Next.js
3. Copy your DSN(s) from Settings → Projects → [Your Project]

### Generate Auth Token

1. Go to [sentry.io/settings/auth-tokens/](https://sentry.io/settings/auth-tokens/)
2. Create a token with scopes: `project:releases`, `org:read`
3. Copy to `SENTRY_AUTH_TOKEN`

## ✅ Verification

### Test Client-Side Errors

Visit [http://localhost:3000/sentry-example-page](http://localhost:3000/sentry-example-page) and click "Throw Error".

Check [Sentry Issues](https://sentry.io/issues/) — error appears within ~30 seconds.

### Test Server-Side Errors

Add to a server action or API route:

```typescript
import * as Sentry from "@sentry/nextjs";

throw new Error("Sentry test error — delete me");
```

### Verify Source Maps

1. Build: `bun run build`
2. Check build output for "Source Maps" upload message
3. Create an error and check Sentry — stack trace should show readable file names

## 📚 File Reference

### Runtime Dispatch

- **Browser**: `instrumentation-client.ts` (Next.js auto-loads)
- **Node.js**: `sentry.server.config.ts` (via `instrumentation.ts`)
- **Edge**: `sentry.edge.config.ts` (via `instrumentation.ts`)

### Error Boundaries

- **App Router**: `src/app/global-error.tsx` (catches root layout errors)
- **Pages Router**: Would use `pages/_error.tsx` (not needed for App Router)

### Sample Configuration

**instrumentation-client.ts** — Browser init:
- `tracesSampleRate`: 100% dev, 10% production
- `replaysSessionSampleRate`: 10% of all sessions
- `replaysOnErrorSampleRate`: 100% of error sessions
- `sendDefaultPii`: Include user IP, headers

**sentry.server.config.ts** — Server init:
- `includeLocalVariables`: Attach variable values to stack frames
- `enableLogs`: Enable Sentry Logs product

## 🚀 Build & Deploy

```bash
# Development
bun run dev

# Build (source maps uploaded automatically)
bun run build

# Production
bun start
```

## 🔗 Useful Links

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Issues Dashboard](https://sentry.io/issues/)
- [Source Map Upload Settings](https://sentry.io/settings/auth-tokens/)
- [SKILL.md Reference](https://github.com/getsentry/sentry-for-ai/blob/main/skills/sentry-nextjs-sdk/SKILL.md)

## ⚙️ Configuration Reference

### `Sentry.init()` Options

| Option | Type | Default | Purpose |
|--------|------|---------|---------|
| `dsn` | string | — | Required. Client: `NEXT_PUBLIC_SENTRY_DSN`, Server: `SENTRY_DSN` |
| `tracesSampleRate` | 0-1 | 0.1 | Sampling rate for performance tracing |
| `replaysSessionSampleRate` | 0-1 | 0.1 | Fraction of sessions to record |
| `replaysOnErrorSampleRate` | 0-1 | 1.0 | Fraction of sessions with errors to record |
| `sendDefaultPii` | boolean | false | Include IP, headers, user info |
| `includeLocalVariables` | boolean | false | Attach variable values to frames (server) |
| `enableLogs` | boolean | false | Enable Sentry Logs integration |

### `withSentryConfig()` Options

| Option | Purpose |
|--------|---------|
| `org` | Sentry organization slug |
| `project` | Sentry project slug |
| `authToken` | Source map upload token |
| `widenClientFileUpload` | Upload more client files for better traces |
| `tunnelRoute` | API route for ad-blocker bypass (e.g., `/monitoring`) |
| `silent` | Suppress build output |

## 📝 Next Steps

1. **Set environment variables** in `.env.local`
2. **Test the integration** — visit `/sentry-example-page`
3. **Delete test page** after verification
4. **Monitor your app** at [sentry.io/issues/](https://sentry.io/issues/)

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Events not appearing | Check DSN is set; set `debug: true` in config; check network tab |
| Stack traces minified | Source maps not uploading — verify `SENTRY_AUTH_TOKEN` is set |
| `onRequestError` not firing | Requires `@sentry/nextjs >= 8.28.0` (you have 8.59.0 ✓) |
| Edge errors missing | Verify `instrumentation.ts` loads `sentry.edge.config.ts` |
| Session Replay not recording | Verify `Sentry.replayIntegration()` in `instrumentation-client.ts` |

---

**Questions?** See [docs.sentry.io/platforms/javascript/guides/nextjs/](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
