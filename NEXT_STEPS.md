# NEXT STEPS — CashCalc / QuickCash Tools

## TODAY (Critical — Do These First)

### 1. Fix Security Issue — Move Keystore Password to GitHub Secret (15 min)
The password `cashcalc2026` is currently in plaintext in `build-apk.yml` (a public repo).

**Steps:**
1. Go to: https://github.com/LohitkumarD/Cash-info/settings/secrets/actions
2. Click **New repository secret**
3. Name: `KEYSTORE_PASSWORD`, Value: `cashcalc2026`
4. Also add: `KEYSTORE_ALIAS`, Value: `cashcalc`

Then update `.github/workflows/build-apk.yml` — replace the plaintext password with:
```yaml
expect {
  "Password for" { send "$env(KEYSTORE_PASS)\r"; exp_continue }
  eof
}
```
and pass `KEYSTORE_PASS: ${{ secrets.KEYSTORE_PASSWORD }}` as an env var.

---

### 2. Merge Branch to Main (5 min)
The fixed icons and APK build workflow are on `claude/cash-denomination-pwa-0vwuzt` but not yet on `main`.

1. Go to: https://github.com/LohitkumarD/Cash-info/pull/2
2. Click **Merge pull request**
3. The site will auto-deploy with the fixed icons

---

### 3. Write Privacy Policy (1–2 hours)
Play Store will not approve without a hosted privacy policy.

**Fast option**: Use https://app.privacypolicies.com (free)
- App name: CashCalc
- No personal data collected
- localStorage only (on-device)
- No analytics, no accounts, no backend

**Host it**: Either:
- Add a `privacy.html` file to the repo (auto-deploys to GitHub Pages)
- Or use the privacypolicies.com hosted URL directly

**Then add a link** in the app footer and in the Play Store listing.

---

### 4. Add Haptic Feedback (10 min, massive UX win)
Add this single function to `index.html` JavaScript section:
```javascript
function haptic(ms = 30) {
  if (navigator.vibrate) navigator.vibrate(ms);
}
```
Then call `haptic()` on every `+` button click, `-` button click, save, and reset.

---

### 5. Fix History Badge — Hide When Zero (2 min)
In `renderHistory()`:
```javascript
const badge = document.getElementById('histBadge');
badge.textContent = history.length;
badge.style.display = history.length === 0 ? 'none' : 'inline-flex';
```

---

## THIS WEEK

### 6. Take Play Store Screenshots (2 hours)
You need **minimum 2 screenshots** (recommended 4–6) of phone screen size.

Required:
1. **Calc tab** — show a realistic cash count (e.g., 3×₹2000 + 5×₹500 = ₹8,500)
2. **Details tab** — show the breakdown table with amount in words
3. **History tab** — show 3–4 saved records
4. **Install prompt** — show the "Install" button in the browser

Tools: Take screenshots directly on your Android phone with the app open, then crop/frame them using Canva with a phone mockup frame.

Size required: minimum 320px wide, 16:9 or 9:16 ratio.

---

### 7. Create Feature Graphic (30 min)
Required by Play Store: **1024×500 pixels**

