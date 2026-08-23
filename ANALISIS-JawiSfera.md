# JawiSfera — Code & Product Review

**Project:** Rumi → Jawi converter + Jawi short-story reader
**Stack:** Vanilla HTML/CSS/JS, 3 files (index.html 6 KB · style.css 23 KB · app.js 50 KB)
**Reviewed:** 21 Aug 2026

---

## Summary

The app is well built for what it is. The design system is genuinely good — proper CSS custom properties, consistent BEM naming, real focus states, sensible responsive breakpoints. The architecture (dictionary → prefix decomposition → rule fallback) is the right architecture for this problem.

The problem is that **the rule-based fallback produces incorrect Jawi for most words that aren't in the dictionary**, and the UI presents those guesses with the same confidence as verified dictionary entries. For a teaching tool aimed at murid, that is the most damaging failure mode possible — a child learns a wrong spelling and has no way to know.

Everything else in this document is secondary to fixing that.

---

## 🔴 Critical

### 1. The rule fallback writes every vowel *plene* — DBP does not

Your dictionary follows correct DBP convention:

| Rumi | Your dictionary | Note |
|---|---|---|
| besar | بسر | no alif on either `a` |
| kerja | کرج | no alif |
| tanah | تانه | alif on first `a` only |

But `ruleBasedConvert()` maps **every** `a` → `ا` unconditionally (app.js lines 484–489 — the `if (atWordStart)` branch and the `else` branch do the same thing). Result:

| Rumi | App output | Expected (DBP) |
|---|---|---|
| sejarah | سجاراه | سجاره |
| kawasan | کاواسان | کواسن |
| jawatan | جاواتان | جاوتن |
| kertas | کرتاس | کرتس |
| sukan | سوکان | سوکن |
| tandas | تانداس | تندس |
| warna | وارنا | ورن |

I tested 28 common primary-school words (school objects, prayer, sport, art). **22 of 28 fell through to the rule path**, and most came out wrong. The dictionary is 562 entries — real Malay classroom vocabulary is many thousands.

**Fix:** the rule engine needs syllable-aware vowel writing, not character-by-character. Roughly: run `splitSyllables()` first, then per syllable decide whether the vowel is written. A working first approximation of the DBP convention:

- `a` in an **open** syllable → write `ا`
- `a` in a **closed** syllable (CVC) → omit, *except* in the first syllable of the word
- `i` / `u` / `o` → generally written (`ي` / `و`)
- `e`-pepet → never written

Then validate against a test corpus (see §7).

### 2. Word-initial `ai` / `au` produce a doubled alif

app.js lines 450–461:

```js
if (pair === 'ai' && …) {
  if (i === 0) result += 'ا';   // ← adds alif
  result += 'اي';                // ← and the diphthong already starts with alif
```

| Rumi | App output | Expected |
|---|---|---|
| aiskrim | ااسکريم → `ااي…` | ايسکريم |
| audit | ااوديت | اوديت |
| aur | ااور | اور |

**Fix:** delete the two `if (i === 0) result += 'ا'` lines for `ai` and `au`. (The `oi` branch is correct as written.)

### 3. The UI gives no confidence signal

`convertWord()` already returns `method` (`dictionary`, `prefix+dict`, `prefix+dict+suffix`, `rules`) — and then `displayJawi()` throws it away. A verified dictionary spelling and a machine guess render identically.

**Fix:** surface it. A subtle dotted underline or a small `~` marker on rule-derived words, with a tooltip: *"Ejaan anggaran — belum disahkan"*. Cheap to build, and it turns the app from "sometimes lies to children" into "honest about what it knows." This is the highest value-per-line-of-code change in the whole project.

---

## 🟠 Data quality

### 4. 14 duplicate keys in `JAWI_DICT`

`bukan` (×3), `terima` (×3), `lama` (×3), `hari`, `kerja`, `baru`, `susah`, `kasih`, `tolong`, `membawa`, `memberi`, `jaga`, `bermain`, `melihat`. JS silently keeps the last one, so nothing breaks today — but it means the file has been edited without review, and it's where the errors below crept in.

