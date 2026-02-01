# Olivier Goudreault Portfolio

A professional portfolio web application built with React (frontend) and Spring Boot (backend), containerized with Docker, and featuring CI/CD and best practices.

## Features
- Modern React frontend
- Spring Boot REST backend
- Docker & Docker Compose support
- Custom logo and favicon
- API integration between frontend and backend
- Ready for deployment and customization

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Java JDK 17+](https://adoptopenjdk.net/)
- [Docker](https://www.docker.com/) (optional, for containerized run)
- [Git](https://git-scm.com/)

### Local Development

#### Backend
```sh
cd backend
./gradlew bootRun
```

#### Frontend
```sh
cd frontend
npm install
npm run dev
```

### Docker Compose (Recommended)
```sh
cd PortfolioWebsite
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:8085

## Project Structure
- `frontend/` - React app (Vite)
- `backend/` - Spring Boot app

## Customization
- Update your info in `frontend/src/pages/Home.tsx`
- Add projects, skills, and more sections as needed
- Replace logo in `frontend/public/portfolio-logo.png`

## License
MIT License. See [LICENSE](LICENSE).

---

Built with ❤️ by Olivier Goudreault
# Portfolio Website

A modern, full-stack portfolio website for Olivier Goudreault.

## Features
- Home page with intro, links, and feedback modal
- About page with dynamic skills
- Projects page with dynamic project showcase
- Contact page with feedback form
- Dashboard for feedback stats (admin)
- Responsive, clean, and appealing design
- Java Spring Boot backend (API)
- React + TypeScript frontend (Vite)

## Getting Started

### Prerequisites
- Node.js & npm
- Java 17+
- Docker (optional, for containerized run)

### Backend
```sh
cd backend
./gradlew bootRun
```

### Frontend
```sh
cd frontend
npm install
npm run dev
```

### Docker (Full Stack)
```sh
docker-compose up --build
```

## Customization
- Update your info, projects, and skills in the backend controllers.
- Add images to the frontend/public directory.

## License
MIT
