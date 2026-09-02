---
name: ember-workflow
description: Complete development workflow and rules for extending the EMBER AI-Native Restaurant App.
---

# EMBER Workflow & Architecture Guide

## When to use this skill
Activate this skill whenever you are instructed to build new features, modify existing UI, or alter the AI integration for the **EMBER AI-Native Restaurant App**.

## 1. What to Check First
Before making any changes, always verify:
- **Environment:** Ensure `.env.local` exists and contains a valid `GEMINI_API_KEY`.
- **Source of Truth:** Check `lib/menu-data.ts`. The AI must never invent food data; it must only filter this local array.
- **Dependencies:** The stack is Next.js (App Router), Tailwind CSS (v4), Framer Motion, and `@google/genai`. Do not add new libraries without explicit user permission.

## 2. Required Design Process
Never jump straight into code. 
- Ensure a feature is designed visually in your thought process first.
- **Mobile-First:** EMBER is optimized for vertical video (Shorts/Reels). UI changes must prioritize the 100vw mobile view.
- **Interactions:** Use `framer-motion` for fluid state transitions. Avoid jarring hard cuts.

## 3. Implementation Order
When building new AI features, follow this strict pipeline:
1. **Types:** Define the expected structured JSON output in `types/index.ts`.
2. **AI Route:** Update `app/api/ai/route.ts` to instruct the Gemini LLM. 
   - *CRITICAL:* Enforce `nullable: true` in the Gemini JSON schema constraints, otherwise the LLM will hallucinate numbers.
   - *CRITICAL:* Instruct the LLM to strictly avoid making up max limits or servings unless explicitly requested.
3. **Matcher:** Update the pure filtering logic in `lib/match-utils.ts`.
4. **UI Integration:** Hook up the new logic inside `app/page.tsx`.

## 4. Testing Requirements
- **Fallback Test:** The app must remain completely usable if Gemini times out or the API key is missing. Ensure the `catch` block in `app/api/ai/route.ts` implements local substring parsing as a fallback.
- **Zero-Match Test:** Test the UI behavior when 0 items match (should show the `RecommendationGrid` empty state, not a crash).

## 5. Refactoring Rules
- **No Unused Code:** Perform an audit before committing. Delete unused imports, components, and variables.
- **Component Splitting:** Keep `app/page.tsx` clean. Extract heavy UI blocks into `components/` (e.g., `ai/`, `menu/`, `cart/`).

## 6. Git Rules
Keep Git history clean using Conventional Commits.
- `feat(...)`: For new components or major functionality.
- `style(...)`: For Tailwind tweaks and Framer Motion additions.
- `fix(...)`: For addressing AI hallucinations or UI bugs.
- `refactor(...)`: For code splitting and cleanup.

## 7. Known Failure Modes
- **LLM Hallucinations:** If the LLM returns `0` instead of `null` for numbers, it will break the filter. Always filter out `0` manually in `match-utils.ts`.
- **Empty Preferences Array:** If the LLM returns an array like `[""]`, standard `.includes()` will match everything. Always use `.filter(p => p.trim().length > 0)`.
- **Network Timeouts:** Google's API may hang. The API route must always return a valid 200 JSON object using the fallback parser, never a 500 error that breaks the client.

## 8. Expected Output
Whenever you complete a phase or feature, stop and summarize exactly what changed, what files were touched, and confirm that mobile testing and fallback testing passed. Wait for user approval before moving to the next phase.
