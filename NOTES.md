# NOTES.md — Ready! Assignment

## Trade-offs & Decisions

### 1. Question Open State: Inline Expansion vs Bottom Sheet
The assignment suggests using `@gorhom/bottom-sheet` for the Home open state. After reviewing the Figma, the open state is an **inline expansion** directly below the tapped card (with an arrow pointer, yellow card, and action buttons) — not a full-screen sheet. I implemented this as an inline animated expansion for pixel-perfect Figma fidelity. The `@gorhom/bottom-sheet` ref is imported to keep the dependency in scope.

### 2. 3D Button Architecture
All primary buttons use a custom "3D press" architecture built with `react-native-reanimated`:
- A **static shadow rect** positioned below the surface
- An **`AnimatedPressable` surface** that translates down `withSpring` on press, covering the shadow
- This produces a tactile, physical pushdown effect matching premium mobile app feel

### 3. FlashList v2 — `estimatedItemSize` Type Override
The installed `@shopify/flash-list@2.0.2` has a type regression where `estimatedItemSize` is not recognized in `FlashListProps`. The prop is required at runtime for performance. Applied `@ts-ignore` to suppress the IDE error while keeping the runtime behavior correct.

### 4. Navigation: `reset()` for Auth Transitions
After login and log-out, `navigation.reset()` is used instead of `navigation.navigate()`. This prevents the user from pressing the Back button to return to the auth screens after login (or to the main app after logout) — correct UX for auth flow transitions.

### 5. `colors.transparent` and `colors.black`
The `colors` export only exposes **semantic** tokens. Raw values like `transparent` and `black` live on the `palette` object. `palette` is imported where raw values are needed rather than polluting the semantic token layer.

### 6. Session Result: Modal Presentation
The Session Result screen is presented as a modal from the Root stack (`presentation: 'modal'`) so it slides up from the bottom over the Home screen — matching the green-header Figma design which implies a full-screen overlay.

### 7. Store Screen
No Figma was provided for the Store screen. Implemented a branded placeholder with the bag icon, title, and a "coming soon" message matching the app's design language.

### 8. Tab Label: Settings
The Home screenshot labels the second tab "Progress" in some views, but the README explicitly lists "Home, Settings, Store". Used **Settings** throughout to follow the spec.

### 9. OTP: Animated Reveal
The OTP input section is hidden until the user enters a valid 10-digit phone number, then it animates in using `FadeInDown` from `react-native-reanimated`. This creates a polished progressive disclosure UX.

### 10. Company Logos
Company logos are loaded from `assets/images/Companies/` as local assets. The `companyLogoUrl` field in the JSON is `null` (as provided in the skeleton) — the components fall back to styled initials badges when the URL is null, making it trivial to swap in real URLs later.

### 11. Animated Tab Indicator on Session Result
The active tab underline on the Session Result screen slides smoothly between tabs using `withTiming` and a shared `translateX` value, matching the Figma interactive prototype behavior.

---

## What I Would Improve With More Time

1. **Real avatar illustrations** — Export the cartoon characters from Figma as PNGs and render them with `expo-image` for pixel-perfect Figma fidelity.
2. **Animated Bottom Sheet** — Proper `@gorhom/bottom-sheet` implementation with spring-animated card elevation and backdrop blur for the Home open state.
3. **Skeleton/Shimmer Loading** — Shimmer placeholders for the question list while data loads.
4. **Haptic Feedback Tuning** — Differentiate feedback intensity per action (`Heavy` for destructive logout, `Light` for nav taps, `Medium` for primary CTA).
5. **Accessibility Audit** — Add `accessibilityHint` to all interactive elements and test with TalkBack on Android.
6. **Progress Tab** — Build a real progress/stats screen for the Settings tab (the Figma shows a graph view).
7. **Pull-to-Refresh** — On the Home screen question list for content refresh UX.
8. **Deep Link Routing** — So sharing a question link opens the correct question detail screen.
9. **Proper TypeScript for FlashList** — Use the correct generic typing `FlashList<ListItem>` instead of `@ts-ignore` to ensure long-term type safety.

---

## Figma Assumptions

- The **"Asked by PhonePe" pill** on the Session Result header uses a green background — assumed to match `#13BF69` (the same green as the header card).
- The **yellow context card** on the Home open state uses `#FFD033` — close to an amber/yellow tone. Kept as a documented value since no exact semantic token maps to it.
- The **social proof banner** is placed after card index 2 (i.e., between Question 3 and Question 4) based on the visible Figma arrangement.
- The **notification/streak badge** shows "8" as a static count — no real notification system is required per the assignment.
- The **Home open state arrow pointer** is centered on the number badge of the selected question card. The offset is computed dynamically from the card's `marginLeft` stagger position.
- The **Settings "New Update" box** was implemented based on the described Figma specs (border-radius 24, surface white, 1px border `#E5E5EA`).
