# Student Portal Application

A full-stack student portal application built with React frontend, Go backend, and PostgreSQL database.

## Features

- Add new students with department information
- Fetch and display students by department
- Modern, responsive UI
- RESTful API backend
- PostgreSQL database integration

## Project Structure

```
StudentPortal/
├── frontend/          # React frontend application
├── backend/           # Go backend API
├── database/          # Database scripts and migrations
└── README.md          # This file
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Go, Gin framework, GORM
- **Database**: PostgreSQL
- **API**: RESTful endpoints

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Go (v1.19 or higher)
- PostgreSQL (v12 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Go dependencies:
   ```bash
   go mod tidy
   ```

3. Set up your PostgreSQL database and update the connection string in `config/database.go`

4. Run the backend:
   ```bash
   go run main.go
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/department/:department` - Get students by department
- `POST /api/students` - Add a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Database Schema

The application uses a simple student table with the following fields:
- id (Primary Key)
- name
- email
- department
- created_at
- updated_at 