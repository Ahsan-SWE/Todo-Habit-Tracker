# TODO - Implement requested UI changes (Todo-Habit-Tracker)

- [x] Inspect current date window/selection + Prev/Next usage
- [ ] Update `src/components/Header.tsx`
  - [ ] Remove non-functional Prev/Next controls if present
  - [ ] Replace hardcoded `1/1 Done Today` with computed `X/Y Done Today` from HabitContext
  - [ ] Ensure date range label is consistent (May 20 - May 27)
- [ ] Update `src/components/HabitList.tsx`
  - [ ] Clean up done-panel text that is tied to placeholder selection (remove/adjust misleading “/1 Done Today”)
  - [ ] Ensure done dates in the list are marked green
  - [ ] Verify Done button toggles visibility of the done dates list
- [ ] Run build/dev to ensure TypeScript/React compiles
- [ ] Run lint to ensure ESLint passes

