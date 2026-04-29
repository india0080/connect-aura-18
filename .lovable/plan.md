
# GoMilap — Social Platform v1

A dark-themed, premium social app with purple→pink gradient accents. Users sign up, complete onboarding, discover others by shared interests, send friend requests, and chat in real time.

## Scope

**Fully functional**
- Authentication (Email/Password, Google OAuth, Magic Link, password reset, email verification)
- Multi-step onboarding (gender, preference, avatar upload, bio, interests)
- Discover feed (ranked by shared interests + preference filter)
- Friend request system (send / accept / reject)
- Realtime 1:1 chat with unread badges
- Profile editing & account deletion

**Polished placeholders (UI only, marked "Coming soon")**
- Calls (voice/video)
- Premium pricing page
- Notifications dropdown

## Design System

- Dark base: deep slate background (`#0B0B14`-ish via HSL), card surface slightly lighter with subtle border
- Brand gradient: `from-[#8B5CF6] to-[#EC4899]` exposed as `bg-gradient-brand` utility and a `text-gradient-brand` helper
- Glassmorphism cards: `backdrop-blur`, semi-transparent surface, soft shadow, `rounded-2xl`
- Typography: Inter (Google Fonts), tight headings, comfortable body
- Motion: fade/slide-in on route change, skeletons for lists, hover lift on cards, button press scale
- All colors via HSL CSS variables in `index.css` + Tailwind tokens (no hardcoded colors in components)
- Mobile-first: bottom nav on mobile, sidebar on desktop (≥768px)

## App Structure & Routes

```text
/                       → redirects to /dashboard or /login
/login                  → Email+Password, Google, Magic Link, Forgot Password
/signup                 → Email+Password, Google, with strong validation
/forgot-password        → Email reset request
/reset-password         → Set new password (recovery token)
/verify-email           → Auto-verify + resend
/onboarding             → 4-step wizard (gated)
/dashboard              → redirects to /dashboard/discover
/dashboard/discover     → User grid, search, interest filters, Connect button
/dashboard/chat         → Contact list + active chat (realtime)
/dashboard/chat/:userId → Direct deep link to a conversation
/dashboard/calls        → Placeholder cards + history skeleton
/dashboard/profile      → Edit profile, delete account, logout
/dashboard/friends      → Incoming/outgoing requests + friends list
/premium                → Pricing placeholder
/notifications          → Page view of notifications (also dropdown in header)
*                       → 404
```

## Page-by-Page UX

**Auth pages**
- Centered glass card on gradient-tinted background
- Inline validation, password strength meter, show/hide password
- Toasts for success/error via sonner

**Onboarding wizard**
- Progress bar across top, Back/Next, can't skip required fields
- Step 1 Welcome → Step 2 Gender + Preference → Step 3 Avatar (drag/drop, preview, upload to `avatars` bucket) → Step 4 Bio (150-char counter) + Interests (toggle chips from a fixed list)
- On finish, set `onboarding_complete = true`, navigate to Discover

**Discover**
- Responsive grid (2 cols mobile, 3 tablet, 4 desktop)
- Search input (name) + horizontally scrollable interest filter chips
- Each card: avatar, name, bio preview, top 3 interests as chips, Connect button
- Connect → friend request (button states: Connect / Pending / Friends / Respond)
- Empty/loading skeleton; ranking: count of shared interests desc, then newest

**Chat**
- Desktop: split view (contacts left, conversation right). Mobile: stacked with back button
- Bubbles styled by sender, time stamps, "seen" once read
- Input with emoji picker (lightweight), Enter to send
- Supabase Realtime subscription on `messages` for current room
- Unread count rolls up to sidebar/bottom-nav badge

**Calls / Premium / Notifications**
- Calls: two big gradient action cards + recent-calls skeleton + "Coming soon" badge
- Premium: 3 pricing tiers ($9.99/mo, $49.99/yr, custom), feature checklist
- Notifications: bell with dot in header, dropdown list with placeholder items

**Profile**
- Editable form, avatar re-upload, save with toast
- Destructive section: Delete account (confirm modal)

## Backend (Lovable Cloud / Supabase)

**Auth**
- Email/Password with verification required
- Google OAuth
- Magic Link
- Password recovery via `/reset-password`

**Storage**
- Public `avatars` bucket; objects keyed by `userId/filename`; per-user write RLS

**Tables (with RLS on all)**
- `profiles` (id PK→auth.users, full_name, avatar_url, gender, preference, bio, interests text[], onboarding_complete, timestamps) — auto-created via signup trigger
- `friend_requests` (sender_id, receiver_id, status pending/accepted/rejected, unique pair)
- `messages` (chat_room_id deterministic from sorted user IDs, sender_id, receiver_id, message, read, created_at) — Realtime enabled
- `user_roles` + `app_role` enum + `has_role()` SECURITY DEFINER (standard pattern, ready for future admin/moderation)

**RLS summary**
- `profiles`: anyone authenticated can SELECT (needed for discover); only owner can UPDATE/INSERT own row
- `friend_requests`: SELECT/INSERT/UPDATE only when `auth.uid()` is sender or receiver
- `messages`: SELECT/INSERT only when `auth.uid()` is sender or receiver

**Realtime**
- `messages` table added to `supabase_realtime` publication; client subscribes per chat room

## Technical Notes

- Stack: Vite + React 18 + TS + Tailwind + shadcn/ui + react-router-dom + @tanstack/react-query + sonner
- `useAuth` hook: sets up `onAuthStateChange` listener BEFORE `getSession()`, exposes `user`, `session`, `loading`
- Protected route wrapper: redirects unauth → `/login`; authenticated but `!onboarding_complete` → `/onboarding`
- Discover ranking computed client-side from current user's interests for v1 (simple, fast, fine at this scale); can move to an RPC later
- `chat_room_id` = sorted concat of two UUIDs hashed to a deterministic UUID (utility in `lib/`)
- Zod schemas for all forms; typed Supabase client; no `any`
- 404 page; meta titles per route via small `<PageMeta>` helper
- Inter font loaded via `index.html`

## Out of Scope for v1 (called out as placeholders)

- Real WebRTC voice/video calls
- Stripe/Paddle payment for Premium
- Push or in-app notification delivery
- Reporting/moderation backend (button only)

## Suggested Build Order

1. Design tokens (HSL vars, gradient utilities, Inter font), shadcn theming
2. Supabase schema + RLS + storage bucket + signup trigger for `profiles`
3. Auth pages + `useAuth` + protected routes
4. Onboarding wizard + avatar upload
5. App shell (sidebar/bottom nav, header with notifications bell)
6. Discover + friend request flow
7. Realtime chat
8. Profile edit + delete account
9. Placeholder pages (Calls, Premium, Notifications) + 404
10. Polish: skeletons, empty states, toasts, responsive QA
