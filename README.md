#  React SBA – React Dashboard Application – Task Management Dashboard

##  Overview
I built a Task Management Dashboard using React and TypeScript. This project applies my skills in React components, state management, TypeScript integration, form handling, and component composition. The dashboard allows users to add, update, delete, filter, sort, and search tasks while maintaining data persistence.

##  Workplace Context
This project simulates a real-world web application scenario where task tracking and management are essential. It demonstrates practical implementation of React and TypeScript in building interactive, user-friendly dashboards.

##  Learning Objectives

I learned to:

- Organize a React project with TypeScript and Vite.
- Structure components and manage state effectively.
- Implement controlled forms with validation.
- Enable filtering, sorting, and search functionality.
- Persist data using`localStorage`.
- Integrate responsive design, light/dark mode, and UI animations.
- Compose reusable components for scalable applications.

##  Description

This lab focuses on:

- Creating a dashboard with a clear component hierarchy.
- Using TypeScript interfaces for strong typing across components.
- Handling component communication and state updates.
- Implementing advanced UI features like theme toggling and task reordering.

##  Resources
*  React Docs — https://react.dev
*  TypeScript Handbook — https://www.typescriptlang.org/docs
*  React Hooks Guide — Official Documentation
*  Local Storage in React - https://blog.logrocket.com/using-localstorage-react-hooks/
*  Using uuidv4 - https://clerk.com/blog/generating-and-using-uuids-in-react 
*  TypeScript + React Cheatsheets (recommended)


##  Getting Started

##  Requirements

*  Node.js v24+
*  npm
*  Git
*  A code editor (VS Code recommended)
*  TypeScript
*  React

##  OS Compatibility

This lab works on:

*  Windows
*  macOS
*  Linux

##  Installation

1. Clone the repository:

git clone [<repository-url>](https://github.com/KaeTheDev/React-Dashboard-Application.git)

2. Navigate into the project folder:

cd task-dashboard

##  Setup

1. Install dependencies:

npm install

2. Run the project:

npm run dev

##  Project Structure
task-dashboard/
├── src/
│   ├── components/
│   │   ├── TaskList/
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── TaskForm/
│   │   │   └── TaskForm.tsx
│   │   ├── TaskFilter/
│   │   │   └── TaskFilter.tsx
│   │   └── Dashboard/
│   │       └── Dashboard.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── taskUtils.ts
│   ├── App.tsx
├── main.tsx
└── package.json

*  components/ — Contains all React components used in the app.
*  types/ — Shared TypeScript types/interfaces used across components.
*  utils / - Contains helper functions like task filtering, sorting, validation, and date formatting.

## Reflection