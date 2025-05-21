# Shared Utilities

This directory contains shared utilities, types, and constants that can be used by both the frontend and backend services.

## Contents

- `types.ts`: TypeScript definitions for shared data structures (e.g., User, SwapItem).

## Usage

These can be imported into your frontend or backend projects. You might need to configure path aliases (e.g., using `tsconfig.json` paths or Webpack aliases) for easier imports depending on your monorepo setup (e.g. using npm/yarn workspaces or a tool like Turborepo/Lerna).

For a simple setup without workspaces, you might use relative paths:

```typescript
// In frontend/src/app/somefile.ts
import { User } from '../../../shared/types';

// In backend/src/services/userService.ts
// const { User } = require('../../shared/types'); // If using CommonJS
``` 