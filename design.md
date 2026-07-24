# TechSpring Frontend Light & Dark Mode Architecture & Design Document

## Executive Summary

The TechSpring web client currently experiences theme inconsistencies when switching between Light Mode and Dark Mode. While a theme toggle button exists in the navigation bar, several pages and components render with hardcoded light-mode background colors, unreadable dark text on dark backgrounds, or mismatched DaisyUI/Tailwind component tokens.

This document outlines the root causes of these theme defects and provides a complete architectural design and component-level specification to implement seamless, accessible, and persistent Light/Dark mode across the entire frontend application.

---

## 1. Root Cause Analysis

### 1.1 Mismatch Between Tailwind CSS & DaisyUI Theme Engines
- **Tailwind CSS** is configured for `darkMode: 'class'` in `tailwind.config.js`. This expects the `dark` class to be present on `<html>` (`document.documentElement`).
- **DaisyUI** components rely on the `data-theme` attribute (e.g. `data-theme="light"` or `data-theme="dark"`).
- **Current State**: `AuthProvider.jsx` only toggles a `dark` CSS class on a local wrapper `<div>`. It does **not** update `document.documentElement` or set `data-theme`, leaving DaisyUI components (tables, dropdowns, inputs, buttons) out of sync.

### 1.2 Lack of Theme Persistence
- The current theme state in `AuthProvider.jsx` resets to `'light'` upon browser refresh because it is not saved to `localStorage` or initialized from system color scheme preferences (`prefers-color-scheme`).

### 1.3 Hardcoded Light-Mode Styling Tokens
Across multiple components, hardcoded CSS utility classes override dark mode styles:
- **Cards & Containers**: Using `bg-teal-100`, `bg-white`, `bg-gray-100` without corresponding `dark:bg-gray-800` or `dark:bg-gray-900`.
- **Text Elements**: Using `text-black` or `text-gray-900` without `dark:text-white` or `dark:text-gray-100`.
- **Tables (`AllCampaigns.jsx`, `MyCampaigns.jsx`, `MyDonations.jsx`)**: Hardcoded `bg-teal-400` headers and `hover:bg-gray-100` rows that cause low contrast and unreadable text in dark mode.
- **Form Controls (`AddCampaign.jsx`, `UpdateCampaign.jsx`, `Login.jsx`, `Register.jsx`)**: Inputs with hardcoded `bg-white` and `text-gray-900` lacking dark borders and dark background states.
- **Dropdown & Navigation (`Navbar.jsx`)**: Mobile dropdown menu uses DaisyUI `bg-base-100` without explicit dark mode text and container styling.

---

## 2. Core Architecture & Theme System Design

### 2.1 Global Theme Provider (`AuthProvider.jsx`)
The theme state will be centralized in `AuthProvider.jsx` with full DOM synchronization and `localStorage` persistence:

```javascript
// Theme Initialization Logic
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// DOM Synchronization Effect
useEffect(() => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
  localStorage.setItem('theme', theme);
}, [theme]);
```

### 2.2 Standardized Semantic Color Palette

| UI Element | Light Mode Token | Dark Mode Token |
| :--- | :--- | :--- |
| **App Page Background** | `bg-gray-50` | `dark:bg-gray-950` / `dark:bg-gray-900` |
| **Card & Modal Surface** | `bg-white` | `dark:bg-gray-800` |
| **Elevated Surface / Hover** | `bg-gray-100` | `dark:bg-gray-700/60` |
| **Primary Text** | `text-gray-900` | `dark:text-gray-100` |
| **Secondary Text / Muted** | `text-gray-600` | `dark:text-gray-400` |
| **Borders & Dividers** | `border-gray-200` | `dark:border-gray-700` |
| **Primary Brand Accent** | `bg-teal-600 hover:bg-teal-700` | `dark:bg-teal-500 dark:hover:bg-teal-600` |
| **Table Header Surface** | `bg-teal-600 text-white` | `dark:bg-teal-900 dark:text-teal-100` |
| **Table Row Hover** | `hover:bg-teal-50/50` | `dark:hover:bg-gray-700/50` |
| **Form Inputs** | `bg-white text-gray-900 border-gray-300` | `dark:bg-gray-900 dark:text-white dark:border-gray-700` |

