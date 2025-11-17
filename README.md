# 🚀 Personal Portfolio Website

A modern, highly-responsive personal portfolio built with **React**, **TypeScript**, and **Tailwind CSS**. Designed to professionally showcase your skills, experience, and projects.

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/emredursun/my-portfolio/blob/main/LICENSE)
[![Built with React](https://img.shields.io/badge/React-v18+-61DAFB?logo=react&logoColor=white&style=flat)](https://react.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat)](https://tailwindcss.com/)

---

## ✨ Features

* **Responsive Layout:** Flawlessly adapts to all screen sizes (mobile, tablet, desktop).
* **Light & Dark Mode:** Theme switching with local storage preference saving.
* **Modular Sections:** Dedicated, interactive pages for About, Resume, Filterable Projects, and Contact.
* **Modern UI/UX:** Clean design with smooth animations for an engaging experience.

---

## 🛠 Tech Stack

* **Frontend:** React, TypeScript, Tailwind CSS (via CDN)
* **Tooling:** Vite, Node.js, Babel Standalone (for in-browser TSX/JSX)
* **API:** Gemini API integration (optional)

---

## 💻 Local Setup

This project uses a standard Node.js development environment via **Vite**.

### Prerequisites

Ensure you have **Node.js** (LTS recommended) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/emredursun/my-portfolio.git](https://github.com/emredursun/my-portfolio.git)
    cd my-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API (if needed):**
    Set your Gemini API Key by creating a file named `.env.local` in the root directory:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will open in your browser (usually at `http://localhost:3000`).

---

***Note on Deployment:*** *This project is configured to run directly from the file system (using Babel Standalone) for quick demos, but the development setup above is recommended for local iteration.*