Use Canva (free):
- Dark background matching app theme (#080810)
- App name in purple (#a855f7)
- Small mockup of the app screen
- Tagline: "Count Indian currency instantly"

---

### 8. Write Play Store Description

**Short description (80 chars max):**
```
Count Indian currency denominations instantly. Works offline.
```

**Long description (use this as a template, expand to ~1000 chars):**
```
CashCalc is the fastest way to count Indian currency denominations.

Perfect for:
• Bank tellers counting daily cash
• Shop owners verifying till totals
• Anyone handling Indian currency

FEATURES:
✓ Count all notes: ₹2000, ₹500, ₹200, ₹100, ₹50, ₹20, ₹10, ₹5, ₹2, ₹1
✓ Count all coins: 20p, 10p, 5p, 2p, 1p
✓ Instant total with amount in words (Lakh/Crore system)
✓ Save up to 50 cash count records
✓ Share count reports via WhatsApp
✓ Works completely offline — no internet required
✓ Teller balance tracking
✓ Session labels for payee names

DESIGNED FOR INDIA:
Amount in words uses Indian numbering (Lakh, Crore) — not just millions and billions.

100% FREE. No account required. No data leaves your phone.
```

---

### 9. Add AdMob Banner Ad (2 hours)
1. Create account at: https://admob.google.com
2. Add new app (Android, com.cashcalc.app)
3. Create a Banner ad unit
4. Add the AdMob SDK to your TWA — this requires modifying the generated Android project
   - Alternatively: add AdSense to the web app first (simpler), then migrate to AdMob for the APK

**Simplest path for now**: Add Google AdSense to `index.html`:
```html
<!-- Above the bottom nav bar -->
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXX" data-ad-slot="XXXXXXXX" data-ad-format="auto"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

---

### 10. Submit to Google Play Store

1. Go to: https://play.google.com/console
2. Create developer account ($25 one-time fee)
3. Create new app → "CashCalc" (or your chosen name)
4. Fill in:
   - App name
   - Short description
   - Long description
   - Screenshots (upload the ones you took)
   - Feature graphic
   - Privacy policy URL
5. Upload the APK from GitHub Actions (download from run #20 artifact)
6. Complete content rating questionnaire
7. Complete data safety form (select: no data collected)
8. Set price: Free
9. Submit for review (1–3 days)

---

## NEXT 30 DAYS

### 11. Add GST Calculator Tab
High-demand feature. Add a 4th tab "GST":
- Input: Amount + GST rate (5%, 12%, 18%, 28%)
- Output: GST amount + total amount + breakdown
- Integrate with the existing calculation to optionally include GST in totals

### 12. Add PDF/Text Export
Allow downloading a formatted receipt as text or PDF:
```javascript
// Simple text export (no library needed)
function exportText() {
  const text = buildText(snapshot());
  const blob = new Blob([text], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cash-count-${Date.now()}.txt`;
  a.click();
}
```

### 13. Add Reset Confirmation
Prevent accidental data loss:
```javascript
function resetAll() {
  // Show undo toast for 4 seconds
  const snapshot = captureState(); // save current values
  clearAllInputs();
  toast('Reset. <button onclick="restoreState(snapshot)">Undo</button>', 4000);
}
```

### 14. Fix Input Validation
All denomination inputs need:
```html
<input type="number" min="0" max="9999" inputmode="numeric" pattern="[0-9]*">
```
Show a red border + "Invalid" label if value is negative or non-numeric.

### 15. Deploy to Netlify (Optional but Recommended)
Netlify gives you:
- Cleaner URL: cashcalc.netlify.app (or custom domain)
- Better PWA caching headers
- Form handling if you ever need contact/feedback

Steps:
1. Go to: https://netlify.com
2. New site from GitHub → select LohitkumarD/Cash-info
3. Build command: (none — static site)
4. Publish directory: `.`
5. Done — auto-deploys on every push

---

## DECISIONS YOU NEED TO MAKE

| Decision | Options | Recommendation |
|----------|---------|----------------|
| App name | Keep "CashCalc" vs rename to "QuickCash Tools" | "Cash Counter: Denomination Calc" is best for ASO |
| Monetization start | AdMob banner now vs after launch | Add AdSense to web now, switch to AdMob after 1,000 installs |
| Deployment | GitHub Pages only vs add Netlify | Add Netlify for custom domain; keep GitHub Pages as backup |
| iOS | PWA-only vs pursue App Store | PWA-only for now (App Store requires Mac + $99/year) |
| Analytics | None vs Firebase | Add Firebase after Play Store submission — don't delay launch |

---

## QUICK WINS SUMMARY

| Task | Time | Impact |
|------|------|--------|
| Merge branch to main | 5 min | Deploys fixed icons |
| Move keystore password to Secret | 15 min | Security fix |
| Add haptic feedback | 10 min | UX improvement |
| Hide badge when 0 | 2 min | Polish |
| Write privacy policy | 1 hr | Unlocks Play Store |
| Take screenshots | 1 hr | Unlocks Play Store |
| Create feature graphic | 30 min | Unlocks Play Store |
| Submit to Play Store | 30 min | 🚀 App goes live |

**Total time to Play Store submission: ~4 hours of focused work.**
