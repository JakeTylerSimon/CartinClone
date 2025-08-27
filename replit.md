# Overview

This is a full-stack web application for "Cartin", a golf cart navigation app designed specifically for Florida golf courses. The application serves as a marketing website showcasing the app's features, including GPS navigation optimized for golf carts and interactive games like Scavenger Hunt and Poker Run. The system is built with a modern React frontend and Express backend, featuring a clean, responsive design with Florida-themed branding.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React 18 with TypeScript, utilizing Vite as the build tool for fast development and optimized production builds. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, providing accessible and customizable interface elements. Styling is handled through Tailwind CSS with a custom design system featuring Florida-inspired colors and themes.

**Key Design Decisions:**
- **Component Architecture**: Modular component structure with reusable UI components in `/components/ui/` and feature-specific components for different page sections
- **Routing**: Uses Wouter for lightweight client-side routing with a simple route structure
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Styling Approach**: Tailwind CSS with CSS custom properties for theming, enabling consistent design across components

## Backend Architecture
The backend follows a minimal Express.js architecture with a clean separation of concerns. The server is designed to handle API routes with middleware for logging, error handling, and request processing.

**Key Design Decisions:**
- **Storage Interface**: Abstracted storage layer with IStorage interface, currently implemented with in-memory storage (MemStorage) but designed to easily swap to database storage
- **Route Registration**: Centralized route registration system in `/server/routes.ts` for organized endpoint management
- **Development Setup**: Integrated Vite development server for hot reloading and seamless full-stack development experience

## Database Schema
The application uses Drizzle ORM with PostgreSQL for data persistence. The schema is defined in TypeScript with Zod validation schemas for type safety.

**Current Schema:**
- **Users Table**: Basic user management with id, username, and password fields
- **Validation**: Drizzle-Zod integration for automatic schema validation and TypeScript type inference

**Design Rationale**: Drizzle provides excellent TypeScript integration and migration management while maintaining SQL transparency, making it easier to optimize queries and understand database operations.

## Styling and Design System
The application implements a comprehensive design system with custom CSS properties for consistent theming across the entire application.

**Key Features:**
- **Color Scheme**: Florida-inspired warm color palette with orange primary colors and sunny accent colors
- **Typography**: Multi-font setup including Inter, DM Sans, Fira Code, and Geist Mono for different use cases
- **Responsive Design**: Mobile-first approach with adaptive layouts using Tailwind's responsive utilities
- **Animation System**: Custom CSS animations for scroll-triggered effects and interactive elements

# External Dependencies

## Core Framework Dependencies
- **React 18**: Frontend framework with modern hooks and concurrent features
- **Express.js**: Backend web framework for API development
- **Vite**: Build tool and development server with hot module replacement
- **TypeScript**: Type safety across the entire application stack

## Database and ORM
- **Drizzle ORM**: TypeScript-first ORM for database operations and schema management
- **@neondatabase/serverless**: PostgreSQL database driver optimized for serverless environments
- **Drizzle-Kit**: CLI tool for database migrations and schema management

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Accessible component primitives for complex UI elements
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography

## State Management and Data Fetching
- **TanStack React Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form handling with validation support
- **Wouter**: Lightweight routing library for single-page application navigation

## Development and Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility
- **@replit/vite-plugin-runtime-error-modal**: Development error handling for Replit environment

## Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Express Session**: Session middleware for user authentication state management

The architecture is designed for scalability and maintainability, with clear separation between frontend and backend concerns, type safety throughout the stack, and a modular component structure that supports future feature development.