# React UI Components: InputField & DataTable

This project contains two reusable React UI components built with TypeScript and styled using Tailwind CSS:
- **InputField**: A flexible text input component with validation, variants, sizes, loading and password toggle features.
- **DataTable**: A responsive and sortable data table with loading, selectable rows, and empty state handling.

It is designed with modern React patterns, accessibility, and scalability in mind.

---

## Features

### InputField
- Supports `filled`, `outlined`, and `ghost` variants.
- Sizes: small (`sm`), medium (`md`), large (`lg`).
- States: disabled, invalid (with error message), loading.
- Optional clear button.
- Password input toggle visibility.
- Accessible with proper ARIA attributes.

### DataTable
- Displays tabular data with dynamic columns.
- Column sorting functionality.
- Selectable rows with "select all" checkbox.
- Loading and empty data states.
- Keyboard and screen-reader accessible.

---

## Getting Started

### Requirements
- Node.js (v14 or above recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
git clone https://github.com/VismayaSKumar/Uzence_Assessment
cd Uzence_Assessment

2. Install dependencies:
npm install or yarn install

3. Run the development server:
npm start or yarn start


---

## Usage

The `App.tsx` contains a simple demo that lets you switch between the `InputField` and `DataTable` components with example usage.


---

## Storybook

This project includes a **Storybook** setup to visualize and interact with components in isolation.

### How to run Storybook

npm run storybook or yarn storybook


Open [http://localhost:6006](http://localhost:6006) in your browser to explore the components' stories, including different states, variants, and sizes.

Storybook serves as an interactive playground and documentation for your UI components.

---

## Accessibility & Responsiveness

- Components use ARIA attributes for better screen reader support.
- Keyboard navigable inputs and checkboxes.
- Responsive design with Tailwind CSS classes ensures usability across devices.

---

## Project Structure

src/
├── components/
│ ├── InputField/
│ │ ├── InputField.tsx
│ │ ├── InputField.stories.tsx
│ ├── DataTable/
│ │ ├── DataTable.tsx
│ │ ├── DataTable.stories.tsx
├── App.tsx
|── index.css
└── main.tsx

---

## Approach and Design Decisions

- Used **TypeScript** generics in DataTable to ensure type safety for columns and data rows.
- Tailwind CSS for utility-first styling, enabling fast, responsive design without bulky CSS.
- Managed controlled/uncontrolled input hybrid pattern in InputField for flexibility.
- Simple sorting and selection logic with React state hooks and memoization for performance.
- Basic accessibility following ARIA recommendations and semantic HTML elements.

---

## Deployment

- Storybook preview is deployed using [Chromatic / Vercel] *(update with your actual deployment link)*.
- The main app runs in development mode locally and can be deployed on any React-supporting platform.

---

## About

This project was developed as a technical assessment for Uzence.  
It demonstrates proficiency in React, TypeScript, Tailwind CSS, and component-driven development with Storybook.

---

## License

MIT License

---

Feel free to explore, test, and extend these components!








