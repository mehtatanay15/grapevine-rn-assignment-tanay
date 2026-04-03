# NOTES.md — Ready! Assignment

## Trade-offs & Decisions

### Images: Placeholder-first approach
All company logos (`companyLogoUrl`) and user/avatar images (`avatarUrl`, `companyLogoUrl`) are `null` in the mock JSON. Components render a styled fallback (initials badge or emoji placeholder) when the URL is null. This allows dropping in real Figma-exported assets without touching logic — just populate the URL fields.

### FlashList v2 `estimatedItemSize`
The installed version `@shopify/flash-list@2.0.2` removes `estimatedItemSize` from the `FlashListProps` type signature (it's now inferred or set via a wrapper). I removed it to keep TypeScript strict-mode clean.

### Navigation: Stack reset vs navigate for auth transitions
After login and log-out, I use `navigation.reset()` instead of `navigation.navigate()`. This prevents the user from pressing the back button to return to the auth screen post-login (or to the app post-logout), which is the correct UX for auth flow transitions.

### `colors.transparent` and `colors.black`
The `colors` export in `src/theme/colors.ts` only exposes **semantic** tokens. Raw values like `transparent` and `black` live on the `palette` object. I import `palette` where these raw values are needed rather than adding new tokens to `colors`.

### Bottom sheet: `@gorhom/bottom-sheet` v5
Uses `BottomSheetView` (not the deprecated `BottomSheetScrollView`) for the Home open state. The sheet is opened programmatically via `ref.expand()` on card press and closed via `ref.close()`.

### Session Result: Modal navigation
The Session Result screen is presented as a modal from the Root stack (`presentation: 'modal'`) so it slides up from the bottom over the Home screen — matching the green-header Figma design which implies a full-screen overlay.

### Store tab
No Figma was provided for the Store screen. I implemented a branded placeholder with the bag icon, title, and a "coming soon" message matching the app theme.

### Tab label: Progress vs Settings
The Home screenshot labels the second tab "Progress" while the Home Open State labels it "Settings". The README explicitly lists "Home, Settings, Store" so I used **Settings** throughout.

---

## What I Would Improve With More Time

1. **Real avatar illustrations** — Export the cartoon characters from Figma and integrate them using `expo-image`.
2. **Animated bottom sheet transitions** — Add spring-interpolated card elevation and backdrop blur.
3. **Skeleton / shimmer states** — Add loading placeholders for the question list.
4. **Haptic feedback tuning** — Differentiate feedback style per action (e.g., `Heavy` for destructive log-out, `Light` for nav taps).
5. **Accessibility audit** — Add `accessibilityHint` to interactive elements, test with TalkBack.
6. **Progress tab** — Build a proper progress/stats screen for the second tab.
7. **Pull-to-refresh** — On the Home screen question list.
8. **Deep link routing** — So sharing a question link opens the correct question detail.

---

## Figma Assumptions

- The "Asked by PhonePe" pill on the Session Result header uses a green background matching `colors.success` — assumed to be the same shade as `#22C55E`.
- The yellow card on the Home open state uses `#F5C518` (Figma yellow) — close to `palette.orange40` but distinct; kept as a hardcoded value with a comment since no semantic token maps to it exactly.
- The social proof banner is placed after card index 2 (before card 3) based on the visible Figma screenshot.
- The notification badge shows "8" as a static count — no real notification system exists.
