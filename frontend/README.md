# Backend Architect Portfolio

A modern, high-performance portfolio application designed with a cyberpunk and terminal-inspired aesthetic, tailored for a Backend Systems Architect. This project features a robust, stateless architecture decoupled from the backend, comprehensive testing, and a secure administration panel.

## 🚀 Features

- **Decoupled Architecture**: Fully stateless React frontend designed to be served via NGINX in a Kubernetes cluster.
- **Dynamic Content Management**: All content (titles, subtitles, tech stack, experience, etc.) is fetched via API and can be modified in real-time through the Admin Panel.
- **Secured Admin Dashboard**: Protected routes using **JSON Web Tokens (JWT)** and Role-Based Access Control (RBAC). 
- **State Management**: Built with **Redux Toolkit** and **RTK Query** for efficient data fetching, caching, and state synchronization.
- **Testing Suite**: Comprehensive Unit, Integration, and Regression (Snapshot) testing powered by **Vitest**, **React Testing Library**, and **Mock Service Worker (MSW)**.
- **CI/CD Ready**: Configured with GitHub Actions for automated testing, code quality checks via **SonarCloud**, and automated deployment.

## 🛠️ Technology Stack

- **Core**: React 19, Vite
- **Styling**: Tailwind CSS (Custom Design System with CSS variables)
- **Routing**: React Router DOM v7
- **State/API**: Redux Toolkit (RTK Query)
- **Testing**: Vitest, React Testing Library, MSW
- **Security**: jwt-decode (Frontend JWT parsing)
- **Infrastructure**: Docker, NGINX, Kubernetes manifests ready

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

### Running Locally (Development)

This project currently uses `json-server` to mock the future Java Quarkus backend. You need to run both the server and the Vite frontend.

1. **Start the Mock API Server**:
```bash
npm run server
```
*This will run `json-server` on port 3001 using `db.json`.*

2. **Start the Frontend Development Server** (in a new terminal):
```bash
npm run dev
```
*This will run the Vite server (usually on port 5173).*

### Testing

Run the full testing suite (Unit, Integration, and Snapshots):
```bash
npm run test
```
*The test suite automatically uses MSW to mock network requests, ensuring tests do not depend on the local json-server.*

## 🛡️ Admin Access

To access the administrative dashboard in the local development environment:
1. Navigate to `/login`
2. Use the default mock credentials:
   - **Username**: `admin`
   - **Password**: `root`
3. This will generate a mock JWT token and grant access to the `/admin` routes.

## 🏗️ Architecture & Deployment

The application is built to be deployed as a static site via an NGINX container.
- **Dockerfile**: Implements a multi-stage build. It builds the React app using Node, then copies the static assets into a lightweight NGINX alpine container.
- **nginx.conf**: Configured with robust security headers (CSP, X-Frame-Options) and handles routing for the React Single Page Application (SPA).
- **Kubernetes**: Manifests (`k8s/`) are provided for deploying the NGINX container as a stateless deployment.

---
*Architected and developed with a focus on clean code, testability, and resilient infrastructure.*
