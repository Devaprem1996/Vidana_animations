# AI Development Rules for This Project

This document outlines the core technologies and guidelines for using libraries within this React application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Overview

*   **React:** The primary JavaScript library for building user interfaces.
*   **TypeScript:** Used for type safety across the entire codebase, enhancing code quality and developer experience.
*   **Vite:** The build tool providing a fast development environment and optimized production builds.
*   **Tailwind CSS:** A utility-first CSS framework used for all styling, enabling rapid UI development and responsive designs.
*   **shadcn/ui:** A collection of re-usable components built with Radix UI and Tailwind CSS.
*   **React Router:** Manages client-side routing within the application, with routes defined in `src/App.tsx`.
*   **TanStack Query:** Handles data fetching, caching, and synchronization with server state.
*   **Lucide React:** Provides a comprehensive set of customizable SVG icons.
*   **Sonner:** Used for displaying toast notifications to the user.
*   **React Hook Form & Zod:** Employed together for robust form management and schema validation.

## Library Usage Guidelines

*   **Styling:** Always use **Tailwind CSS** classes for all styling. Avoid inline styles or separate CSS files unless absolutely necessary for third-party components that don't support Tailwind.
*   **UI Components:** Utilize **shadcn/ui** components whenever possible for common UI elements (e.g., buttons, cards, forms).
    *   **Important:** Do not modify the files within `src/components/ui` directly. If a shadcn/ui component needs customization beyond its props, create a new component in `src/components/` that wraps or extends the shadcn/ui component.
*   **Icons:** Use icons from **Lucide React**.
*   **Routing:** All application routes should be defined and managed using **React Router** within `src/App.tsx`.
*   **Data Fetching:** For server state management, data fetching, and caching, use **TanStack Query**.
*   **Toasts:** For user notifications, use the **Sonner** library.
*   **Forms & Validation:** Implement forms using **React Hook Form** and define validation schemas with **Zod**.
*   **New Components/Hooks:** Always create new files for new components or hooks, no matter how small. Place components in `src/components/` and hooks in `src/hooks/`.
*   **File Naming:** Directory names must be all lowercase (e.g., `src/pages`, `src/components`). File names can use mixed-case (e.g., `Index.tsx`, `AnimatedCard.tsx`).
*   **Responsiveness:** All designs should be responsive and adapt well to different screen sizes.