---

## 3. Component-by-Component Fix Specification

### 3.1 `Navbar.jsx`
- **Container**: Change `bg-teal-900 text-white` / `text-black` to semantic `bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800`.
- **Mobile Menu Dropdown**: Update dropdown container to `bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700`.
- **Nav Links**: Add `hover:text-teal-600 dark:hover:text-teal-400` transitions.
- **Theme Toggle Icon**: Ensure smooth rotation and high contrast (`text-amber-500` for Sun, `text-teal-400` for Moon).

### 3.2 `Footer.jsx`
- **Background**: Standardize to `bg-gray-900 text-gray-200 dark:bg-gray-950 dark:text-gray-300 border-t border-gray-800`.
- **Link Hovers**: `hover:text-teal-400 transition-colors`.

### 3.3 `Card.jsx`
- **Card Container**: Replace `bg-teal-100` with `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-md hover:shadow-xl transition-all duration-300`.
- **Title**: `text-gray-900 dark:text-white font-bold text-xl`.
- **Description & Deadline**: `text-gray-600 dark:text-gray-300`.
- **Button**: `bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600`.

### 3.4 `AllCampaigns.jsx`, `MyCampaigns.jsx`, `MyDonations.jsx` (Tables)
- **Table Container**: `overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700`.
- **Table Header (`<thead>`)**: `bg-teal-600 dark:bg-teal-900 text-white dark:text-teal-100`.
- **Table Body (`<tbody>`)**: `bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800`.
- **Table Rows (`<tr>`)**: `hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors`.
- **Action Buttons**: Standardize "See More", "Update", "Delete" buttons with explicit dark mode background and hover states.

### 3.5 `AddCampaign.jsx` & `UpdateCampaign.jsx` (Forms)
- **Form Card**: `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-lg`.
- **Form Labels**: `text-gray-700 dark:text-gray-200 font-semibold`.
- **Input Fields & Textareas**:
  ```html
  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
  ```

### 3.6 `CampaignDetails.jsx`
- **Hero Card**: `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white`.
- **Donation Modal**: `bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700`.

### 3.7 `FeaturedInnovators.jsx` & `InnovatorSpotlight.jsx`
- **Cards & Containers**: Replace hardcoded light backgrounds with `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 shadow-sm`.
- **Text Headings & Descriptions**: Apply `text-gray-900 dark:text-white` and `text-gray-600 dark:text-gray-300`.

### 3.8 `Login.jsx` & `Register.jsx`
- **Auth Card**: `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl`.
- **Inputs**: `bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700`.
- **Google / Social Buttons**: `bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`.

---

## 4. Implementation Checklist & Order of Work

- [ ] **Step 1**: Refactor `AuthProvider.jsx` to synchronize `dark` class, `data-theme` attribute on `document.documentElement`, and `localStorage`.
- [ ] **Step 2**: Update core navigation (`Navbar.jsx`) and layout components (`Footer.jsx`).
- [ ] **Step 3**: Update shared display cards (`Card.jsx`, `FeaturedInnovators.jsx`, `InnovatorSpotlight.jsx`).
- [ ] **Step 4**: Refactor all table views (`AllCampaigns.jsx`, `MyCampaigns.jsx`, `MyDonations.jsx`).
- [ ] **Step 5**: Refactor all form inputs and pages (`AddCampaign.jsx`, `UpdateCampaign.jsx`, `CampaignDetails.jsx`, `Login.jsx`, `Register.jsx`).
- [ ] **Step 6**: Execute production build (`npm run build`) and verify zero visual contrast or execution issues.

---

## 6. Verification & Acceptance Criteria

1. **Persistence**: Toggling theme to Dark Mode and refreshing the page preserves Dark Mode across all routes.
2. **DaisyUI Integration**: Modal overlays, dropdowns, and buttons seamlessly match the active theme.
3. **Contrast Compliance**: All text elements achieve WCAG AA contrast ratio against their respective light or dark backgrounds.
4. **Build Integrity**: `npm run build` succeeds without warnings or CSS compilation errors.
