# Lesson Management System

An application that allows users to select lessons and teachers to create a personalized study plan.

## Project Features

- User authentication with persistent login
- Lesson selection
- Teacher selection for chosen lessons
- Report generation and storage
- Route protection based on authentication state

## Tech Stack

- Vue 3 (Options API)
- Vuex for state management
- Vue Router
- Vite for build tooling

## Project Structure

- `/src/components` - Vue components grouped by feature
- `/src/views` - Vue components that represent pages
- `/src/store` - Vuex store modules
- `/src/router` - Vue Router configuration
- `/src/api` - API service (simulated)
- `/src/data` - Static JSON data

## Authentication

Authentication state is persisted in localStorage, allowing users to stay logged in after page refresh.
For testing: 
- username: user
- password: password

## Reports

Generated reports are saved to localStorage for future reference.

## Project Setup

```sh
npm install
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