### 5. Confirmed dictionary errors

| Key | Current | Should be | Problem |
|---|---|---|---|
| `dinding` | ديديڠ | ديندي / ديندڠ | **missing the `ن`** |
| `elok` | اليوق | ايلوق | `ل` and `ي` transposed |
| `murah` | مورة | موره | ta marbuta `ة` instead of `ه` |

`elok` is the worst of the three because it is *also* the worked example inside the E-Taling rule card (`RULE_DB['e-taling'].example`) — so the app teaches the misspelling twice on the same screen.

There are ~560 entries and I spot-checked maybe 60. **A full audit against the DBP *Daftar Kata Bahasa Melayu* is worth a day of someone's time.**

### 6. Punctuation and numbers aren't handled for RTL

`convertText('Saya ada 3 buku, harga RM5.50!')` → `ساي اد 3 بوکو, هرݢ رم5.50!`

Three problems: Latin comma instead of `،`, `RM` transliterated to `رم` as though it were a Malay word, and mixed-direction runs with no bidi isolation, so digits and Latin will jump around unpredictably inside the RTL block.

**Fix:** map `, ; ?` → `، ؛ ؟`; leave uppercase-only tokens and digit tokens untransliterated and wrap them in `<bdi>`.

### 7. There are no tests

This is the root cause of §1, §2 and §5 — nothing catches a regression. The engine is pure functions with no DOM dependency, so it's unusually easy to test.

**Fix:** split `app.js` into `engine.js` (dictionary + conversion, `export`ed) and `ui.js`, then add a plain `tests.html` or a small Node script with a corpus of maybe 200 known-correct Rumi↔Jawi pairs from a DBP source. Run it before every change.

---

## 🟡 Accessibility

### 8. Every word becomes a tab stop

`displayJawi()` builds a `<button>` per word. A 60-word paragraph is 60 tab stops with no skip link, and keyboard users have to tab through all of them to reach the story section.

**Fix:** keep one `tabindex="0"` container and handle clicks by delegation, or add a "skip analysis" link.

### 9. `aria-live="polite"` fires on every keystroke

`#jawi-output` is `aria-live` and its `innerHTML` is rebuilt every 200 ms while typing. A screen reader will re-announce the entire output continuously.

**Fix:** drop `aria-live` from the live output; announce only on a settled pause (say 1200 ms) via a separate visually-hidden status region.

### 10. Missing language tags on the Jawi text

The Jawi is `lang="ms"` (inherited from `<html>`) but it's Arabic script. Screen readers and hyphenation engines need `lang="ms-Arab"` and an explicit `dir="rtl"` **attribute** — `#jawi-output` currently gets its direction only from CSS, so copy-paste into a plain-text field loses it.

### 11. Copy failure is invisible

`handleCopy()` catches the error and only `console.error`s it. The Clipboard API is unavailable on plain `http://` outside localhost — a likely deployment for a school intranet — so the button will look broken with no explanation.

**Fix:** show *"Gagal menyalin — sila salin secara manual"* and select the text as a fallback.

---

## 🟡 Performance

### 12. ~19 MB of images for a text tool

| File | Size |
|---|---|
| `Logo Madrasah_upscayl_3x_upscayl-lite-4x.png` (root) | 6.85 MB |
| `images/Logo Madrasah_upscayl_3x_upscayl-lite-4x.png` (duplicate) | 6.85 MB |
| 8 story illustrations | 5.3 MB total |

**Both copies of the 6.85 MB upscaled logo are unreferenced** — `index.html` uses `images/logo.png` (204 KB). That's 13.7 MB of dead weight in the repo. Delete them.

The story PNGs average 690 KB each and display at max 480×340. Converting them to WebP at that size should land around 40–60 KB each — roughly a 90 % reduction. On a school tablet over shared wifi this is the difference between instant and a visible wait.

