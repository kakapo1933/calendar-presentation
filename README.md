# Calendar Component Presentation

## Browser Support:
- Chrome
- Edge
- Firefox

## Getting Started

### Prerequisites
- Node.js (version 14 or later)
- pnpm (version 6 or later)

### Installation and Development

Follow these steps to set up the project for development:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-component-overview
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Building and Deploying

To create a production-ready build and deploy the application:

1. Generate a production build:
   ```bash
   pnpm run build
   ```
   This command compiles and optimizes your code for production, creating a `dist` folder with the built files.

2. Test the production build locally:
   ```bash
   pnpm run preview
   ```
   This starts a local server to preview your production build. Open your browser and navigate to the URL provided (typically `http://localhost:4173`).

3. Deploy the contents of the `dist` folder to your preferred hosting platform (e.g., Netlify, Vercel, or GitHub Pages).

Note: Ensure your hosting environment supports single-page applications and configure it to serve `index.html` for all routes.

## Tasks

### Task 1: Disable Navigation and Cross-Month Selection

To disable both navigation and cross-month selection, simply uncheck the "Enable Navigation" and "Enable Cross-Month Selection" checkboxes at the bottom of the component.

### Task 2: Enable Navigation and Cross-Month Selection

To enable both navigation and cross-month selection, simply check the "Enable Navigation" and "Enable Cross-Month Selection" checkboxes at the bottom of the component.

