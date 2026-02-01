# Portfolio Frontend

This project is a React + TypeScript frontend for the Portfolio website, created with Vite. It is set up to connect to a Spring Boot backend.

## Getting Started

1. Make sure you have Node.js v20.19+ or v22.12+ installed.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will run on http://localhost:3000/

## Project Structure
- `src/components/` – Reusable React components
- `src/pages/` – Page components (e.g., Home)
- `src/services/` – API service logic (e.g., axios calls)

## Customization
- The dev server port is set to 3000 in `vite.config.ts`.
- Routing is set up with `react-router-dom` v6.

## License
MIT
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