### 13. Fonts fail offline, and Amiri may not cover Jawi

Amiri is loaded from Google Fonts. Two risks:

1. No network → the Jawi falls back to a system font. On Windows, `Traditional Arabic` doesn't reliably render the Jawi-specific letters `ڠ ڽ ݢ ڤ ۏ چ`, so students see `□` boxes.
2. **Worth verifying directly:** Amiri's coverage of `ݢ` (U+0762) and `ڠ` (U+06A0) is not guaranteed. If either is missing you have the same box problem even online.

**Fix:** self-host the font files, and test-render the full Jawi alphabet in your chosen face before committing to it. If Amiri has gaps, look at *Noto Naskh Arabic* or a dedicated Jawi face.

---

## 🟢 Product & structure

### 14. The story feature over-promises

The subtitle says *"menjana cerita pendek"* (generate short stories) but `STORIES` is 8 hardcoded entries. A student will exhaust it in one sitting and there's no "next" or randomiser.

Either soften the wording to *"Pilih cerita"*, or make it genuinely generative — a small template system (character name + activity + moral) would multiply 8 stories into hundreds with maybe 60 lines of code, and it would exercise the conversion engine much harder, which is a good thing.

### 15. `app.js` is doing four jobs

50 KB in one file: dictionary (256 lines), conversion engine, rule database, story content, UI controller. Splitting into `data/dictionary.js`, `data/stories.js`, `engine.js`, `ui.js` costs nothing (ES modules work natively in every current browser) and makes the dictionary editable by a Jawi teacher who doesn't write JavaScript.

Better still, move the dictionary to `dictionary.json` so it can be maintained in a spreadsheet and exported.

### 16. `highlightWord()` is a one-way door

Clicking a word filters the analysis panels to that word — with no way back to the full list except editing the input. Add a click-again-to-deselect, or an "Papar semua" button.

### 17. Missing project hygiene

No `README.md`, no `.gitignore`, no `favicon.ico`, no `manifest.json`. For a tool likely to be used on tablets, a web app manifest plus a small service worker would make it installable and fully offline — which for a classroom is a real feature, not polish.

### 18. The `char-count` label is wrong

It reads *"Aksara Jawi"* but counts `fullJawi` including punctuation and Latin passthrough. Filter to Arabic-block codepoints, or rename the label.

---

## Suggested order of work

| # | Task | Effort | Impact |
|---|---|---|---|
| 1 | Add the confidence marker for rule-derived words (§3) | 1 h | 🔴 Highest |
| 2 | Fix word-initial `ai`/`au` double alif (§2) | 10 min | 🔴 |
| 3 | Fix `dinding`, `elok`, `murah`; dedupe keys (§4, §5) | 30 min | 🔴 |
| 4 | Split engine from UI, add a test corpus (§7, §15) | 1 day | 🔴 Enables everything else |
| 5 | Rewrite the vowel rule to be syllable-aware (§1) | 2–3 days | 🔴 Core correctness |
| 6 | Delete dead logos, convert PNGs → WebP (§12) | 1 h | 🟡 |
| 7 | Self-host + verify the Jawi font (§13) | 2 h | 🟡 |
| 8 | Accessibility pass — tab stops, aria-live, lang tags (§8–§11) | half day | 🟡 |
| 9 | Full DBP dictionary audit | 1 day + a Jawi teacher | 🟠 |
| 10 | Template-based story generation, PWA/offline (§14, §17) | 2–3 days | 🟢 |

---

## What's already good — don't change it

- The CSS custom-property system is disciplined and consistent. Colours, spacing, radii, easing all tokenised.
- The dictionary → prefix → rules cascade is the correct architecture; the problem is one layer's implementation, not the design.
- `splitSyllables()` handles digraphs as single units, which is exactly right and something most naive implementations get wrong.
- Input debouncing at 200 ms, `loading="lazy"` on story images, `prefetch` on the font origins — someone was thinking about performance.
- Every interactive element has a hover *and* an active state. The visual craft is above average for a project this size.
