# HelloRetro Copilot Instructions

## Project Overview

HelloRetro is a retrospective board application built with Preact, Vite, and
PocketBase. It helps teams run effective retrospectives using the "Happy, Meh,
Sad" pattern. The app supports real-time collaboration, voting, and discussion
timers.

## Tech Stack

- **Frontend**: Preact with TypeScript
- **Build Tool**: Vite
- **Backend**: PocketBase (SQLite database with real-time features)
- **Styling**: TailwindCSS with DaisyUI components
- **Testing**: Vitest and Playwright
- **Package Manager**: Yarn

## Code Style & Patterns

### Component Structure

- Use functional components with hooks
- Prefer `preact/hooks` over React hooks
- Use JSX with TypeScript
- Export components as named exports: `export { ComponentName }`

### State Management

- Use `@preact/signals` for reactive state
- Use `useState` for local component state
- Context providers for shared state (see
  [`AuthProvider`](src/services/auth.tsx))

### File Organization

```
src/
├── components/         # Reusable UI components
├── retros/            # Retro-specific components
│   └── items/         # Item state components (view, edit, active)
├── services/          # API and auth services
└── main.tsx           # App entry point
```

### Naming Conventions

- Components: PascalCase (`Board`, `RetroContext`)
- Files: kebab-case (`board.tsx`, `simple_format.tsx`)
- Functions: camelCase (`useRetro`, `addItem`)
- CSS classes: Tailwind/DaisyUI utility classes

## Key Patterns

### PocketBase Integration

- Use the shared [`pb`](src/services/auth.tsx) instance for all API calls
- Real-time subscriptions for live updates
- Collection methods: `create()`, `update()`, `delete()`, `getFullList()`
- Authentication handled via [`AuthProvider`](src/services/auth.tsx)

### Component State Management

```tsx
// Use signals for reactive state
const description = useSignal("");

// Use useState for local state
const [sortByVotes, setSortByVotes] = useState(false);

// Use context for shared state
const retro = useRetro();
const auth = useAuth();
```

### Real-time Updates

- Subscribe to PocketBase collections in `useEffect`
- Handle create/update/delete events
- Always clean up subscriptions

### Routing

- Use `preact-iso` for routing
- Route definitions in [`main.tsx`](src/main.tsx)
- Navigate with `location.route()`

## Specific Guidelines

### Retro Items

- Items have three states: view, edit, active (see
  [`ItemStatus`](src/retros/items/status.ts))
- Use the [`Item`](src/retros/item.tsx) component wrapper
- Handle state transitions properly

### Authentication

- Optional authentication (anonymous users supported)
- Use [`useAuth`](src/services/auth.tsx) hook for auth state
- Attach `created_by` when user is logged in

### Accessibility

- Use semantic HTML elements
- Include ARIA labels and descriptions
- Support keyboard navigation
- Provide screen reader text with `sr-only` class

### Styling

- Use TailwindCSS utility classes
- Leverage DaisyUI components (`btn`, `input`, `card`, etc.)
- Responsive design with breakpoint prefixes (`sm:`, `md:`, etc.)
- Dark/light theme support via DaisyUI

## Common Tasks

### Adding New Components

1. Create in appropriate directory (`components/` or `retros/`)
2. Use TypeScript with proper prop types
3. Export as named export
4. Follow accessibility guidelines

### Database Operations

1. Use the [`Retro`](src/retro.ts) class methods
2. Handle errors gracefully
3. Update UI optimistically where appropriate

### Real-time Features

1. Subscribe to relevant collections
2. Filter subscriptions appropriately
3. Handle all event types (create, update, delete)
4. Clean up subscriptions in useEffect return

## Dependencies to Prefer

- `preact/hooks` over `react`
- `@preact/signals` for reactive state
- `preact-iso` for routing
- `pocketbase` for backend operations
- Native Web APIs when possible

## Testing

- Unit tests with Vitest
- E2E tests with Playwright
- Test user interactions and real-time features
- Mock PocketBase for unit tests

When suggesting code changes, always consider the real-time nature of the app
and ensure proper cleanup of subscriptions and event handlers.
