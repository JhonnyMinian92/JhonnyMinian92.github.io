# Technical Requirements

Languages, versions and frameworks selected from Central Memory are listed below. Gemini may propose additions.

# Reused Version from Central Memory


## versions/javascript-es2022.md

# JavaScript ES2022

Applies to: `languages/javascript.md`

Baseline for modern browsers and Node.js 16+.

# Reused Language from Central Memory


## languages/javascript.md

# JavaScript

## Use when
Frontend interactivity, Node.js backends, scripting for web and PWA projects.

## Key considerations
- Prefer strict mode and ES modules (ESM) over CommonJS for new code.
- Use `const`/`let`, never `var`.
- Pair with TypeScript once the codebase grows beyond a small script.

## Common pitfalls
- Implicit type coercion (`==` instead of `===`) causes subtle bugs.
- Unhandled promise rejections silently swallow async errors.

