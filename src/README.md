# Source Code Documentation

This directory contains the source code for the Todo 2025 frontend application. Below is an overview of each directory and its purpose.

## Directory Structure

```bash
src/
├── assets/       # Static assets like images, icons, etc.
├── components/   # Reusable UI components
├── features/     # Feature-specific components and logic
├── lib/          # Utility functions and shared code
├── pages/        # Page components and routing
├── stores/       # State management (e.g., Zustand stores)
├── styles/       # Global styles and theme configuration
├── App.tsx       # Root application component
├── main.tsx      # Application entry point
└── index.css     # Global CSS styles
```

## Conventions

### Components

- Use TypeScript for all components
- Follow functional component pattern with hooks
- Place component-specific styles in the same directory
- Include unit tests for components when applicable

### File Naming

- React components: PascalCase (e.g., `TodoList.tsx`)
- Utilities and hooks: camelCase (e.g., `useLocalStorage.ts`)
- Test files: Same name as the file being tested with `.test.ts(x)` suffix

### State Management

- Use Zustand for global state management
- Keep state logic in the `stores` directory
- Follow store-per-feature pattern

### Styling

- Use TailwindCSS for styling
- Custom CSS modules when needed
- Theme variables in `styles` directory

### Code Organization

- Group related components in feature directories
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use barrel exports (index.ts) for cleaner imports

## Best Practices

1. Write self-documenting code with clear variable and function names
2. Include JSDoc comments for complex functions
3. Use TypeScript interfaces and types for props and state
4. Keep components pure when possible
5. Handle errors gracefully
6. Use proper prop-types validation
7. Follow React's performance optimization guidelines
