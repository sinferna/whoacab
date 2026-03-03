# Whoacab

**A gamified, microlearning vocabulary platform built for daily contextual reinforcement.**

Whoacab delivers a single daily word challenge across three difficulty tiers. Users demonstrate contextual understanding through a short assessment while earning streaks, badges and leaderboard rankings.

Concept:
Wordle × Duolingo × Vocabulary.com. Optimized for 1–2 minutes per day.

---

## Core Concept

Whoacab makes vocabulary building simple, competitive, and consistent.

Each day, users complete a short challenge (1–2 minutes) designed to reinforce contextual understanding rather than rote memorization. Progress is tracked through streaks, points, badges, and a global leaderboard.

The goal is to make learning feel like a game... not homework.

![Homepage prototype](https://i.imgur.com/Qa2cqli.png)
![Points overlay after completing the challenge](https://i.imgur.com/wFodlqC.png)

---

## Core Features

### Daily Word Challenge
- Three difficulty tiers: **Easy**, **Medium**, and **Hard**
- All users see the same word per difficulty level each day
- Encourages shared learning and friendly competition

### Context-Based Mini Test
- One multiple-choice question
- Users must select the sentence that correctly uses the word
- Reinforces sentence structure and contextual understanding

### Gamified Scoring System
- Points awarded for participation
- Multipliers based on:
  - Difficulty level
  - Streak length
  - Accuracy
- Example: **Hard word + 30-day streak + correct answer = highest multiplier**

### Leaderboards & Badges
- Global leaderboard for competitive learners
- Achievement badges for milestones
- Streak tracking to encourage daily consistency

### Microlearning Design
- 1–2 minutes per day
- Minimal friction
- Designed for modern attention spans

---

## Current Progress

### Phase 1: Frontend Logic Implementation (Completed)

The foundational interactive layer of Whoacab has been implemented using a hardcoded word and quiz flow to validate the full user experience before integrating backend systems.

#### Core Interaction Flow
- Hardcoded word and contextual multiple-choice question stored in component state
- Answer selection logic
- Input validation preventing empty submissions
- “Check” action handling
- Correct/incorrect feedback display
- Post-answer definition reinforcement

This ensures the full learning loop works end-to-end before database integration.

---

### UI/UX Enhancements Implemented

#### Animations
- Interactive selection feedback
- Button press states
- Visual response transitions
- Points overlay animation on completion

#### Detailed CSS Styling
- Custom button states
- Difficulty tier visual differentiation
- Responsive layout structure
- Styled feedback states (correct / incorrect)

#### Validation Layer
- Prevents submission without selecting an answer
- User feedback for invalid input attempts

---

### Gamification Overlay (Pre-Auth State)

A functional points overlay system has been implemented:

- Appears immediately after challenge completion
- Displays earned points
- Visually reinforces reward loop
- Prompts user to log in to begin persistent point tracking

This creates motivation before authentication is required and prepares the system for future integration with the user database.

---

This phase validates:
- Core interaction mechanics  
- UX feedback loops  
- Gamification psychology  
- Frontend architecture readiness for backend integration  

Next step: Transition from hardcoded state to database-backed daily word system.

---

## Long-Term Vision

- Classroom mode with group-based leaderboards  
- Support for multiple languages
- Microtransactions for access to more words daily
- Expansion to different subjects (e.g. biology, math, history, etc.)
- Mobile-native deployment  

## License

This software is proprietary and not licensed for public or commercial use.  
Unauthorized use, modification, or distribution is strictly prohibited.
