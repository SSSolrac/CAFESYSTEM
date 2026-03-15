# Staffowner Dashboard

A production-ready React + TypeScript dashboard built with Vite and TailwindCSS. The project now uses a scalable feature-oriented architecture, includes authentication, protected routes, owner-only admin pages, login history tracking, toast feedback, dark mode toggle, and a customer loyalty tier system.

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Sonner (toast notifications)

## Installation

```bash
npm install
```

## Development Commands

```bash
npm run dev
npm run build
```

## Folder Structure

```text
src/
  app/
    App.tsx
    router.tsx
  auth/
    AuthProvider.tsx
    LoginPage.tsx
  components/
    dashboard/
    navigation/
    ui/
  pages/
    DashboardPage.tsx
    ProfilePage.tsx
    SettingsPage.tsx
    admin/
  hooks/
  services/
  utils/
  types/
  assets/
```

## Demo Accounts

- `owner@happytails.com` (role: owner)
- `staff@happytails.com` (role: staff)
- Any non-empty password for demo mode
