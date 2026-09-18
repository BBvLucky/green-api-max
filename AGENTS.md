# Stack

React + TypeScript + Vite. Plain CSS only. No Tailwind, no UI libraries.

# Structure

- One component per folder: src/components/LoginForm/LoginForm.tsx
- Colocated styles: src/components/LoginForm/LoginForm.css
- Hooks >50 lines extracted to src/hooks/use\*.ts
- API types: src/types/api.ts | constants: src/constants/

# BEM rules (strict)

- Classes: block\_\_element--modifier, kebab-case
- Block named after component: .login-form, .login-form**input, .message**text--incoming
- ALL styles for a component live ONLY in its own .css file
- Global selectors only in src/index.css (reset, fonts)
- No !important, no inline style props, no ID selectors

# Code

- Function components + hooks only, explicit types on props
- Every API call wrapped in try/catch with user-visible error state
- Polling: setInterval + cleanup in useEffect return

# Boundaries

- Ask before adding any npm dependency
- Never edit package.json directly
