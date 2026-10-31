# No-Suit Retirement Companion

Plain-English U.S. Retirement & Social Security Calculator (100% private in-browser calculations).

## Development

```bash
npm install
npm run dev
```

## Verification & Tests

```bash
npm run lint
npm run build
npx tsx --test src/utils/retirementMath.test.ts
```

## TODO: Google Search Console Verification

To verify site ownership in Google Search Console, add your real verification `<meta>` tag inside the `<head>` of `index.html`:

```html
<!-- TODO: Replace with your real Google Search Console verification code when ready -->
<!-- <meta name="google-site-verification" content="YOUR_REAL_VERIFICATION_CODE" /> -->
```
