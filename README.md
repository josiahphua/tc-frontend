# TC-frontend

## Overview
This project is a frontend application for the administrator to manage teachers and classes (although only adding functionality is built)
This is build using Vite, React and Typescript, and ShadCn with TailwindCSS for styling.

## Prerequisites
- Node.js (v18.16.0)
- npm (v9.5.0)
- Docker (v24.0.6)
- Docker Compose (v2.20.2)

## Usage

1. Clone the repository
    ```bash
   git clone git@github.com:josiahphua/tc-frontend.git
    cd tc-frontend
   ```

2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Open your browser and navigate to `http://localhost:8080` to view the application.
(Do ensure the backend is running on port 3001)

### OR 

## Docker-compose
Build and run the application
```bash
docker-compose up -d --build
```
The application will be available at `http://localhost:8080`.
 