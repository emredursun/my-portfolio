# Personal Portfolio

A modern, responsive personal portfolio website built with React and Tailwind CSS, showcasing skills, experience, and projects. This project is based on the portfolio of Emre Dursun.

## Features

- **Fully Responsive:** Adapts beautifully to all screen sizes, from mobile phones to desktops.
- **Light & Dark Mode:** Switch between themes with a single click, with your preference saved locally.
- **Interactive Sections:**
    - **About:** A brief introduction and the services offered.
    - **Resume:** Detailed timeline of experience and education, along with skills and tech stack.
    - **Projects:** A filterable gallery of projects with detailed modal popups.
    - **Contact:** A contact form and links to social media.
- **Modern UI/UX:** Smooth animations and a clean, professional design provide an engaging user experience.
- **No Build Step Required:** Runs directly in the browser thanks to Babel Standalone for on-the-fly TSX/JSX transpilation.

## Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Font Awesome
- **Transpilation:** Babel Standalone (in-browser)

## Run Locally

This project is designed to be run directly from the file system without any complex build steps. For the best experience and to avoid any browser security restrictions, it's recommended to use a simple local web server.

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

**Instructions:**

1.  **Download the project files.**

2.  **Serve the project folder.** You can use any static file server. Here are two common options:

    *   **Using Node.js:**
        If you have Node.js installed, you can use the `serve` package. Run this command in the project directory:
        ```bash
        npx serve .
        ```

3.  **Open in browser:**
    Navigate to the URL provided by the server (usually `http://localhost:8000` for Python or `http://localhost:3000` for `serve`).

---
_Note: You can also open the `index.html` file directly in your browser, but some functionalities might be limited by the browser's security policies for local files._
